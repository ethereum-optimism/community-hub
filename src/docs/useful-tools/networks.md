---
title: Networks and Public RPC Endpoints
lang: en-US
---

::: warning
Some API calls, such as the those in the [personal namespace](https://geth.ethereum.org/docs/rpc/ns-personal) make no sense in a shared environment.
Such RPCs are either totally unsupported, or will return nonsensical values.
:::

## Optimism (mainnet)


| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimism`** |
| Description | **`Mainnet`** |
| Chain ID | **`10`** |
| Explorer | **[https://optimistic.etherscan.io](https://optimistic.etherscan.io)** |
| HTTP Endpoint | **`https://mainnet.optimism.io`** _Not for production systems._   See the list of available RPC endpoints below |
| WebSocket Endpoint<sup>1</sup> | **`wss://ws-mainnet.optimism.io`** 
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/mainnet#layer-1-contracts) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/mainnet#layer-2-contracts) |
| chainid.link | [https://chainid.link/?network=optimism](https://chainid.link/?network=optimism)

(1) The WebSocket endpoint is only supported for the two operations that cannot be provided on an HTTP endpoint: `eth_subscribe` and `eth_unsubscribe`. 
If you need a general purpose WebSocket endpoint, get one from a service provider.


### RPC endpoints

Please set up a private RPC endpoint with any of the following providers:
- [Alchemy](https://www.alchemy.com/layer2/optimism)
- [Ankr](https://www.ankr.com/protocol/public/optimism/)
- [Blast](https://blastapi.io/public-api/optimism)
- [Infura](https://blog.infura.io/what-is-optimistic-ethereum/)
- [QuickNode](https://www.quicknode.com/chains/optimism)


We also support and maintain the following public RPC endpoints. 
However, we _highly_ encourage you to set up a private RPC endpoint with any of the above mentioned providers instead. 
**These public endpoints should not be used in production systems.**
- HTTP endpoint: [https://mainnet.optimism.io](https://mainnet.optimism.io)
- WebSocket endpoint (limited usage, see footnote below the table): [wss://ws-mainnet.optimism.io](wss://ws-mainnet.optimism.io)


[Blast](https://blastapi.io/public-api/optimism) also maintains public RPC endpoints.
An important limitation is that public endpoint does not support the `eth_getLogs` method
(you can use it with their free project-specific endpoints).

- HTTP endpoint: [https://optimism-mainnet.public.blastapi.io](https://optimism-mainnet.public.blastapi.io)
- WebSocker endpoint: [wss://optimism-mainnet.public.blastapi.io](wss://optimism-mainnet.public.blastapi.io)


## Optimism Goerli

::: tip Purpose
This is our new test network.
It is still very much work in progress.
:::



| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimism Goerli`** |
| Description | **`Testnet (public)`** |
| Chain ID | **`420`** |
| Explorer | **[https://blockscout.com/optimism/goerli](https://blockscout.com/optimism/goerli)** |
| HTTP Endpoint | **`https://goerli.optimism.io`** |
| WebSocket Endpoint | **`wss://ws-goerli.optimism.io`** |
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/goerli#layer-1-contracts) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/goerli#layer-2-contracts) |
| Chainlist link | [https://chainlist.org/chain/420](https://chainlist.org/chain/420)

### RPC endpoints

Our providers are working on adding support for Optimism Goerli.
For now, use the Optimism provided endpoints in the table.

### Test ETH

You can obtain Goerli test ETH either [here](https://goerlifaucet.com/) or [here](https://faucet.paradigm.xyz/).

Transfer Goerli ETH to [0x636Af16bf2f682dD3109e60102b8E1A089FedAa8](https://goerli.etherscan.io/address/0x636Af16bf2f682dD3109e60102b8E1A089FedAa8), and you will get it on Optimism Goerli.


## Optimism Kovan (old testnet)


::: warning Deprecation notice
We are transitioning our test network to Goerli. 
We expect Optimistic Kovan to exist until August 15th, 2022.
:::


| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimism Kovan`** |
| Description | **`Testnet (public)`** |
| Chain ID | **`69`** |
| Explorer | **[https://kovan-optimistic.etherscan.io](https://kovan-optimistic.etherscan.io)** |
| HTTP Endpoint | **`https://kovan.optimism.io`** If you are going to be sending a lot of requests please set up your own private RPC endpoint |
| WebSocket Endpoint<sup>1</sup> | **`wss://ws-kovan.optimism.io`** If you are going to be sending a lot of requests please set up your own private RPC endpoint |
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/kovan#layer-1-contracts) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/kovan#layer-2-contracts) |
| chainid.link | [https://chainid.link/?network=optimism-kovan](https://chainid.link/?network=optimism-kovan)

(1) The WebSocket endpoint is only supported for the two operations that cannot be provided on an HTTP endpoint: `eth_subscribe` and `eth_unsubscribe`. 
If you need a general purpose WebSocket endpoint, get one from a service provider.

### RPC endpoints

Please set up a private RPC endpoint with any of the following providers:
- [Alchemy](https://www.alchemy.com/layer2/optimism)
- [Infura](https://blog.infura.io/what-is-optimistic-ethereum/)
- [QuickNode](https://www.quicknode.com/chains/optimism)

We also have the following public endpoints. However if you expect to be sending a high volume of requests, please use one of the other available providers above.
- HTTP endpoint: [https://kovan.optimism.io](https://kovan.optimism.io)
- WebSocket endpoint (limited usage, see footnote below the table): [wss://ws-kovan.optimism.io](wss://ws-kovan.optimism.io)
