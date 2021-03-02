---
title: FAQs
lang: en-US
tags:
    - contracts
    - high-level
---

# {{ $frontmatter.title }}

## What *is* Optimistic Ethereum?
Optimistic Ethereum is, in a nutshell, an application inside of Ethereum that executes transactions more efficiently than Ethereum itself.
It's based on the concept of the [Optimistic Rollup](https://medium.com/plasma-group/ethereum-smart-contracts-in-l2-optimistic-rollup-2c1cef2ec537), a construction that allows us to "optimistically" publish transaction results without actually executing those transactions on Ethereum (most of the time).
Optimistic Ethereum makes transactions cheaper, faster, and smarter.

## Is Optimistic Ethereum a sidechain?
Nope.
Sidechains are their own blockchain systems with entirely separate consensus mechanisms.
Optimistic Ethereum lives *inside* of Ethereum as a series of smart contracts that are capable of executing Ethereum transactions.
Whereas sidechains rely on their own consensus mechanisms for security, Optimistic Ethereum instead relies on the security of Ethereum itself.

## What's the difference between Optimistic Ethereum and Ethereum?
Optimistic Ethereum is mostly identical to Ethereum.
You can create and interact with Solidity smart contracts (just like you would on Ethereum) using the same wallet software you're already familiar with.
Simply connect your wallet to an Optimistic Ethereum node and you're ready to go!

There are, however, a few very minor differences between Optimistic Ethereum and Ethereum that developers may have to account for.
For instance, we disable infrequently used operations like `CALLCODE`.
If you're a developer, these differences could potentially require a few minor tweaks to your contract code.
Please refer to the [Complete EVM/OVM Comparison](http://community.optimism.io/docs/evm-comparison.html) for a full list of differences.

## Are Optimistic Rollups safe?
Absolutely.
Optimistic Rollups are safe as long as Ethereum itself is "live" (not actively censoring transactions).
This security model is backed by a system of "fraud proofs," whereby users are paid to reveal bad transaction results published to the Optimistic Ethereum chain.

## Why is there a delay when moving assets from Optimistic Ethereum to Ethereum?
Withdrawal delays exist to keep your funds safe.
Optimistic Rollups have to make use of a "fraud proof window" (sometimes called a "challenge period").
This window is a period of time after a transaction result has been published during which users can, if necessary, demonstrate that the published result was incorrect.
This period must be long enough that an invalid result can be detected and reverted, even under extreme conditions.

Currently, community consensus is that this period should be on the order of approximately one week to maximize the safety of user assets.
Since a result can potentially be reverted during the fraud proof window, applications on Ethereum will typically choose to wait until the window has expired to make decisions about results from the Optimistic Ethereum chain.

As a result, we see a delay of about a week when moving assets back onto Ethereum.

## How do I pay for transactions on Optimistic Ethereum?
Transactions that you send directly to the rollup smart contracts are paid for by burning a small amount of gas on Ethereum.
Sequencers and transaction aggregators may additionally charge fees for their services.
Fees for these services are typically charged by sending the service providers a small amount of ETH on Layer 2.

## Does Optimistic Ethereum use ETH natively?
Optimistic Ethereum doesn't use ETH natively in the same way that Ethereum does.
Instead, ETH is represented as an ERC20 token that can be transferred and manipulated, essentially like native version of [wrapped ETH (wETH)](https://weth.io/).
You're still fully capable of transferring ETH between accounts with the added benefit of being able to avoid a separate token like wETH.
The Layer 2 ETH ERC20 contract currently resides at the special Layer 2 address `0x4200000000000000000000000000000000000006`.

**Note**: The [`eth_getBalance` JSON-RPC call](https://eth.wiki/json-rpc/API#eth_getBalance) will retrieve a balance by querying the ETH ERC20 contract and therefore will remain useful for wallets.

## What are sequencers?

Here's a quick list:

* A sequencer is a special user, selected by a MEVA (Miner Extractable Value Auction), who has the authority to order transactions.
* A user can send their transaction to the sequencer and get a signed confirmation for instant inclusion.
* The sequencer receives a bundle of transactions and submits them every couple of minutes.
* Sequencers earn transaction fees from the transactions that they bundle.
* If a sequencer does not include a transaction that they have signed and confirmed, a user can submit that signed confirmation to _slash_ the sequencer's bond ([see Paradigm's detailed guide on Optimism's rollups, under "Incentives + Bonds"](https://research.paradigm.xyz/optimism)).

### Who runs the sequencers?

_Initially, only authorized parties can_. Eventually, permission will be given via a MEVA (Miner Extractable Value Action).

## What are bonded proposers?

Here's a quick list:

* A bonded proposer is usually the sequencer.
* Anyone can become a bonded proposer by putting up some money as a _bond_, but the sequencer gets first priority.
* A bonded proposer looks at those bundles of transactions, computes the actual Ethereum state trie from the bundle, and then publishes the merkle root onto L1.

### Can I run a sequencer?

In the long run, yes! But, you will first have to win an MEV auction. Recall that initially, _only authorized parties_ will have the authority to be a sequencer or bonded proposer.

## What are (fraud) verifiers/provers?

Here's a quick list:

* Anyone can become a (fraud) verifier.
* Verifiers compute the actual state but are not looking to propose. Instead, they are looking to catch a bonded proposer who has lied about the correct state.
* If the verifier finds that a bond proposer lied, they submit a transaction to the L1 chain to have that transaction (which the verifier believes is fraudulent) computed. If the proposer was indeed lying, a portion of their bond (money the proposer placed up front) is taken away and given to the verifier. Some of the proposer's bond is burned in case the proposer is also the verifier.

### Who runs fraud provers/verifiers?

Anyone!

### Can I run a fraud prover/verifier?

Yes!

## What are nodes?

Anyone can be a node. And, any node can recompute the state themselves (just like you would on L1).

## What are the incentives for running sequencers and fraud provers/verifiers?

Sequencers get transaction fees. Fraud provers/verifiers get the bond of a deceitful proposer when they prove fraud.
