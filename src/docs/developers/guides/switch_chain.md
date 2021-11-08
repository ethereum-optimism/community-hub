---
title: Switching between Chains
lang: en-US
---

# {{ $frontmatter.title }}

There are two places where a user might switch into Optimistic Ethereum:

1. On the wallet. To make this task easy, wallets need to have [connection details](../../infra/networks.md) for Optimistic Ethereum. Note that you can choose between using our own endpoints, which are rate limited, and using commercial endpoints.

1. On the front end, using [`wallet_addEthereumChain`](https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods) and [`wallet_switchEthereumChain`](https://docs.metamask.io/guide/rpc-api.html#wallet-switchethereumchain). You can see an example of this code on [chainid.link](https://chainid.link/?network=optimism).

   ::: warning
   If you are a wallet developer you **must** ask for user confirmation if you receive these two RPC methods. They can be abused by an unscrupulous front end.
   :::
