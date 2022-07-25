---
title: Rollup Protocol
lang: en-US
---

The big idea that makes Optimism possible is the Optimistic Rollup.
We'll go through a brief explainer of *how* Optimistic Rollups work at a high level.
Then we'll explain *why* Optimism is built as an Optimistic Rollup and why we believe it's the best option for a system that addresses all of our design goals.

## Optimistic Rollups TL;DR

Optimism is an "Optimistic Rollup," which is basically just a fancy way of describing a blockchain that piggy-backs off of the security of another "parent" blockchain.
Specifically, Optimistic Rollups take advantage of the consensus mechanism (like PoW or PoS) of their parent chain instead of providing their own.
In Optimism's case this parent blockchain is Ethereum.

<div align="center">
<img width="400" src="../../assets/docs/how-optimism-works/1.png">
</div>

## Block storage

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

## Block production

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
Even if the sequencer is actively censoring a user, the user can always continue to use Optimism and recover any funds through this mechanism.

For the moment, [Optimism PBC](https://www.optimism.io/) runs the only block producer. Refer to [Protocol specs](../protocol/README.md) section for more information about how we plan to decentralize the Sequencer role in the future.

## Block execution

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

## Bridging assets between layers

Optimism is designed so that users can send arbitrary messages between smart contracts on Optimism and Ethereum.
This makes it possible to transfer assets, including ERC20 tokens, between the two networks.
The exact mechanism by which this communication occurs differs depending on the direction in which messages are being sent.

Optimism uses this functionality in the Standard bridge to allow users to deposit assets (ERC20s and ETH) from Ethereum to Optimism and also allow withdrawals of the same from Optimism back to Ethereum.
See the [developer documentation and examples](../developers/bridge/standard-bridge/) on details on the inner workings of the Standard bridge.

### Moving from Ethereum to Optimism

To send messages from Ethereum to Optimism, users simply need to trigger the `CanonicalTransactionChain` contract on Ethereum to create a new block on Optimism block.
See the above section on [block production](#block-production) for additional context.
User-created blocks can include transactions that will appear to originate from the address that generated the block.

### Moving from Optimism to Ethereum

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

## Fault proofs

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
