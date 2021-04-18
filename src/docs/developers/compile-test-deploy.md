# Compile, Test, and Deploy Contracts

## Introduction

::: tip Work in Progress™
_Our documentation is a rapidly improving work in progress. If you have questions or feel like something is missing feel free to ask in our [Discord server](https://discord.gg/5TaAXGn2D8) where we (and our awesome community) are actively responding, or [open an issue](https://github.com/ethereum-optimism/community-hub/issues) in the GitHub repo for this site._
:::

This document is for developers who have to deal with complex contracts and need a bit more guidance on compiling, testing, and deploying their contracts for Optimistic Ethereum.

The main purpose of this document is to solve blockers that most developers will run into when adding complexity to their contract tests for Optimistic Ethereum.

## Overview

You'll learn about:

1. Common gotchas while developing for Optimistic Ethereum and how to get around them.
1. Hardhat vs. Truffle vs. Waffle and the pros and cons for each.
1. What L1 <> L2 communication is used for and best practices for implementing it in your applications.

Let's dive in!

## Common gotchas (or blockers)

### Retrieve contract revert reason

In your Ethereum contract tests, a common test that developers write is for revert reasons.
For example, let's say you have a yield farming contract that has a `require` statement on its `withdraw` method to check whether the caller already has a deposit (that has also been accruing interest!).
If the caller does _not_ have a pre-existing deposit, then your `withdraw` method reverts with a message saying, `"There is nothing for you to withdraw!"`.
This message is what we would like to test for.
However, in Optimistic Ethereum, this is not as straightforward as using something like `hardhat`'s `.to.be.reverted` or `.to.be.revertedWith` testing methods:

```js
// THIS WILL NOT WORK FOR OVM TESTS
await expect(withdrawTx).to.be.revertedWith(
  "There is nothing for you to withdraw!"
)
```

Simply using this syntax will not work to retrieve your revert reason for your contract.

Instead, when writing tests for Optimistic Ethereum, you will need a clever way to retrieve these revert reasons.
Fortunately, to retrieve revert reasons for contract calls in the Optimistic Ethereum Virtual Machine (OVM), our friends at [Synthetix](https://www.synthetix.io/) created a utility script called [`revertOptimism.js`](https://github.com/Synthetixio/synthetix/blob/develop/test/optimism/utils/revertOptimism.js):

```js
const ethers = require('ethers')

function _hexToString(hex) {
	let str = ''

	const terminator = '**zÛ'
	for (var i = 0 i < hex.length i += 2) {
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))

		if (str.includes(terminator)) {
			break
		}
	}

	return str.substring(0, str.length - 4)
}

async function getOptimismRevertReason({ tx, provider }) {
	try {
		let code = await provider.call(tx)
		code = code.substr(138)

		// Try to parse the revert reason bytes.
		let reason
		if (code.length === 64) {
			reason = ethers.utils.parseBytes32String(`0x${code}`)
		} else {
			reason = _hexToString(`0x${code}`)
		}

		return reason
	} catch (suberror) {
		throw new Error(`Unable to parse revert reason: ${suberror}`)
	}
}

async function assertRevertOptimism({ tx, reason, provider }) {
	let receipt
	let revertReason
	try {
		receipt = await tx.wait()
	} catch (error) {
		revertReason = await getOptimismRevertReason({ tx, provider })
	}

	if (receipt) {
		throw new Error(`Transaction was expected to revert with "${reason}", but it did not revert.`)
	} else {
		if (!revertReason.includes(reason)) {
			throw new Error(
				`Transaction was expected to revert with "${reason}", but it reverted with "${revertReason}" instead.`
			)
		}
	}
}

module.exports = {
	getOptimismRevertReason,
	assertRevertOptimism,
}
```

The main component to focus on is the `assertRevertOptimism` method.
It will allow us to make an assertion against:
1. A specified `revertReason`, and
2. The revert reason retrieved from the transaction of our contract call in our test

Here's an example of how this function would be used in your JavaScript test file:
```js
/* --- snip --- */

// We import this method from Synthetix's utility script.
const { assertRevertOptimism } = require('./utils')

/* --- snip --- */

// Test whether the call on Optimism reverts with the following reason.
await assertRevertOptimism({
  tx,
  reason: '<REVERT_REASON>',
  provider: l2provider
})
```

### `block.timestamp` and `block.number`

::: warning These values will soon be updated
We are working on updating these two values so that instead of a delay in the values that are returned, they will return the _current_ `block.number` and current `block.timestamp`.
:::

**Queries to `block.number`:**

* Work just like L1 queries `block.number`
* Return the `block.number` of the previous block, i.e. transaction

**Queries of `block.timestamp`:**

* Are updated every time a new deposit is submitted
* Return timestamps from 5 to 10 minutes ago

## What is L1 <> L2 communication used for?

