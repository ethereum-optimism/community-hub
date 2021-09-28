---
title: Transaction Fees in OVM 2.0
lang: en-US
---

# {{ $frontmatter.title }}

::: warning OVM 2.0 Page
This page refers to the **new** state of Optimistic Ethereum after the
OVM 2.0 update. We expect to deploy OVM 2.0 mid October on the Kovan
test network and by the end of October on the production network.
:::

## Fees in a nutshell

Fees on Optimistic Ethereum are, for the most part, significantly 
lower than on the Ethereum mainnet. Every Optimistic Ethereum
transaction has two costs:

You pay the sum of two fees: Your L2 (execution) fee and your L1 (security) fee. At a high level, the L2 fee is the cost to execute your transaction in L2 and the L1 fee is the estimated cost to submit your transaction to L1 (in a rollup batch).

1. **L2 execution fee** is charged as `tx.gasPrice * l2GasUsed` 
   (up to `tx.gasLimit`). [You can check the current L2 gas price here](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m). At time of writing the L2 gas price is 0.001 gwei, however this can vary depending on network congestion.
   
2. **L1 security fee** is automatically charged as `l1GasPrice * l1GasUsed`. This 
   is the cost of storing the transaction's data on L1. 

   - `l1GasPrice` is the same as the normal gas price in L1 Ethereum
   - `l1GasUsed` is calculated as `1.5*(2750 gas + calldataGas)`. Thus, more 
      calldata your transaction includes, the more expensive your L1 fee will be. 
      For example, an ETH transfer has no calldata, so it will have the cheapest 
      L1 fee, whereas large contract deployments can have over 25kb of calldata 
      and will result in a high L1 fee.  We currently add a 50% overhead to the L1 
      fee to ensure the fee paid covers the actual L1 costs.

To get ETH on Optimistic Ethereum you can deposit ETH 
via [https://gateway.optimism.io/](https://gateway.optimism.io/) on both Kovan 
or Mainnet. Soon you will be able to also deposit ETH for slightly cheaper 
via [https://hop.exchange/](https://hop.exchange/)
