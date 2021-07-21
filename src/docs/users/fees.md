---
title: Transaction Fees
lang: en-US
---

# {{ $frontmatter.title }}


Optimistic Ethereum transactions have the same fields as L1 Ethereum
transactions: gasPrice and gasLimit. However, in contrast to 
L1, you should not modify these parameters in the wallet.

## Gas Price

The Gas Price in Optimistic Ethereum is always 0.015 gwei 
(15000000 wei). In contrast to L1, you cannot get faster service by 
paying more, or trade speed for cost by paying less.


## Gas Limit

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

