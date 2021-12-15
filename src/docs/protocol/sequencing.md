---
title: Optimistic Sequencing
lang: en-US
---

# {{ $frontmatter.title }}

## What is a sequencer?

Optimistic Ethereum block production is primarily managed by a single party, called the "sequencer," which helps the network by providing the following services:

- Providing instant transaction confirmations and state updates.
- Constructing and executing L2 blocks.
- Submitting user transactions to L1.

When a user sends their transaction to the sequencer, the sequencer checks that the transaction is valid (i.e. pays a sufficient fee) and then applies the transaction to its local state as a pending block.  These pending blocks are periodically submitted to the layer 1 chain for finalization. 

Because the sequencer is given priority write access to the L2 chain, the sequencer can provide a strong guarantee of what state will be finalized as soon as it decides on a new pending block. In other words, it is precisely known what will be the impact
of the transaction. As a result, the L2 state can be reliably updated extremely quickly. Benefits of this include a snappy, instant user experience, with things like near-real-time Uniswap price updates.

## What happens if the sequencer goes offline?

Since there is only one sequencer at a time, we must consider the case in which the sequencer starts censoring transactions, or just goes offline, and stops submitting pending blocks to L1 for finalization. Critically, **this does not mean that users can no longer create L2 transactions.** Instead, there is a mechanism by which users may submit their transactions to L1 directly, bypassing the sequencer entirely.

The rules of the chain require that these "forced transactions" be placed into a block within a window called the "force inclusion period." If the sequencer does not include the forced transactions within this window, then its submissions are invalidated, and the next canonical L2 block will contain only the forced transactions and nothing else. This is enforced by the protocol via fraud proofs, meaning that the sequencer truly has no say in the matter.

## How will the sequencer be decentralized over time?

Currently, Optimism runs the sole sequencer on Optimistic Ethereum.  As discussed above, this does not mean that Optimism can censor user transactions. However, it is still desirable to decentralize the sequencer over time, eliminating Optimism's role entirely.

The first step to decentralizing the sequencer is to still have one sequencer at a time, but rotate that sequencer with some frequency. The precise mechanic for sequencer rotation is not yet finalized, but will involve two components:

- an **economic mechanism** which creates a competitive market for sequencing, and redirects excess sequencer profits [towards protocol development](https://medium.com/ethereum-optimism/retroactive-public-goods-funding-33c9b7d00f0c).
- a **governance mechanism** which prevents sequencers from prioritizing short-term profits over the long-term health of the network.

After this, the next step is to support multiple concurrent sequencers. This can be simply achieved by adopting a standard BFT consensus protocol, as used by other L1 protocols and sidechains like Polygon and Cosmos.