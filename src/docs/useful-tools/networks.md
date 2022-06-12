---
title: Networks and Public RPC Endpoints
lang: en-US
---

## Optimism (mainnet)


| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimism`** |
| Description | **`Mainnet`** |
| Chain ID | **`10`** |
| Explorer | **`https://optimistic.etherscan.io`** |
| HTTP Endpoint | **`https://mainnet.optimism.io`** _Not for production systems._   See the list of available RPC endpoints below |
| WebSocket Endpoint | **`wss://ws-mainnet.optimism.io`** 
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/mainnet#layer-1-contracts) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/mainnet#layer-2-contracts) |
| chainid.link | [https://chainid.link/?network=optimism](https://chainid.link/?network=optimism)


### RPC endpoints

Please set up a private RPC endpoint with any of the following providers:
- [Alchemy](https://www.alchemy.com/layer2/optimism)
- [Blast](https://blastapi.io/public-api/optimism)
- [Infura](https://blog.infura.io/what-is-optimistic-ethereum/)
- [QuickNode](https://www.quicknode.com/chains/optimism)
- [Ankr](https://www.ankr.com/protocol/public/optimism/)

We also support and maintain the following public RPC endpoints. 
However, we _highly_ encourage you to set up a private RPC endpoint with any of the above mentioned providers instead. 
**These public endpoints should not be used in production systems.**
- HTTP endpoint: [https://mainnet.optimism.io](https://mainnet.optimism.io)
- WebSocket endpoint: [wss://ws-mainnet.optimism.io](wss://ws-mainnet.optimism.io)


[Blast](https://blastapi.io/public-api/optimism) also maintains public RPC endpoints.
And important limitation is that public endpoint does not support the `eth_getLogs` method
(you can use it with their free project-specific endpoints).

- HTTP endpoint: [https://optimism-mainnet.public.blastapi.io](https://optimism-mainnet.public.blastapi.io)
- WebSocker endpoint: [wss://optimism-mainnet.public.blastapi.io](wss://optimism-mainnet.public.blastapi.io)

## Optimism Kovan (testnet)

::: tip Purpose
This is our **test** network. To get ETH on Kovan as well as Optimism Kovan, checkout our [faucets page](./faucets.md).
:::

| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimism Kovan`** |
| Description | **`Testnet (public)`** |
| Chain ID | **`69`** |
| Explorer | **`https://kovan-optimistic.etherscan.io`** |
| HTTP Endpoint | **`https://kovan.optimism.io`** If you are going to be sending a lot of requests please set up your own private RPC endpoint |
| WebSocket Endpoint | **`wss://ws-kovan.optimism.io`** If you are going to be sending a lot of requests please set up your own private RPC endpoint |
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/kovan#layer-1-contracts) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/kovan#layer-2-contracts) |
| chainid.link | [https://chainid.link/?network=optimism-kovan](https://chainid.link/?network=optimism-kovan)

### RPC endpoints

Please set up a private RPC endpoint with any of the following providers:
- [Alchemy](https://www.alchemy.com/layer2/optimism)
- [Infura](https://blog.infura.io/what-is-optimistic-ethereum/)
- [QuickNode](https://www.quicknode.com/chains/optimism)

We also have the following public endpoints. However if you expect to be sending a high volume of requests, please use one of the other available providers above.
- HTTP endpoint: [https://kovan.optimism.io](https://kovan.optimism.io)
- WebSocket endpoint: [wss://ws-kovan.optimism.io](wss://ws-kovan.optimism.io)
