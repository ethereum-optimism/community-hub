---
title: Transaction Fees in OVM 1.0
lang: en-US
---

::: tip OVM 2.0 Release Dates
OVM 2.0 will be released October 14th on the Kovan test network,
and October 28th into the production Optimistic Ethereum network.
:::


# {{ $frontmatter.title }}

::: danger OVM 1.0 Page
This page refers to the **current** state of the Optimistic Ethereum
network. Some of the information may be relevant to OVM 2.0, which will
be deployed in October, but some of it may change.
:::

## Fees in a nutshell

Fees on Optimistic Ethereum are, for the most part, significantly lower than on the Ethereum mainnet.
Depending on a combination of L1 congestion, L2 congestion, and the type of transaction you're sending, your L2 transaction fee might be anywhere between **2x and 100x cheaper than on L1**.
[Check out this blog post by Optimism](https://optimismpbc.medium.com/what-to-expect-when-eths-expecting-part-1-9bb5cbccb7c1) for more information about what sort of fees you can expect to pay on Optimistic Ethereum.

## What to know about gas on L2

Just like on L1, Optimistic Ethereum transaction fees are governed by two inputs:
1. **Gas limit:** the total amount of gas you're willing to pay for within the transaction.
1. **Gas price:** the price (in wei) per unit gas that you use in the transaction.

However, Optimistic Ethereum currently uses these parameters in a manner slightly different than the Ethereum mainnet.
Please keep the following in mind when using Optimistic Ethereum:
1. Transactions are processed on a first-in-first-out basis. **You should never modify the gas price provided to you by an application.** Increasing your gas price has no impact on the speed at which your transaction will be executed.
2. At the moment, we use the gas limit to encode information about both the cost to execute the transaction on L2 and the cost to publish the transaction on L1. **You should never modify the gas limit provided to you by an application.** Modifying your gas limit will likely cause your transaction to be rejected.

Curious to know more about how all of this works under the hood?
Check out our [dedicated page explaining gas costs on L2](/docs/developers/fees.md).
