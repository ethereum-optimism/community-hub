---
title: Why Run in Standalone Optimistic Ethereum?
lang: en-US
---

# {{ $frontmatter.title }}

[Composability](https://blog.decentlabs.io/contract-composability-the-building-blocks-of-ethereum-smart-contract-development/) 
is the ability to interact with other smart contracts to produce a more comprehensive 
application. For example, any ERC-20 asset can have a market to exchange for ETH simply
by listing itself on [Uniswap](https://uniswap.org/). While some applications require 
the ability to interact with other contracts that don't have a version running on 
Optimistic Ethereum yet, there are two types of applications that can run purely 
on Optimistic Ethereum without any L1 component:

1. Standalone applications, which require the decentralized nature of Ethereum but no
   the access to other contracts. For example, a censorship resistant Twitter clone. A lot of non-financial 
   applications fall under this category.
1. Applications that require composability, but for which all the relevant components are already available in Optimistic
   Ethereum. For example, if all you want is for your governance token to also be tradable for DAI through Uniswap,
   you don't need to go through the expense of deploying an L1 contract.

In this section of the documentation you learn how to take an application that could run on L1, and 
convert it to run on L2.