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

1. **L2 execution fee**. This fee is `tx.gasPrice * l2gasUsed`, 
   where `l2gasUsed ≤ tx.gasLimit`. This is similar to the L1 cost, but
   **much** lower (unless Optimistic Ethereum congestion is extremely high). [You 
   can see the current cost here](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m). User interfaces such
   as wallets communicate this cost the way they communicate the
   transaction cost in L1.

   At writing the L2 gas cost in 0.001 gwei, and about 80,000 L2 gas cost the same 
   as one L1 gas.

2. **L1 security fee**. This is the cost of storing the transaction's 
   data on L1. This cost is deducted from your Optimistic Ethereum 
   Ether balance automatically. We are working with wallet and other
   user interface developers to show it to the user as well.

For more information about this subject, 
[see here](/docs/developers/l2/new-fees.html).