---
title: Using the Standard Bridge
lang: en-US
---

# {{ $frontmatter.title }}


Certain interactions, like transferring ETH and ERC20 tokens between the two networks, are common enough that we've built the "Standard Bridge" to make moving these assets betwen L1 and L2 as easy as possible.
The Standard Bridge is composed of two main contracts the [`L1StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol) (for Layer 1) and the [`L2StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol) (for Layer 2).
Here we'll go over the basics of using this bridge to move ERC20 assets between Layer 1 and Layer 2.

## Deposits and withdrawals

::: warning NOTICE
Some contract wallets currently may not behave correctly on L2.
If you use a contract wallet, you should deposit your funds into an EOA (externally owned account) on L2.
For the moment, contracts are **only** allowed to use the explicit `depositETHTo`, `depositERC20To`, and `withdrawTo` methods.
:::

### Depositing ETH

ETH deposits into L2 can be triggered via either `depositETH` or `depositETHTo`.
You can alternatively also simply send ETH directly to the bridge contract.
OE has a built-in ERC20 compatible Wrapped Ether (WETH) token which is issued once your deposit is finalized on L2.
Any ETH you deposited on L1 will remain locked into the deposit contract until you withdraw it.

### Depositing ERC20 Tokens

ERC20 deposits into L2 can triggered via `depositERC20` and `depositERC20To` functions.
Note that the token amount deposited will need to have been approved for the standard bridge to transfer.

### Withdrawing Assets

Initiating withdrawals are the same for ETH and ERC20s as ETH is ERC20-compatible on L2.
Use the `withdraw` and `withdrawTo` methods on the `L2StandardBridge` to initiate a withdrawal.

If you'd like to see these contracts in action, you should check out the [L1 ⇔ L2 deposit-and-withdraw example](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/l1-l2-deposit-withdrawal).

**Note:** When withdrawing ETH, use the L2 token address `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`.

## Adding an ERC20 token to the Standard Bridge

::: tip
See detailed tutorial on [bridging your standard ERC20 token to Optimism](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/standard-bridge-standard-token) using the Standard Bridge.
:::

Anyone can add a new ERC20 token to the Standard Bridge.
You must have a token contract on both L1 and L2.
Your L2 token contract must also implement the [`IL2StandardERC20`]( https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/standards/IL2StandardERC20.sol) interface.
Optimism provides a standard implementation of that interface as the [`L2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/standards/L2StandardERC20.sol) contract.


If the `L2StandardERC20` implementation does not satisfy your requirements, you can deploy an alternative implementation as long as it's compliant with the `IL2StandardERC20` interface.
You can freely deploy your proposed implementation to the Optimistic Kovan testnet.
Once you're ready with a tested kovan deployment, you can request a review via [this](https://p02pp4m8did.typeform.com/to/zRajq1Fl) form and we'll consider whitelisting your deployer address on the Optimistic Ethereum mainnet.
This condition only remains as long as the Optimistic Ethereum mainnet has a whitelist.

## The Optimism token list

The Standard bridge allows a one-to-many mapping between L1 and L2 tokens, meaning that there can be many OE implementations of an L1 token.
However there is always a one-to-one mapping between L1 and L2 tokens in the [Optimism token list](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/optimism.tokenlist.json).
The token list is used as the source of truth for the [Optimism Gateway](https://gateway.optimism.io) which is the main portal for moving assets between Layer 1 and Layer 2.
