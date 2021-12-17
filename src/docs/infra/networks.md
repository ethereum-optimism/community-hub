---
title: Networks and Public RPC Endpoints
lang: en-US
---

# {{ $frontmatter.title }}

## Optimistic Ethereum (OE mainnet)

::: tip Point and deploy
We recently removed our whitelist! This means that anyone can deploy onto Optimistic Ethereum. However, if you want support getting live on OE, or if you want some PR hype you can apply [here](https://optimismpbc.typeform.com/get-in-touch.)
:::

| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimistic Ethereum`** |
| Description | **`Mainnet`** |
| Chain ID | **`10`** |
| Explorer | **`https://optimistic.etherscan.io`** |
| HTTP Endpoint | **`https://mainnet.optimism.io`** _Not for production systems._ See the list of available RPC endpoints below |
| WebSocket Endpoint | **`wss://ws-mainnet.optimism.io`** |
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/deployments#mainnet) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/deployments#layer-2) |

### RPC endpoints

Please set up a private RPC endpoint with any of the following providers:
- [Alchemy](https://www.alchemy.com/layer2/optimism)
- [Infura](https://blog.infura.io/what-is-optimistic-ethereum/)
- [QuickNode](https://www.quicknode.com/chains/optimism)

We also support and maintain the following public RPC endpoints. However, we _highly_ encourage you to set up a private RPC endpoint with any of the above mentioned providers instead. **These public endpoints should not be used in production systems.**
- HTTP endpoint: [https://mainnet.optimism.io](https://mainnet.optimism.io)
- WebSocket endpoint: [wss://ws-mainnet.optimism.io](wss://ws-mainnet.optimism.io)

## Optimistic Kovan (testnet)

::: tip Purpose
This is our **test** network.
:::

| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimistic Kovan`** |
| Description | **`Testnet (public)`** |
| Chain ID | **`69`** |
| Explorer | **`https://kovan-optimistic.etherscan.io`** |
| HTTP Endpoint | **`https://kovan.optimism.io`** If you are going to be sending a lot of requests please set up your own private RPC endpoint |
| WebSocket Endpoint | **`wss://ws-kovan.optimism.io`** |
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/deployments#kovan) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/deployments#layer-2) |

### RPC endpoints

Please set up a private RPC endpoint with any of the following providers:
- [Alchemy](https://www.alchemy.com/layer2/optimism)
- [Infura](https://blog.infura.io/what-is-optimistic-ethereum/)
- [QuickNode](https://www.quicknode.com/chains/optimism)

## Development Node (local)

::: tip Purpose
This is the information for a [local development node](../developers/l2/dev-node.md).
:::

| Parameter | Value |
| --------- | ----- |
| Currency | **`Ether (ETH)`**
| Chain ID | **`420`** |
| HTTP Endpoint | **`https://localhost:8545`** |
| HTTP Endpoint for L1 | **`https://localhost:9545`** |
| Mnemonic for rich account | **`test test test test test test test test test test test junk`** |