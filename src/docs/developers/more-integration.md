---
title: Additional Integration Docs
lang: en-US
tags:
    - contracts
    - buidling
    - building
---

# {{ $frontmatter.title }}

## Introduction

::: tip Work in Progress™
_Our documentation is a rapidly improving work in progress. If you have questions or feel like something is missing feel free to ask in our [Discord server](https://discord.gg/5TaAXGn2D8) where we (and our awesome community) are actively responding, or [open an issue](https://github.com/ethereum-optimism/community-hub/issues) in the GitHub repo for this site._
:::

This document is for developers who have to deal with complex contracts and need a bit more guidance on compiling, testing, and deploying their contracts for Optimistic Ethereum.

The main purpose of this document is to solve blockers that most developers will run into when adding complexity to their contract tests for Optimistic Ethereum.

You'll learn about:

1. Common gotchas while developing for Optimistic Ethereum and how to get around them.
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

### `block.timestamp` and `block.number` in L2

::: warning These values will soon be updated
We are working on updating `block.timestamp` and `block.number` so that instead of a delay in the values that are returned, they will return the _current_ `block.number` and current `block.timestamp`.
:::

**Queries to `block.number`:**

* Are _slightly_ different than `block.number` in Ethereum.
* Return the `block.number` of the previous block. Note that there is no such thing as a "block" in Optimistic Ethereum as blocks in Ethereum. A block on Optimistic Ethereum is merely a block of just 1 transaction, where these blocks made up of single transactions are ordered by sequencers in the network.

**Queries to `block.timestamp`:**

* Are _mostly_ different than `block.timestamp` in Ethereum.
* Are updated every time a new deposit is submitted.
* Return timestamps from roughly 5 to 10 minutes ago.

## What is L1 <> L2 communication used for?

L1 <> L2 communication is used for relaying a message with your transaction from Ethereum (L1) to Optimistic Ethereum (L2) or vice versa (L2 to L1).
Message passing is ideal for relaying some kind of important information to your users regarding the state change of your contracts from the sending chain (L1 or L2) to the receiving chain (L2 or L1).
To illustrate, here's an example of how message passing works with a deposit and withdrawal example.

### Example use case for L1 <> L2 communication

Say that you wanted to send a gift of an _ERC721 token_ (NFT) for your friend to withdraw on L2.
When your friend makes the withdrawal on L2, you also want to _relay a message_ to your friend that notifies them to deposit their tokens to an L2 loan provider (e.g. Loans4NFTs) to unlock an additional feature of the gifted NFT.

However, to initiate a deposit of this NFT token to Loans4NFTs, you first need to get this NFT on L1.
So, you initiate a deposit of your NFT to an ERC721 gateway contract (you can think of this deposit as "locking in your token as collateral" to L1) and whitelist your friend's wallet address so that your friend can mint and withdraw the gifted NFT on L2.
Now that the NFT has been deposited on L1, it can now be withdrawn and claimed by your friend on L2 -- assuming that you include a `require` statement to check that the withdrawer is your friend's address.
For your friend to mint this NFT, he would have to initiate a withdrawal transaction from the address that you whitelisted in the deposit transaction.
Assume your friend successfully uses the correct address to withdraw and claim his NFT that you gifted him.
He then receives a relayed message from L1 that reads, "Hey fren! I left you a surprise for when you deposit your NFT to Loan4NFTs :)".
And, when your friend deposits their NFT to Loans4NFTs, he receives an additional yield farming reward for the first 30 days while keeping his NFT locked with Loan4NFTs.

### Best practices

The example shown above is to illustrate _just one_ ideal use case for L1 <> L2 communication, but there are a myriad of possible use cases!
However, since this cross-layer message passing is _asynchronous_, we suggest that it be used mainly for communicating additional information _asynchronously_ from one chain to the next.

Whether that's for notifying your user of:

* A special new gift on the receiving chain,
* A timestamp of when their withdrawn L2 tokens are ready to be staked at a desired protocol on the receiving chain,
* A list of compatible exchanges or protocols that their token can be used on,
* Unique rewards or promotions that can be claimed on specific protocols on the receiving chain,

these messages should serve as a helpful nudge to your users where there otherwise would be absent communication between your user's action and the action that you desire your users to make when withdrawing their tokens on L2.
