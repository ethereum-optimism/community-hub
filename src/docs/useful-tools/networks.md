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

Please set up a private RPC endpoint with [any of these poviders](providers.md):


We also support and maintain the following public RPC endpoints. 
However, we _highly_ encourage you to set up a private RPC endpoint with any of the above mentioned providers instead. 
**These public endpoints should not be used in production systems.**
- HTTP endpoint: [https://mainnet.optimism.io](https://mainnet.optimism.io)
- WebSocket endpoint (limited usage, see footnote below the table): [wss://ws-mainnet.optimism.io](wss://ws-mainnet.optimism.io)

[Pocket Network](https://docs.pokt.network/home/) also maintains a decentralized public RPC endpoint.

- HTTP endpoint: https://optimism-mainnet.gateway.pokt.network/v1/lb/62eb567f0fd618003965da18

[Blast](https://blastapi.io/public-api/optimism) also maintains public RPC endpoints.
An important limitation is that public endpoint does not support the `eth_getLogs` method
(you can use it with their free project-specific endpoints).

- HTTP endpoint: [https://optimism-mainnet.public.blastapi.io](https://optimism-mainnet.public.blastapi.io)
- WebSocker endpoint: [wss://optimism-mainnet.public.blastapi.io](wss://optimism-mainnet.public.blastapi.io)


## Optimism Goerli

::: tip Purpose
This is our new test network.
:::



| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimism Goerli`** |
| Description | **`Testnet (public)`** |
| Chain ID | **`420`** |
| Explorer | **[https://goerli-optimism.etherscan.io/](https://goerli-optimism.etherscan.io/)** |
| HTTP Endpoint | **`https://goerli.optimism.io`** |
| WebSocket Endpoint | **`wss://ws-goerli.optimism.io`** |
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/goerli#layer-1-contracts) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/goerli#layer-2-contracts) |
| chainid.link | [https://chainid.link/?network=optimism-goerli](https://chainid.link/?network=optimism-goerli)

### RPC endpoints

We have [several providers](./providers.md) that support Optimism Goerli. 

### Test ETH

[The Optimism Faucet](https://optimismfaucet.xyz/) now provides Optimism Goerli ETH.
Alternatively, if you already have Goerli ETH, you can [bridge it](https://app.optimism.io/bridge).


## Optimism Kovan (old testnet)


::: warning Deprecation notice
We are transitioning our test network to Goerli. 
Optimism Kovan end of life is October 5th, 2022, be sure to migrate everything you need before then.
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

We have [several providers](./providers.md) that support Optimism Goerli. 

We also have the following public endpoints. However if you expect to be sending a high volume of requests, please use one of the other available providers above.
- HTTP endpoint: [https://kovan.optimism.io](https://kovan.optimism.io)
- WebSocket endpoint (limited usage, see footnote below the table): [wss://ws-kovan.optimism.io](wss://ws-kovan.optimism.io)
