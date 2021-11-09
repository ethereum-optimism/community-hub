---
title: Common Wallet Development Tasks
lang: en-US
---

::: tip OVM 2.0 Release Dates
OVM 2.0 is already released on the Kovan test network.
We expect to deploy it to the production Optimistic Ethereum network on November 11th.
:::


<VuePressVersioning/>

# {{ $frontmatter.title }}

## The RPC Endpoints

[You can see the PRC endpoints here](../../infra/networks.md). You can choose between our own
endpoints, which are rate limited, and commercially available ones. 

## Switch into and out of Optimistic Ethereum

There are two approaches for multi-chain wallets:

1. Let the user select which chain to use (as is done in Metamask, for example)
   If you choose this approach, users can change chains in two ways:

   - Manually, from your own user interface
   - Through a dapp that uses `wallet_addEthereumChain` 
     (see, for example, 
     [https://chainid.link/?network=optimism](https://chainid.link/?network=optimism)). 
     In this case it is important to ask the user for confirmation, because an unscrupulous
     dapp might be doing it silently.

1. Stay connected to all chains all the time, and just ask the user which chain to use 
   when the user issues a transaction (as is done in Rainbow, for example)


## Retrieve Token Balances

Optimistic Ethereum token balances are available through the ERC-20 interface, same as on
L1. However, note that a token's L2 address may differ from that token's L1 address. You
can see the known tokens, and their addresses, in [this list](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/optimism.tokenlist.json).

For example, to show a user's total DAI (real DAI, not the Kovan testing equivalent), you
need to query:

| Chain | ERC-20 Contract Address |
| ----- | ------- |
| L1    | 0x6B175474E89094C44Da98b954EedeAC495271d0F |
| Optimistic Ethereum | 0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1 |

And possibly additional L2 chains such as Arbitrum or Polygon.


## Transaction Fees

Transaction fees in Optimistic Ethereum are [a bit complicated](../../users/fees-2.0.md). 
You can use [this code sample](../l2/new-fees.md#for-frontend-and-wallet-developers) to
show users how much a transaction will cost in advance.

::: tip Which packages to use?
The currently released API packages are still OVM 1.0. To use the OVM 2.0 packages, use
the version tag `canary`.
:::