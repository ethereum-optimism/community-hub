---
title: Optimism APIs
lang: en-US
---

::: tip Developer Tip
We recommend using [Alchemy](https://www.alchemy.com/layer2/optimism/?a=818c11a8da) for its scalablity, reliability, and data accuracy. 
:::


## Optimism (mainnet)


| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimism`** |
| Description | **`Mainnet`** |
| Chain ID | **`10`** |
| Explorer | **[https://optimistic.etherscan.io](https://optimistic.etherscan.io)** |
| HTTP Endpoint<sup>1</sup> | **`https://mainnet.optimism.io`** _Not for production systems._  We recommend [Alchemy](https://docs.alchemy.com/reference/optimism-api-quickstart/?a=818c11a8da) |
| WebSocket Endpoint<sup>2</sup> | **`wss://ws-mainnet.optimism.io`** 
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/mainnet#layer-1-contracts) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/mainnet#layer-2-contracts) |
| chainid.link | [https://chainid.link/?network=optimism](https://chainid.link/?network=optimism)

(1) Some API calls, such as those in the [personal namespace](https://geth.ethereum.org/docs/rpc/ns-personal) make no sense in a shared environment.
Such RPCs are either not supported, or will return nonsensical values.

(2) The WebSocket endpoint is only supported for the two operations that cannot be provided on an HTTP endpoint: `eth_subscribe` and `eth_unsubscribe`. 
If you need a general purpose WebSocket endpoint, get one from a service provider._

### API Options:

1. Get free access to Optimism through [Alchemy](https://www.alchemy.com/layer2/optimism/?a=818c11a8da)

2. For small scale tests, you can use our public API:
- HTTP endpoint: [https://mainnet.optimism.io](https://mainnet.optimism.io) (note, this is for testing. For production, use Alchemy) 
- WebSocket endpoint (limited usage, see footnote below the table): [wss://ws-mainnet.optimism.io](wss://ws-mainnet.optimism.io)


You can run a large application for free using [Alchemy](https://www.alchemy.com/layer2/optimism/?a=818c11a8da). We’ve done extensive diligence and Alchemy is our recommendation due to reliability, scalability, and data correctness. They're the default API provider and developer platform for top projects like OpenSea and Facebook. 

## Optimism Goerli

::: tip Purpose
This is our new test network.
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

### API Options


1. Get free access to Optimism through [Alchemy](https://www.alchemy.com/layer2/optimism/?a=818c11a8da)

2. For small scale tests, you can use our public API:
- HTTP endpoint: [https://goerli.optimism.io](https://goerli.optimism.io) (note, this is for testing. For production, use Alchemy) 
- WebSocket endpoint (limited usage, see footnote below the table): [wss://ws-goerli.optimism.io](wss://ws-goerli.optimism.io)

You can run a large application for free using [Alchemy](https://www.alchemy.com/layer2/optimism/?a=818c11a8da). We’ve done extensive diligence and Alchemy is our recommendation due to reliability, scalability, and data correctness. They're the default API provider and developer platform for top projects like OpenSea and Facebook. 



### Test ETH

[The Optimism Faucet](https://optimismfaucet.xyz/) now provides Optimism Goerli ETH.
Alternatively, if you already have Goerli ETH, you can [bridge it](https://app.optimism.io/bridge).


## Optimism Kovan (old testnet)


::: warning Deprecation notice
We are transitioning our test network to Goerli. 
Optimism Kovan end of life is October 5th, 2022. Be sure to [migrate from Kovan to Goerli](https://www.alchemy.com/overviews/migrate-from-kovan-to-goerli-on-optimism/?a=818c11a8da) well before then. 
:::


| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimism Kovan`** |
| Description | **`Testnet (public)`** |
| Chain ID | **`69`** |
| Explorer | **[https://kovan-optimistic.etherscan.io](https://kovan-optimistic.etherscan.io)** |
| HTTP Endpoint | **`https://kovan.optimism.io`** If you are going to be sending a lot of requests, please set up a free account with Alchemy |
| WebSocket Endpoint<sup>1</sup> | **`wss://ws-kovan.optimism.io`** If you are going to be sending a lot of requests, please set up a free account with Alchemy |
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/kovan#layer-1-contracts) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/kovan#layer-2-contracts) |
| chainid.link | [https://chainid.link/?network=optimism-kovan](https://chainid.link/?network=optimism-kovan)

(1) The WebSocket endpoint is only supported for the two operations that cannot be provided on an HTTP endpoint: `eth_subscribe` and `eth_unsubscribe`. 
If you need a general purpose WebSocket endpoint, get one from a service provider.
