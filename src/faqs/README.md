---
title: FAQs
lang: en-US
tags:
    - contracts
    - high-level
---

# {{ $frontmatter.title }}

## What is Optimistic Ethereum?
Optimistic Ethereum is, in a nutshell, an application inside of Ethereum that executes transactions more efficiently than Ethereum itself.
It's based on the concept of the [Optimistic Rollup](), a construction that allows us to "optimistically" publish transaction results without actually executing those transactions on Ethereum (most of the time).
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
For instance, we disable infrequently used operations like [CALLCODE]().
If you're a developer, these differences could potentially require a few minor tweaks to your contract code.
Please refer to the [Complete EVM/OVM Comparison]() for a full list of differences.

## Are Optimistic Rollups safe?
Absolutely.
Optimistic Rollups are safe as long as Ethereum itself is "live" (not actively censoring transactions).
This security model is backed by a system of "fraud proofs," whereby users are paid to reveal bad transaction results published to the Optimistic Ethereum chain.

## Why is there a delay when moving assets from Optimistic Ethereum to Ethereum?
To keep your funds safe.
Optimistic Rollups need to make use of a "fraud proof window" (sometimes called a "challenge period").
This window is a period of time after a transaction result has been published during which users can, if necessary, demonstrate that the published result was incorrect.
This period must be long enough that an invalid result can be detected and reverted, even under extreme conditions.

Currently, community consensus is that this period should be on the order of approximately one week to maximize the safety of user assets.
Since a result can potentially be reverted during the fraud proof window, applications on Ethereum will typically choose to wait until the window has expired to make decisions about results from the Optimistic Ethereum chain.
As a result, we seem a delay of about a week when moving assets back onto Ethereum.

## What is the "sequencer"?
The sequencer is a specialized node that has the unique right to control the ordering of transactions on the rollup chain.

## Can the sequencer prevent me from using Optimistic Ethereum?
No. Even if a sequencer chooses to completely ignore your transactions, you can always send transaction data directly to the rollup contract on Ethereum. Doing so bypasses the sequencer (or any other transaction aggregator), making the system highly censorship resistant as long as Ethereum itself is not censoring your transactions.

## How do I pay for transactions on Optimistic Ethereum?
Transactions that are sent directly to the rollup smart contracts pay fees by burning a small amount of gas on Ethereum.
In the long run, sequencers will be able choose how they would like to receive fees, and clients will automatically configure themselves in order to do so.
At the moment, sequencers receive fees by transferring a small amount of ETH on Layer 2.

## Does Optimistic Ethereum use ETH natively?
Optimistic Ethereum does not use ETH natively in the same way that Ethereum does. Instead, ETH is represented as an ERC20 token that can be transferred and manipulated much like wrapped ETH (wETH). We currently do not support ETH-related operations that are supported on Ethereum (e.g., transferring ETH). Users and app developers should instead use the ETH ERC20 contract located at [IDK].
