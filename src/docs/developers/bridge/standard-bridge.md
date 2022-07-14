---
title: Using the Standard Token Bridge
lang: en-US
---

Certain interactions, like transferring ETH and ERC20 tokens between the two networks, are common enough that we've built the "Standard Bridge" to make moving these assets betwen L1 and L2 as easy as possible.

The standard bridge functionality provides a method for an ERC20 token to be deposited and locked on L1 in exchange of the same amount of an equivalent token on L2. This process is known as "bridging a token", e.g. depositing 100 USDC on L1 in exchange for 100 USDC on L2 and also the reverse - withdrawing 100 USDC on L2 in exchange for the same amount on L1. In addition to bridging tokens the standard bridge is also used for ETH.

The Standard Bridge is composed of two main contracts the [`L1StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol) (for Layer 1) and the [`L2StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol) (for Layer 2).

Here we'll go over the basics of using this bridge to move ERC20 assets between Layer 1 and Layer 2.

::: tip 
[See here for a step by step tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/cross-dom-bridge)
:::

## Deposits

::: warning NOTICE
We're working hard to get more smart contract wallet software deployed and tested on Optimism.
However, as a safety measure, **we currently block smart contract wallets from calling the `depositETH` and `depositERC20` functions**.
If you want to deposit using a smart contract wallet and you know what you're doing, you can use the `depositETHTo` and `depositERC20To` functions instead.
:::

### Depositing ERC20s

ERC20 deposits into L2 can triggered via the `depositERC20` and `depositERC20To` functions on the [`L1StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).
You **must** approve the Standard Token Bridge to use the amount of tokens that you want to deposit or the deposit will fail.

### Depositing ETH

ETH deposits into L2 can be triggered via the `depositETH` and `depositETHTo` functions on the [`L1StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).
ETH deposits can alternatively be triggered by sending ETH directly to the `L1StandardBridge`.
Once your deposit is detected and finalized on Optimism, your account will be funded with the corresponding amount of ETH on L2.

## Withdrawals

### Withdrawing ERC20s

ERC20 withdrawals can be triggered via the `withdraw` or `withdrawTo` functions on the [`L2StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).
If you'd like to see this contracts in action, you should check out the [L1 ⇔ L2 deposit-and-withdraw example](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/cross-dom-bridge).

### Withdrawing ETH

Unlike on L1, we do not have a separate function on L2 for withdrawing ETH.
Instead, you can use the `withdraw` or `withdrawTo` functions on the [`L2StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol) and use the address `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` as the L2 token address.

## Adding an ERC20 token to the Standard Bridge

::: tip
To add your token to the standard bridge, see the guide [Adding an ERC20 token to the Standard Bridge](../../guides/token-dev.md).
:::

## The Optimism token list

The Standard bridge allows a one-to-many mapping between L1 and L2 tokens, meaning that there can be many Optimism implementations of an L1 token.
However there is always a one-to-one mapping between L1 and L2 tokens in the [Optimism token list](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/optimism.tokenlist.json).
The token list is used as the source of truth for the [Optimism Gateway](https://gateway.optimism.io) which is the main portal for moving assets between Layer 1 and Layer 2.

If you want to have your token added to the token list, you must make a pull request against the [Optimism token list repository](https://github.com/ethereum-optimism/ethereum-optimism.github.io#adding-a-token-to-the-list).
You'll need the addresses for both the L1 and L2 tokens, as well as a logo for the token.
If you're looking for an example to follow, take a look at [this simple pull request that adds a token to the token list](https://github.com/ethereum-optimism/ethereum-optimism.github.io/pull/43/files).
