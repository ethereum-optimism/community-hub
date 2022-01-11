---
title: How Optimism Works
lang: en-US
---

# {{ $frontmatter.title }}

Audience:
- CEO/BizDev-types
- Plain English, but assuming some technical understanding

Goals:
- Explain how it will scale long term
- Explain the security assumptions, benefits, tradeoffs, and goals of Optimism

## Introduction

Welcome to *How Optimism Works*.

By the time you're finished reading this page you should have a foundational understanding of how Optimism makes Ethereum transactions cheaper and faster, the approach that Optimism is taking to scaling both Ethereum and Ethereum's values, and why Optimism is the best place to build your next Ethereum-native app.

We'll be covering some technical material on this page.
We've tried to make this guide as comprehensive as possible while still keeping the content accessible to most readers.
As a result, we will *not* be diving deeply into the minutiae of the Optimism protocol.
Readers interested in a low-level look into Optimism under the hood should refer to the [Protocol](http://localhost:8080/docs/protocol/) section of this website.

Without further ado, let's learn *How Optimism Works*!

## Rollups 101

- Blocks are published to Ethereum by a block producer (called the Sequencer)
- Other nodes get these blocks from Ethereum and execute them, deterministically
- Nodes can publish "transaction results" to Ethereum
  - Ethereum doesn't execute, that's how it gets cheaper
- Other nodes can then challenge the results, then there's a challenge process
  - Constructed so that *eventually* the correct result will reach Ethereum
- Use this section to point out the key components (indexer/l1 node, client software, fraud proof)

## Design philosophy

- Optimism design philosophy
  - Simplicity
  - Minimalism
  - Pragmatism
  - Optimism (about Ethereum and the future of crypto)

## Architecture overview

- High level architecture of Optimism
  - Every node has two parts, the l2 client and an l1 node + indexer
  - Two types of nodes, Sequencer and Verifier
  - Smart contracts on L1 are used to store list of transactions and transaction results
  - Users make transactions by sending to a node which will forward transactions to the Sequencer to be bundled, or alternatively by triggering a transaction with a special contract on L1

## Node software
- Optimism node software
  - Node software is the core of Optimism
  - We use Geth with only minor modifications - the main modification is the introduction of a new transaction type for "deposits".
  - Use this section to really hammer home the fact that this is JUST GETH and it doesn't get any simpler than that, it's the same battle-tested software that gets used for Ethereum
  - We use JUST GETH for multiple reasons, but mainly it's for the stability and because we believe in the future of Etheruem and we want to put ourselves in a position where we can actively contribute back to the Geth codebase and contribute back to Ethereum.
  - Nodes get their data from the indexer, which uses an L1 node and a connection to the Sequencer to get the blocks.

## Block production

- How blocks get made
  - Users can send transactions either to an L2 node or post them directly to L1 themselves
  - When sent to an L2 node, the transaction gets sent to the Sequencer to be bundled into a block
  - When sent to L1 directly, a block is created on L1 and pushed into the chain
  - Combination of blocks created on L1 and blocks published by Sequencer creates some canonical list of blocks
  - And this list of blocks is what verifier nodes pull down to execute

## Maintaining integrity

- Transaction results
  (NOTE: Currently trusted)
  - Transaction results are published to Ethereum, with one result per transaction currently
  - Transactions can be published by any node that puts up a bond
  - Transaction results are unchecked, they could be correct or they could be bogus (this is "optimistic")
  - Transaction results can be challenged by any other party
  - Can be detected immediately by any honest node because we have 
  - This kicks off a challenge process
- Challenge process TL;DR
  (NOTE: Currently disabled until further notice)
  - Multi-round process a lot like TrueBit
  - We compile Geth down into MIPS and turn the transaction execution into a series of states
  - We go over each state and find the first place where users agree on the input but disagree on the output
  - Then we execute that one step and figure out who's correct
  - If the result is challenged, then we delete that result and all results that were published after it
  - this does NOT mean that transactions are reverted, transactions are never reverted, it's just that a bad result may be removed.
    - Important to drive home

## Transaction cost

- Cost
  - Highlight the simplicity aspect again
  - What is gives you: significantly cheaper transactions
  - Critical to our mission of bringing Ethereum "to the masses"
  - You pay only a few dollars per transaction, currently Optimism is the cheapest and simplest general-purpose L2 on average.

## Developer experience

- Simplicity
  - It's EVM equivalent, which goes further than API-level compatibility.
  - It's literally just Geth under the hood, which means any tooling you can image will "just work" with Optimism
  - Easiest L2 to deploy to, by a longshot. Your devs will appreciate it, and you won't be locked into the ecosystem.
  - We believe in compatibility with other L2s and actively take feedback so you aren't locked in.

## Approach to security
- Approach to security
  - Simplicity also means fewer lines of code that can go wrong and more security in general.
  - L2s naturally have to trade off some cost for security, but that extra cost goes back to keeping your funds safe.
  - Optimism is the place to go if you're dedicated to Ethereum and you want to scale
  - Incremental approach, being pragamatic rather than perfectionist.
    - We iterate quickly and have spent the last year coming up with a design we're happy with
    - We currently have trusted guardrails in place
    - Rails are being removed as we build more confidence in the system
  - Bug bounty program

## Building sustainably

- Building a project is a serious endeavour. We're not here to leave. We're here to create an ecosystem that'll be around in 20 years. We're more serious about it than anyone else.
- Building a long-term ecosystem is about building sustainably. We spend a lot of time building software, but we also spend a lot of time thinking about how we can create a blockchain ecosystem where projects are supported during every stage of the development process.
- We're not in it to create an entirely separate ecosystem. You're not leaving the Ethereum ecosystem. Everything we do goes back into the Ethereum ecosystem.
- Building with the Ethereum codebase wasn't just a practical decision, it was a philosophical one. We want to work on Ethereum, we want to scale Ethereum. Optimism is jsut a part of scaling Etheruem.

## Why Optimism?
- Why Optimism?
  - First reiterate the previous points of cost and security, of the general-purpose rollups our tech is far ahead and we've got an excellent team pushing the protocol and client software even further. "You can expect to save a sigificant amount of money"
  - We're thinking about the future of blockchains in a way that nobody else is. We want to create a sustainable ecosystem where you'll get rewarded for your contribution to the system. Retroactive public goods funding is a part of this, with Optimism you can expect to get top notch support in getting your application running, funded by protocol revenue. Optimism helps you win, it's not just another platform for you to deploy to.

## Dive deeper
- Where to learn more?
  - Contact form if you want to deploy and you want assistance in getting there
  - Docs, help center, discord, github
  - Or just bring your existing Etheruem expertise
  - To Optimism!