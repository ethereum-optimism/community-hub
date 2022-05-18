---
title: How is Bedrock Different?
lang: en-US
---

Bedrock is the next major release of the Optimism network, planned for the second half of 2022. 
Here are the major changes:

## Runtime (for replicas and devnodes)

In bedrock processing is divided between a rollup node, which replaces some DTL functionality, and an execution engine, which has less of a difference from upstream geth than the current l2geth has.

### The rollup node

The rollup node provides L1 information to the execution engine.
It has these important differences from the existing DTL:

- The DTL synchronizes from both L1 and L2.
  In bedrock the execution engine uses the standard Ethereum mechanism to synchronize with L2, and the rollup node only provides information from L1.
- The DTL is stateful, it keeps a copy of all the L2 transactions.
  The rollup node is stateless, it gets everything it needs from L1.


### The execution engine

The execution engine runs a slightly modified version of geth.
In terms of EVM equivalence, it is [even closer to upstream geth](https://github.com/ethereum-optimism/reference-optimistic-geth/compare/master...optimism-prototype) than the current version.


## Blocks

- Blocks are produced every two seconds, regardless of traffic.


## Transactions

- Transaction acceptance will use the same EIP 1559 mechanism as Ethereum L1.
  The major difference is that ETH is not burned, but sent to the sequencer wallet.

- Transactions aren't rejected or accepted immediately, but are buffered in a mempool.
  This mempool is private.


## ETH

