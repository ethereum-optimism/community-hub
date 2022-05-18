---
title: How is Bedrock Different?
lang: en-US
---

Bedrock is the next major release of the Optimism network, planned for the second half of 2022. 
Here are the major changes:

## Executables (for replicas and devnodes)

In bedrock processing is divided between a rollup node, which replaces some DTL functionality, and an execution engine, which has less of a difference from upstream geth than the current l2geth has.

### Rollup node

The rollup node provides L1 information to the execution engine.
It has these important differences from the existing DTL:

- The DTL synchronizes from both L1 and L2.
  In bedrock the execution engine uses the standard Ethereum mechanism to synchronize with L2, and the rollup node only provides information from L1.
- The DTL is stateful, it keeps a copy of all the L2 transactions.
  The rollup node is stateless, it gets everything it needs from L1.


### Execution engine

The execution engine runs a slightly modified version of geth.
In terms of EVM equivalence, it is [even closer to upstream geth](https://github.com/ethereum-optimism/reference-optimistic-geth/compare/master...optimism-prototype) than the current version.

One important area where this is advantageous is synchronization.
The execution engine *can* synchronize from the rollup node (such synchronization is necessary for censorship resistance), but it can also synchronize for other Optimism execution engines, which is a lot faster.
To trust the synchronization it has to match with the state root that is always provided by the rollup node.


## Network

In general, the network in bedrock is a lot closer to Ethereum, at last post-merge Ethereum, then the current incarnation.


### Blocks

In bedrock blocks are produced every two seconds, regardless of whether there are transactions to put in them or not. 
This is different from the current version, which always produces one block per transaction.

### Transactions

- Transaction acceptance will use the same EIP 1559 mechanism as Ethereum L1.
  The major difference is that ETH is not burned, but sent to the sequencer wallet.

- Transactions aren't rejected or accepted immediately, but are buffered in a mempool.
  This mempool is private.


## Communication between layers

### Deposits (from Ethereum to Optimism)

### Withdrawals (from Optimism to Ethereum)


## Internal execution (the EVM and runtime environment)