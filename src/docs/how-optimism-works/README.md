---
title: How Optimism Works
lang: en-US
---

## Introduction

Hello!
By the time you've finished reading this page you should have a foundational understanding of how Optimism makes Ethereum transactions cheaper and faster, the approach that Optimism is taking to scaling both Ethereum and Ethereum's values, and why Optimism is the best place to build your next Ethereum-native app.

We've tried to make this guide as comprehensive as possible while still keeping the content accessible to most readers.
Some content on this page is geared towards readers with a technical background but should still be comprehensible to those with a basic understanding of how blockchains work.
Generally speaking, we err on the side of simplicity and approachability.
Readers interested in a low-level look into Optimism under the hood should refer to the [Protocol](../protocol/) section of this website.

Without further ado, let's find out *How Optimism Works*!

## Design philosophy

Optimism is built according to a strong design philosophy that stands on four main pillars: simplicity, pragmatism, sustainability, and, of course, optimism.
It's important to understand these pillars as they heavily influence the design of Optimism as a whole.

### Simplicity

Optimism is designed to be as simple as possible for the featureset it provides.
Ideally, Optimism should be composed of the minimum number of moving parts required for a secure, scalable, and flexible L2 system.
This simplicity gives Optimism's design a number of significant advantages over other more complex L2 constructions.

Simplicity reduces engineering overhead, which in turn means we can spend our time working on new features instead of re-creating existing ones.
Optimism prefers to use existing battle-tested Ethereum code and infrastructure where possible.
The most visible example of this philosophy in practice is the choice to use Geth as Optimism's client software.

When dealing with critical infrastructure, simplicity is also security.
Every line of code we write is an opportunity to introduce unintentional bugs.
A simple protocol means there's less code to write and, as a result, less surface area for potential mistakes.
A clean and minimal codebase is also more accessible to external contributors and auditors.
All of this serves to maximize the security and correctness of the Optimism protocol.

Simplicity is also important for the long-term vision of Optimism.
By limiting the amount of code that we write on top of Ethereum tooling, we're able to spend most of our time working directly with existing codebases.
Engineering effort that goes into Optimism can also directly benefit Ethereum, and vice versa.
This will only become more pronounced as the Optimism protocol solidifies and existing resources can be redirected towards core Ethereum infrastructure.

### Pragmatism

For all its idealism, the design process behind Optimism is ultimately driven by pragmatism.
The core Optimism team has real-world constraints, the projects that build on Optimism have real-world needs, and the users that engage with Optimism have real-world problems.
Optimism's design philosophy prioritizes user and developer needs over theoretical perfection.
Sometimes the best solution isn't the prettiest one.

Optimism is also developed with the understanding that any core team will have limited areas of expertise.
Optimism is developed iteratively and strives to continously pull feedback from users.
Many core Optimism features today (like [EVM Equivalence](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306)) were only made possible by this iterative approach to protocol development.

### Sustainability

Optimism is in it for the long haul.
Application developers need assurance that the platform they're building on will remain not only operational but competitive over long periods of time.
Optimism's design process is built around the idea of long-term sustainability and not taking shortcuts to scalability.
At the end of the day, a scalable system means nothing without the ecosystem that sustains it.

Sustainability actively influences Optimism's protocol design in ways that go hand-in-hand with our philosophy of simplicity.
The more complex a codebase, the more difficult it is for people outside of the core development team to actively contribute.
By keeping our codebase simple we're able to build a bigger community of contributors who can help maintain the protocol long-term.

### Optimism

Of course, none of this would be possible without a sense of optimism.
Our optimism about the Ethereum vision keeps this project moving forward.
We believe in an optimistic future for Ethereum, a future where we get to redesign our relationships to the institutions that coordinate our lives.

Although Optimism looks like a standalone blockchain, it's ultimately designed as an extension to Ethereum.
We keep this in mind whenever we're creating new features or trying to simplify existing ones.
Optimism is as close to Ethereum as possible not only for pragmatic reasons, but because Optimism exists so that Ethereum can succeed.
We hope that you can see the influence of this philosophy when looking at Optimism's design.

## Rollup Protocol

We've covered most of the "why" behind Optimism.
Now it's time to explain the big idea that makes Optimism possible: the Optimistic Rollup.
We'll go through a brief explainer of *how* Optimistic Rollups work at a high level.
Then we'll explain *why* Optimism is built as an Optimistic Rollup and why we believe it's the best option for a system that addresses all of our design goals.

### Optimistic Rollups TL;DR

Optimism is an "Optimistic Rollup," which is basically just a fancy way of describing a blockchain that piggy-backs off of the security of another "parent" blockchain.
Specifically, Optimistic Rollups take advantage of the consensus mechanism (like PoW or PoS) of their parent chain instead of providing their own.
In Optimism's case this parent blockchain is Ethereum.

<div align="center">
<img width="400" src="../../assets/docs/how-optimism-works/1.png">
</div>

### Block storage

All Optimism blocks are stored within a special smart contract on Ethereum called the [`CanonicalTransactionChain`](https://etherscan.io/address/0x5E4e65926BA27467555EB562121fac00D24E9dD2) (or CTC for short).
Optimism blocks are held within an append-only list inside of the CTC (we'll explain exactly how blocks are added to this list in the next section).
This append-only list forms the Optimism blockchain.

The `CanonicalTransactionChain` includes code that guarantees that the existing list of blocks cannot be modified by new Ethereum transactions.
However, this guarantee can be broken if the Ethereum blockchain itself is reorganized and the ordering of past Ethereum transactions is changed.
The Optimism mainnet is configured to be robust against block reorganizations of up to 50 Ethereum blocks.
If Ethereum experiences a reorg larger than this, Optimism will reorg as well.

Of course, it's a key security goal of Ethereum to not experience these sort of significant block reorganizations.
Optimism is therefore secure against large block reorganizations as long as the Ethereum consensus mechanism is too.
It's through this relationship (in part, at least) that Optimism derives its security properties from Ethereum.

### Block production

Optimism block production is primarily managed by a single party, called the "sequencer," which helps the network by providing the following services:

- Providing instant transaction confirmations and state updates.
- Constructing and executing L2 blocks.
- Submitting user transactions to L1.

The sequencer has no mempool and transactions are immediately accepted or rejected in the order they were received.
When a user sends their transaction to the sequencer, the sequencer checks that the transaction is valid (i.e. pays a sufficient fee) and then applies the transaction to its local state as a pending block.
These pending blocks are periodically submitted in large batches to Ethereum for finalization.
This batching process significantly reduces overall transaction fees by spreading fixed costs over all of the transactions within a given batch.
The sequencer also applies some basic compression techniques to minimize the amount of data published to Ethereum.

Because the sequencer is given priority write access to the L2 chain, the sequencer can provide a strong guarantee of what state will be finalized as soon as it decides on a new pending block.
In other words, it is precisely known what will be the impact of the transaction.
As a result, the L2 state can be reliably updated extremely quickly.
Benefits of this include a snappy, instant user experience, with things like near-real-time Uniswap price updates.

Alternatively, users can skip the sequencer entirely and submit their transactions directly to the `CanonicalTransactionChain` via an Ethereum transaction.
This is typically more expensive because the fixed cost of submitting this transaction is paid entirely by the user and is not amortized over many different transactions.
However, this alternative submission method has the advantage of being resistant to censorship by the sequencer.
Even if the sequencer is actively censoring a user, the user can always continue to send transactions on Optimism.

For the moment, [OP Labs PBC](https://www.optimism.io/) runs the only block producer on the Optimism network.
Refer to [Protocol specs](../protocol/README.md) section for more information about how we plan to decentralize the Sequencer role in the future.

::: tip NOTE
For users to be able to execute *withdrawals* in a censorship-resistant manner, a rollup must allow participants to trustlessly publish transaction *results* to Ethereum.
Currently, [OP Labs PBC](https://www.optimism.io/) is the only entity able to publish transaction results while we work to decentralize the "result proposal" role.
Although not unique to Optimism, it's worth understanding these security properties when using the system.
Permissionless result publication should be introduced alongside the production release of our [Cannon](https://github.com/ethereum-optimism/cannon/) fault proving system.
:::

### Block execution

Ethereum nodes download blocks from Ethereum's p2p network.
Optimism nodes instead download blocks directly from the append-only list of blocks held within the `CanonicalTransactionChain` contract.
See the above section regarding [block storage](#block-storage) for more information about how blocks are stored within this contract.

Optimism nodes are made up of two primary components, the Ethereum data indexer and the Optimism client software.
The Ethereum data indexer, also called the ["data transport layer"](https://github.com/ethereum-optimism/optimism/tree/develop/packages/data-transport-layer) (or DTL), reconstructs the Optimism blockchain from blocks published to the `CanonicalTransactionChain` contract.
The DTL searches for events emitted by the `CanonicalTransactionChain` that signal that new Optimism blocks have been published.
It then inspects the transactions that emitted these events to reconstruct the published blocks in the [standard Ethereum block format](https://ethereum.org/en/developers/docs/blocks/#block-anatomy).

The second part of the Optimism node, the Optimism client software, is an almost completely vanilla version of [Geth](https://github.com/ethereum/go-ethereum).
This means Optimism is close to identical to Ethereum under the hood.
In particular, Optimism shares the same [Ethereum Virtual Machine](https://ethereum.org/en/developers/docs/evm/), the same [account and state structure](https://ethereum.org/en/developers/docs/accounts/), and the same [gas metering mechanism and fee schedule](https://ethereum.org/en/developers/docs/gas/).
We refer to this architecture as ["EVM Equivalence"](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306) and it means that most Ethereum tools (even the most complex ones) "just work" with Optimism.

The Optimism client software continuously monitors the DTL for newly indexed blocks.
When a new block is indexed, the client software will download it and execute the transactions included within it.
The process of executing a transaction on Optimism is the same as on Ethereum: we load the Optimism state, apply the transaction against that state, and then record the resulting state changes.
This process is then repeated for each new block indexed by the DTL.

### Bridging assets between layers

Optimism is designed so that users can send arbitrary messages between smart contracts on Optimism and Ethereum.
This makes it possible to transfer assets, including ERC20 tokens, between the two networks.
The exact mechanism by which this communication occurs differs depending on the direction in which messages are being sent.

Optimism uses this functionality in the Standard bridge to allow users to deposit assets (ERC20s and ETH) from Ethereum to Optimism and also allow withdrawals of the same from Optimism back to Ethereum.
See the [developer documentation and examples](../developers/bridge/standard-bridge/) on details on the inner workings of the Standard bridge.

#### Moving from Ethereum to Optimism

To send messages from Ethereum to Optimism, users simply need to trigger the `CanonicalTransactionChain` contract on Ethereum to create a new block on Optimism block.
See the above section on [block production](#block-production) for additional context.
User-created blocks can include transactions that will appear to originate from the address that generated the block.

#### Moving from Optimism to Ethereum

It's not possible for contracts on Optimism to easily generate transactions on Ethereum in the same way as Ethereum contracts can generate transactions on Optimism.
As a result, the process of sending data from Optimism back to Ethereum is somewhat more involved.
Instead of automatically generating authenticated transactions, we must instead be able to make provable statements about the state of Optimism to contracts sitting on Ethereum.

Making provable statements about the state of Optimism requires a [cryptographic commitment](https://en.wikipedia.org/wiki/Commitment_scheme) in the form of the root of the Optimism's [state trie](https://medium.com/@eiki1212/ethereum-state-trie-architecture-explained-a30237009d4e).
Optimism's state is updated after each block, so this commitment will also change after every block.
Commitments are regularly published (approximately once or twice per hour) to a smart contract on Ethereum called the [`StateCommitmentChain`](https://etherscan.io/address/0xBe5dAb4A2e9cd0F27300dB4aB94BeE3A233AEB19).

Users can use these commitments to generate [Merkle tree proofs](https://en.wikipedia.org/wiki/Merkle_tree) about the state of Optimism.
These proofs can be verified by smart contracts on Ethereum.
Optimism maintains a convenient cross-chain communication contract, the [`L1CrossDomainMessenger`](https://etherscan.io/address/0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1), which can verify these proofs on behalf of other contracts.

These proofs can be used to make verifiable statements about the data within the storage of any contract on Optimism at a specific block height.
This basic functionality can then be used to enable contracts on Optimism to send messages to contracts on Ethereum.
The [`L2ToL1MessagePasser`](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000000) contract (predeployed to the Optimism network) can be used by contracts on Optimism to store a message in the Optimism state.
Users can then prove to contracts on Ethereum that a given contract on Optimism did, in fact, mean to send some given message by showing that the hash of this message has been stored within the `L2ToL1MessagePasser` contract.

### Fault proofs

In an Optimistic Rollup, state commitments are published to Ethereum without any direct proof of the validity of these commitments.
Instead, these commitments are considered pending for a period of time (called the "challenge window").
If a proposed state commitment goes unchallenged for the duration of the challenge window (currently set to 7 days), then it is considered final.
Once a commitment is considered final, smart contracts on Ethereum can safely accept proofs about the state of Optimism based on that commitment.

When a state commitment is challenged, it can be invalidated through a "fault proof" ([formerly known as a "fraud proof"](https://github.com/ethereum-optimism/optimistic-specs/discussions/53)) process.
If the commitment is successfully challenged, then it is removed from the `StateCommitmentChain` to eventually be replaced by another proposed commitment.
It's important to note that a successful challenge does not roll back Optimism itself, only the published commitments about the state of the chain.
The ordering of transactions and the state of Optimism is unchanged by a fault proof challenge.

The fault proof process is currently undergoing major redevelopment as a side-effect of the November 11th [EVM Equivalence](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306) update.
You can read more about this process within the [Protocol specs](../protocol/README.md) section of this website.

## Start building

You've made it to the end of *How Optimism Works*.
We hope you've learned quite a bit about Optimism under the hood.
Of course, the end of one journey is always the beginning of another.
Now that you're an expert in all things Optimism, it's time to start building!

### Deploy an app today

Building smart contracts on Optimism has never been easier.
If you're looking for a place to get started, we recommend checking out [our developer docs](../developers).
There you'll find everything you need to know to build and deploy your first app on Optimism.

### Get involved with Optimism

Excited about Optimism?
Want to contribute directly?
Head over to our [contributing page](../contribute) where you'll find a list of many of the ways you can actively help to build Optimism itself.
You can also try hopping in [the Optimism discord](https://discord-gateway.optimism.io) to find additional ways to help out.

### Dive deeper

*How Optimism Works* is a high-level overview of how Optimism really works.
If you're interested in diving even deeper, you should check out the [protocol specs](../protocol) section of this website.
