---
title: Adding Optimism to your centralized exchange
lang: en-US
---

# {{ $frontmatter.title }}


## Connecting to Optimism

You connect to Optimism the same way you do to Ethereum, by connecting to a JSON RPC endpoint. However, the currently supported fork for Optimism is [Berlin](https://eth.wiki/roadmap/berlin), not [London](https://eth.wiki/roadmap/london), so EIP-1559 transactions are not supported yet.

### Endpoints

[Click here for the Optimism endpoints](../../infra/networks.md). You can choose between our public endpoints, which are rate limited, and [endpoints from infrastructure providers](../../infra/networks.md#rpc-endpoints).

### ETH balance

In Optimism the ETH balance of an account is not stored as part of the account's state, but as an ERC-20 balance at address [`0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`](https://optimistic.etherscan.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).


### Token addresses

The ERC-20 contract address for a token on Optimism may be different from the address for the same token on Ethereum. [The list of tokens and their addresses is here](https://static.optimism.io/optimism.tokenlist.json).

For example, looking at the **SNX** token, we get these addresses:

| ChainID | Network | Address |
| -: | - | - |
| 1  | Ethereum    | 0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f |
| 10 | Optimism    | 0x8700daec35af8ff88c16bdf0418774cb3d7599b4
| 42 | Kovan (test network) | 0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f
| 69 | Optimistic Kovan (test network) | 0x0064A673267696049938AA47595dD0B3C2e705A1

To get the total SNX balance of a user that uses Optimism you need to:

1. Connect to a standard Ethereum endpoint and send a `balanceOf` query to address `0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f`.
1. Connect to an Optimism endpoint and send a `balanceOf` query to address `0x8700daec35af8ff88c16bdf0418774cb3d7599b4`.


## Deposits and withdrawals

The ERC-20 contracts on Optimism function the same way they do on Ethereum, so you can use your existing code for withdrawals and deposits. Just connect to an Optimism endpoint.


### Transaction fees

Most of the cost of an Optimism transaction is not the gas consumed by the transaction itself (which is priced in most cases at 0.001 gwei), but the cost of writing the transaction in Ethereum. That cost is deducted automatically from the user's balance on Optimism. If you charge your users the cost of withdrawals, you have to account for it.

[You can read more about this subject here](/docs/developers/l2/new-fees.md). The relevant code sample is [here](/docs/developers/l2/new-fees.md#for-frontend-and-wallet-developers).



## Rebalancing assets across chains

As a centralized exchange, there will be times that withdrawals of a token on a specific chain exceed deposits and you need to transfer assets. 

There are [multiple bridges](https://www.optimism.io/apps/bridges) across chains, with differenet levels of security, token selection, etc. If you want to use [our gateway](https://gateway.optimism.io/), which is decentralized and secured with the same mechanisms as Optimism itself, [follow this tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/l1-l2-deposit-withdrawal).

Note that while L1 to L2 transactions are very quick, L2 to L1 transaction require (a seven day challenge period)[https://help.optimism.io/hc/en-us/articles/4411895558171-Why-do-I-need-to-wait-a-week-when-moving-assets-out-of-Optimism-].