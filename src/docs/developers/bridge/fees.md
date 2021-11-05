---
title: The Fees for Sending Data Between L1 and L2 (in OVM 2.0)
lang: en-US
---

::: tip OVM 2.0 Release Dates
OVM 2.0 is already released on the Kovan test network.
We expect to deploy it to the production Optimistic Ethereum network on November 11th.
:::

## Fees for L1 to L2 transactions

For an L1 to L2 transaction the major fee is the L1 cost of submitting the transaction. You send a transaction to the [`L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/regenesis/0.5.0/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol)
contract, which then sends a call to the [`CanonicalTransactionChain`](https://github.com/ethereum-optimism/optimism/blob/regenesis/0.5.0/packages/contracts/contracts/L1/rollup/CanonicalTransactionChain.sol). This generally isn't *too* expensive, but it mainly depends on L1 gas costs.

### L2 gas costs

An L1 to L2 message can trigger contract execution on L2. The gas limit for that transaction is provided as part of the message. If the gas limit is below 1.92 million (at writing, it might change) that L2 gas is free. For the gas above that limit we burn one L1 gas for every 32 L2 gas to prevent denial of service attacks.


## Fees for L2 to L1 transactions

Each message from L2 to L1 requires two transactions:

1. An L2 transaction that *initiates* the transaction, which is priced the same way that Sequencer transactions are priced.
1. An L1 transaction that *finalizes* the transaction, after the verification challenge period (one week on mainnet) has passed. This transaction is somewhat expensive because it includes verifying a [Merkle trie](https://eth.wiki/fundamentals/patricia-tree) inclusion proof.

The total cost of an L2 to L1 transaction is therefore the combined cost of the L2 initialization transaction and the L1 finalization transaction. The L1 finalization transaction cost is typically the more expensive one.