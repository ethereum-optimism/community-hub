---
title: Block Numbers and Timestamps
lang: en-US
---

::: tip OVM 2.0 Release Dates
OVM 2.0 is already released on the Kovan test network.
On October 28th we will deploy it to the production Optimistic Ethereum network.
:::


# {{ $frontmatter.title }}

::: danger OVM 1.0 Page
This page refers to the **current** state of the Optimistic Ethereum
network. Some of the information may be relevant to OVM 2.0, which will
be deployed in October, but some of it may change.
:::

Block numbers and timestamps in Optimistic Ethereum are similar, but not entirely identical, to those in Ethereum.

## Block numbers

There are currently two different things that we refer to as "block numbers" within Optimistic Ethereum:

### L2 Geth Block Number

The **L2 Geth block number** refers to the number of blocks in the L2 blockchain.
Because we mine one block per transaction, this is the same as the number of transactions in the chain.
This is the value returned by the `eth_getBlockNumber` JSON-RPC endpoint.
If you'd like to query a specific L2 block, you will refer to the block by it's L2 Geth block number.

### OVM Block Number

When you call `block.number` inside of a contract, you will get the **OVM block number**.
This block number corresponds to the L1 block number of the last confirmed L1 ⇒ L2 transaction.
Because L1 ⇒ L2 transactions are only considered confirmed after a certain number of blocks, this number will lag behind the current L1 block number by around five minutes.
This was a deliberate design decision because many smart contracts rely on Ethereum's ~15s block time.
If five minutes have passed since the last L1 ⇒ L2 transaction, the block number is automatically refreshed.

**Accessing the OVM Block Number via the JSON-RPC API**

You can access the current OVM block number by requesting the latest block via the `eth_getBlockByNumber` JSON-RPC endpoint.
Every OVM transaction has an additional field, `l1BlockNumber`, which contains the OVM block number during that transaction..

## Timestamps

### OVM Timestamp

Unlike with the block number, there is no difference between the **L2 Geth timestamp** and the **OVM timestamp**.
The timestamp of a block when queried via the `eth_getBlockByNumber` JSON-RPC endpoint is the same as the value of `block.timestamp` inside of a contract executed within that block.
Just like the OVM block number, the OVM timestamp corresponds to the L1 timestamp of the last confirmed L1 ⇒ L2 transaction.
Similarly, if five minutes have passed since the last L1 ⇒ L2 transaction, the timestamp is automatically refreshed.
