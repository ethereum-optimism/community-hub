---
title: Networks and Connection Details
lang: en-US
---

# {{ $frontmatter.title }}

## Development Node

::: tip Purpose
This is the information for a 
[local development node](../developers/l2/dev-node.md).
:::

| Parameter | Value |
| --------- | ----- |
| Currency | **`Ether (ETH)`**
| Chain ID | **`420`** |
| HTTP Endpoint | **`https://localhost:8545`** |
| HTTP Endpoint for L1 | **`https://localhost:9545`** |
| Mnemonic for rich account | **`test test test test test test test test test test test junk`** |

## Optimistic Kovan

::: tip Purpose
This is our **test** network.
:::

| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimistic Kovan`** |
| Description | **`Testnet (public)`** |
| Chain ID | **`69`** |
| Explorer | **`https://kovan-optimistic.etherscan.io`** |
| HTTP Endpoint | **`https://kovan.optimism.io`** |
| WebSocket Endpoint | **`wss://ws-kovan.optimism.io`** |
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/deployments#kovan) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/deployments#layer-2) |

## Optimistic Ethereum

::: tip Purpose
This is our production network, our equivalent of mainnet. It *used* to require whitelisting, but that is no longer the case. You can now deploy any contract you'd like. [If you would like additional support, you can apply for it here]((https://optimismpbc.typeform.com/get-in-touch).
:::

| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimistic Ethereum`** |
| Description | **`Mainnet (restricted)`** |
| Chain ID | **`10`** |
| Explorer | **`https://optimistic.etherscan.io`** |
| HTTP Endpoint | **`https://mainnet.optimism.io`** |
| WebSocket Endpoint | **`wss://ws-mainnet.optimism.io`** |
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/deployments#mainnet) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/deployments#layer-2) |


## Third Party Applications

[Click here](../developers/util.md) to see the addresses for other applications
running in Optimistic Ethereum.
