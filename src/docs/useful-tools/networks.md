---
title: Networks and Public RPC Endpoints
lang: en-US
---

::: tip Developer Tip
We encourage you to use a private RPC endpoint to not run into rate limits, even for testnet environments. We recommend [Alchemy] (https://www.alchemy.com/layer2/optimism/?a=818c11a8da).
:::


## Optimism (mainnet)


| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimism`** |
| Description | **`Mainnet`** |
| Chain ID | **`10`** |
| Explorer | **[https://optimistic.etherscan.io](https://optimistic.etherscan.io)** |
| HTTP Endpoint<sup>1</sup> | **`https://mainnet.optimism.io`** _Not for production systems._   See the list of available RPC endpoints below. We recommend [Alchemy](https://docs.alchemy.com/reference/optimism-api-quickstart/?a=818c11a8da) |
| WebSocket Endpoint<sup>2</sup> | **`wss://ws-mainnet.optimism.io`** 
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/mainnet#layer-1-contracts) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/mainnet#layer-2-contracts) |
| chainid.link | [https://chainid.link/?network=optimism](https://chainid.link/?network=optimism)

(1) Some API calls, such as those in the [personal namespace](https://geth.ethereum.org/docs/rpc/ns-personal) make no sense in a shared environment.
Such RPCs are either not supported, or will return nonsensical values.

(2) The WebSocket endpoint is only supported for the two operations that cannot be provided on an HTTP endpoint: `eth_subscribe` and `eth_unsubscribe`. 
If you need a general purpose WebSocket endpoint, get one from a service provider.




### RPC endpoints

(A) Private RPC endpoints - 
**for production systems, we encourage you set up a private RPC endpoint, particularly Alchemy.** Sign up [here](https://www.alchemy.com/layer2/optimism/?a=818c11a8da).

(B) Public RPC endpoints -
we support and maintain the following public RPC endpoints: 

- HTTP endpoint: [https://mainnet.optimism.io](https://mainnet.optimism.io)
- WebSocket endpoint (limited usage, see footnote below the table): [wss://ws-mainnet.optimism.io](wss://ws-mainnet.optimism.io)

Note, we _highly_ encourage you to set up a private RPC endpoint like Alchemy instead. Using a public endpoint in production systems will often run into rate limits because of shared throughput.

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

### RPC endpoints

We have [several providers](./providers.md) that support Optimism Goerli. Out of them, we recommend using [Alchemy](https://www.alchemy.com/layer2/optimism/?a=818c11a8da).

(A) Private RPC endpoints - 
**for production systems even in testnet, we encourage you set up a private RPC endpoint, particularly Alchemy.** Sign up [here](https://www.alchemy.com/layer2/optimism/?a=818c11a8da).

(B) Public RPC endpoints -
we support and maintain the following public RPC endpoints: 

- HTTP endpoint: [https://goerli.optimism.io](https://goerli.optimism.io)
- WebSocket endpoint (limited usage, see footnote below the table): [wss://ws-goerli.optimism.io](wss://ws-goerli.optimism.io)

Note, just like we mentioned for mainnet, we _highly_ encourage you to set up a private RPC endpoint like Alchemy instead. Using a public endpoint in production systems will often run into rate limits because of shared throughput.


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
| HTTP Endpoint | **`https://kovan.optimism.io`** If you are going to be sending a lot of requests especially in a production system, please set up your own private RPC endpoint |
| WebSocket Endpoint<sup>1</sup> | **`wss://ws-kovan.optimism.io`** If you are going to be sending a lot of requests especially in a production system, please set up your own private RPC endpoint |
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/kovan#layer-1-contracts) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/kovan#layer-2-contracts) |
| chainid.link | [https://chainid.link/?network=optimism-kovan](https://chainid.link/?network=optimism-kovan)

(1) The WebSocket endpoint is only supported for the two operations that cannot be provided on an HTTP endpoint: `eth_subscribe` and `eth_unsubscribe`. 
If you need a general purpose WebSocket endpoint, get one from a service provider.
