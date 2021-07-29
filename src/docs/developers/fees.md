---
title: Gas Costs on L2
lang: en-US
---

# {{ $frontmatter.title }}

Optimistic Ethereum is a lot cheaper than regular Ethereum,
but there are still some transaction fees. On this page you'll
learn what they are, how to estimate them, and how to provide them.

::: warning NOTICE
This page documents the current status of the Optimistic Ethereum
protocol, and the details here are subject to change based on
feedback.
:::

## L1 Ethereum

In [L1
Ethereum](https://ethereum.org/en/developers/docs/gas/#why-do-gas-fees-exist) the cost of a transaction is determined by two
factors:

- `gasPrice`, the cost of each unit of gas. Users can modify this value
  to trade off between speed and cost.
- `gasLimit`, the maximum amount of gas the transaction can
  spend. This value depends on the transaction, the contract it
  calls, etc.

The total transaction cost is `gasPrice*gasLimit`.

## Optimistic Ethereum

The gas calculations in Optimistic Ethereum are more complicated,
because of the additional cost of storing the transaction on L1
(all Optimistic Ethereum transactions are stored as CALLDATA on
L1 to ensure data availability).

### Pure L2 Transactions

For a pure L2 transaction, one that does not have to bridge into
L1, there are two costs, calculated using four parameters:

- **Data cost**, the cost of storing the transaction's data on
  L1. The majority of the cost of a transaction comes from this
  factor.

- **Execution cost**, the cost of the actual execution on the Optimistic
  Ethereum servers. This cost is typically very low, but it could increase
  when Optimistic Ethereum is congested.

```text
rollupTransactionSize*dataPrice + gasUsed*executionPrice
```

Where:

* `rollupTransactionSize` is the size (in bytes) of the serialized
  transaction that will be published to Layer 1.
* `dataPrice` is a variable that reflects the current cost of publishing
  data to Layer 1.
* `gasUsed` is the standard result of `eth_estimateGas` for a transaction.
* `executionPrice` is a variable that reflects the current congestion
  level on Layer 2, much like the `baseFeePerGas` on Layer 1.

So we need to fit four parameters into a user interface that is only
designed to handle two: `gasPrice` and `gasLimit`.

The way we do it is to set `gasPrice` to a fixed amount, 0.015 gwei.
Then, when you call `eth_estimateGas` to get the value for `gasLimit`
the system calculates:

```text

             rollupTransactionSize*dataPrice + gasUsed*executionPrice
gasLimit  =  --------------------------------------------------------
                                     gasPrice


```

In most cases you do not need to be concerned with the cost beyond
knowing that you need to run `eth_estimateGas`, use that as your
transaction gas limit, and use a gas price of 0.015 gwei.

::: tip
In Optimistic Ethereum the cost of a transaction is always
`tx.gasLimit*tx.gasPrice`, in contrast to L1 where it can be lower.
:::


### L1 to L2 Transactions

For an L1 to L2 transaction you only pay the L1 cost. You send a
transaction to the [`OVM_L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/messaging/OVM_L1CrossDomainMessenger.sol)
contract, which then sends a call to [`OVM_L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/messaging/OVM_L1CrossDomainMessenger.sol).

### L2 to L1 Transactions

Each message from L2 to L1 requires two transactions:

1. An L2 transaction that *initiates* the transaction, which is priced
   the same way that pure L2 transactions are priced.
1. An L1 transaction that *finalizes* the transaction. This transaction
   is expensive because it includes [verifying](https://github.com/ethereum-optimism/optimism/blob/467d6cb6a4a35f2f8c3ea4cfa4babc619bafe7d2/packages/contracts/contracts/optimistic-ethereum/libraries/trie/Lib_MerkleTrie.sol#L73-L93)
   a [Merkle trie](https://eth.wiki/fundamentals/patricia-tree)
   inclusion proof. On the production network this transaction has to
   happen at least a week after the initializing transaction to allow
   for the challenge-response process.
