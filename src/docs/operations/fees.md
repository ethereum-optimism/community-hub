---
title: Transaction Fees
lang: en-US
---

# {{ $frontmatter.title }}


When it comes to transaction fees, Optimistic Ethereum 
fees are a lot lower and a somewhat less flexible. 

## Transaction Parameters

An Ethereum transaction has two main parameters related to the gas it uses:

- `gasPrice`, the cost of each unit of gas
- `gasLimit`, the maximum amount of gas the transaction can spend (if
  that is not enough to cover the processing required by the transaction,
  the transaction fails).


### Gas Price

The Gas Price in Optimistic Ethereum is always 0.015 gwei 
(15000000 wei). This is the value returned by `eth_gasPrice`. In
contrast to L1, you cannot get faster service by paying more, or 
trade speed for cost by paying less.


### Gas Limit

The gas limit calcualtion is more complicated than in regular Ethereum,

- The cost of the gas for running the transaction on L2
- The cost of storing the transaction on L1. To ensure data availability,
  all transactions are written to L1 as CALLDATA. Typically, the majority
  of the transaction cost comes from here.

In most cases you do not need to be concerned with the cost beyond
knowing that you need to run `eth_estimateGas` and use that as your
transaction gas limit.


::: details How is the gas estimate calculated?
```text
estimate = (rollupTransactionSize * dataPrice) + (gasUsed * executionPrice)
```

Where:

* `rollupTransactionSize` is the size (in bytes) of the serialized transaction that will be published to Layer 1.
* `dataPrice` is a variable that reflects the current cost of publishing data to Layer 1.
* `gasUsed` is the standard result of `eth_estimateGas` for a transaction.
* `executionPrice` is a variable that reflects the current congestion 
   level on Layer 2, much like the `baseFeePerGas` on Layer 1.
:::


## Fees by Transaction Types

Different transaction types cost differently, depending primarily on
how much L1 processing is required.

### Pure L2 Transactions

A transaction that stays completely within Optimistic Ethereum requires
L1 only to store the transaction information (as CALLDATA, the cheapest
way to put information on the blockchain). So the total cost is
`tx.gasLimit*tx.gasPrice`.

::: tip
One difference from L1 Ethereum is that the cost is based on the
`gasLimit` field instead of the actual amount of gas used. This is because
the cost of L2 gas is usually negligible compared to the cost of storing
the transaction on L1, so there difference between using the estimate from
from `eth_estimateGas` and the actual gas used is negligible.
:::


### L1 ⇒ L2 Communication

For an L1 ⇒ L2 transaction you only pay the L1 cost. You send a 
transaction to the [`OVM_L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/messaging/OVM_L1CrossDomainMessenger.sol)
contract, which then sends a call to [`OVM_L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/messaging/OVM_L1CrossDomainMessenger.sol).

### L2 ⇒ L1 Communication

L2 ⇒ L1 communication is usually the most expensive. Each message 
requires two transactions:

1. An L2 transaction that *initiates* the transaction, which is priced
   the same way that pure L2 transactions are priced.
1. An L1 transaction that *finalizes* the transaction. This transaction
   is expensive because it includes [verifying](https://github.com/ethereum-optimism/optimism/blob/467d6cb6a4a35f2f8c3ea4cfa4babc619bafe7d2/packages/contracts/contracts/optimistic-ethereum/libraries/trie/Lib_MerkleTrie.sol#L73-L93) 
   a [Merkle trie](https://eth.wiki/fundamentals/patricia-tree) inclusion proof.
