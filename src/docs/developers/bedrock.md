---
title: How is Bedrock Different?
lang: en-US
---

Bedrock is the next major release of the Optimism network, planned for the second half of 2022. 
Here are the major changes:


## Blockchain

In general, the blockchain in bedrock is a lot closer to Ethereum, at last post-merge Ethereum, than the current incarnation.


### Blocks

In bedrock blocks are produced every two seconds, regardless of whether there are transactions to put in them or not. 
This brings us closer to post-merge Ethereum, where [blocks are expected every twelve seconds](https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/).



### Transactions

Currently transactions are either accepted immediately or rejected immediately.
In bedrock transactions are placed in a mempool, and the transaction's L2 execution gas price is determined using the same mechanism that is used on Ethereum, [EIP 1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md).

There are two major differences between Ethereum and Optimism in this regard:

- ETH is not burned, but used for things the protocol needs.
  Burning ETH on L2 will only lock it in the bridge forever.
- For now, the mempool with pending transactions is going to be private. 

Note that this change only applies to the L2 execution fee. 

The L1 security fee, which is the majority of the transaction costs in most cases, will use roughly the same mechanism it uses now.
However, instead of using the latest L1 gas price ([possibly modified to avoid changes of over 25% in a five minute period](https://help.optimism.io/hc/en-us/articles/4416677738907-What-happens-if-the-L1-gas-price-spikes-while-a-transaction-is-in-process-)), bedrock uses a moving average to smooth out peaks in L1 gas price.



## Communication between layers

In Optimism terminology "deposit" refers to any message going from the Ethereum blockchain to Optimism, whether it has any assets attached or not.
Similarly, "withdrawal" refers to any message going from Optimism to Ethereum.



### Deposits (from Ethereum to Optimism)




### Withdrawals (from Optimism to Ethereum)




## Internal execution (the EVM and runtime environment)





## Executables

The information in this section is primarily useful to people who run an Optimism network node, either as a replica or as an independent development node.

In bedrock processing is divided between an rollup node, which replaces some DTL functionality, and an execution engine, which has less of a difference from upstream geth than the current l2geth has.

### Rollup node

The rollup node provides L1 information to the execution engine.
It has these important differences from the existing DTL:

- The DTL synchronizes from both L1 and L2.
  In bedrock the execution engine uses the standard Ethereum mechanism to synchronize with L2, and the rollup node mostly provides information from L1.
  The rollup node can provide unsubmitted L2 blocks to other rollup nodes as a way to reduce latency.
- The DTL is stateful, it keeps a copy of all the L2 transactions.
  The rollup node is stateless, it gets everything it needs from L1 and the execution engine.


### Execution engine

The execution engine runs a slightly modified version of geth.
In terms of EVM equivalence, it is [even closer to upstream geth](https://github.com/ethereum-optimism/reference-optimistic-geth/compare/master...optimism-prototype) than the current version.

This equivalence lets us synchronize a lot faster.
The execution engine *can* synchronize from the rollup node (such synchronization is necessary for censorship resistance), but it can also synchronize from other Optimism execution engines, which is a lot faster.
To trust the synchronization it has to match with the state root that is always provided by the rollup node.


## Behind the scenes

This section discusses the changes in Optimism internals. 


### The transaction trail



### ETH balances

In bedrock ETH is treated *exactly* as it is in Ethereum.
This means that ETH balances are part of the state trie, and there is no `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` contract anymore.



