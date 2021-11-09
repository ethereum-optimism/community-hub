---
title: Block Numbers and Timestamps
lang: en-US
---

::: tip OVM 2.0 Release Dates
OVM 2.0 is already released on the Kovan test network.
We expect to deploy it to the production Optimistic Ethereum network on November 11th.
:::


# {{ $frontmatter.title }}

::: warning OVM 2.0 Page
This page refers to the **new** state of Optimistic Ethereum after the
OVM 2.0 update. 
:::

Block numbers and timestamps in Optimistic Ethereum are similar, but not entirely identical, to those in Ethereum.

## Block numbers

`block.number` in L2 corresponds to the L2 block number, not “Last finalized L1 block number” like it used to. The L1 Block number is accessible via a new predeployed contract.


## Timestamps

The OVM 2.0 time stamp updates with each new deposit or after 5 minutes if there has not been a deposit. So it correspond to "Last Finalized L1 Timestamp" 

The timestamp of a block when queried via the `eth_getBlockByNumber` JSON-RPC endpoint is the same as the value of `block.timestamp` inside of a contract executed within that block.
Just like the OVM block number, the OVM timestamp corresponds to the L1 timestamp of the last confirmed L1 ⇒ L2 transaction.
Similarly, if five minutes have passed since the last L1 ⇒ L2 transaction, the timestamp is automatically refreshed.
