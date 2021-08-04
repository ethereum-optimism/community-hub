---
title: Networks and Connection Details
lang: en-US
---

# {{ $frontmatter.title }}

## Optimistic Kovan

::: tip Purpose
This is our **test** network. You're welcome to deploy whatever contracts to wish to test
here.
:::

| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimistic Kovan`** |
| Description | **`Testnet (public)`** |
| Currency | **`Ether (ETH)`**
| Chain ID | **`69`** |
| Explorer | **`https://kovan-optimistic.etherscan.io`** |
| HTTP Endpoint | **`https://kovan.optimism.io`** |
| WebSocket Endpoint | **`wss://ws-kovan.optimism.io`** |
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments#kovan) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments#layer-2) |

## Optimistic Ethereum

::: tip Restricted Access
This is our production network, our equivalent of mainnet.
We currently have a whitelist system in place that limits who can deploy contracts 
to this network for reasons of performance, availability, and security. Eventually
we will open it up to anybody who wants to deploy, but we need to do more development
and testing before we get there. 99.9% secure is not good enough.

When you are ready to deploy to production please fill up 
[this form](https://docs.google.com/forms/d/e/1FAIpQLSdKyXpXY1C4caWD3baQBK1dPjEboOJ9dpj9flc-ursqq8KU0w/viewform) 
and we'll get back to you.
:::

| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimistic Ethereum`** |
| Description | **`Mainnet (restricted)`** |
| Currency | **`Ether (ETH)`**
| Chain ID | **`10`** |
| Explorer | **`https://optimistic.etherscan.io`** |
| HTTP Endpoint | **`https://mainnet.optimism.io`** |
| WebSocket Endpoint | **`wss://ws-mainnet.optimism.io`** |
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments#mainnet) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments#layer-2) |


## Third Party Applications

[Click here](/docs/developers/util.html) to see the addresses for other applications
running in Optimistic Ethereum.