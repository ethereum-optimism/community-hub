---
title: The Standard Bridge
lang: en-US
---

# {{ $frontmatter.title }}

Certain interactions, like transferring ETH and ERC20 tokens between the two networks, are common enough that we've built the Standard Bridge. Its two main contracts are: [`OVM_L1StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/tokens/OVM_L1StandardBridge.sol) (for Layer 1) and  [`OVM_L2StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/tokens/OVM_L2StandardBridge.sol) (for Layer 2) where it is also a [predeploy](../protocol/protocol.md#predeployed-contracts).

### Deposits and Withdrawals
Deposit ETH to L2 can be either be done via `depositETH` and `depositETHTo` functions or by sending ETH value directly to the bridge. OE has a built-in ERC20 compatible Wrapped Ether (WETH) token which is issued upon deposit finalization while ETH remains locked on the L1 bridge contract and is tranferred back to you on withdrawal. To transfer ETH(WETH) on OE, you need to essentially transfer WETH ERC20 balance, however this is equivallent to sending value so all existing references to ETH balance and transaction value, work the same as on L1.

Depositing ERC20 to L2 can be done via `depositERC20` and `depositERC20To` functions. Note that the token amount deposited will need to have been approved for the standard bridge to transfer.

Initiating withdrawals are the same for ETH and ERC20s as ETH *is* ERC20 on L2. The `withdraw` and `withdrawTo` methods on the `OVM_L2StandardBridge` are used to initiate that.

::: tip
Deposits and withdrawals are restricted to EOA accounts only. Contracts can still interact with the bridge but using the explicit `depositETHTo`, `depositERC20To`, `withdrawTo` functions.
:::

<!-- TODO: Update this once we have the tutorial ready
If you'd like to see these contracts in action, you should check out the [L1 ⇔ L2 deposit-and-withdraw example](https://github.com/ethereum-optimism/optimism/tree/develop/examples/l1-l2-deposit-withdrawal).
 -->

### Adding your Token to the Standard Bridge

::: tip
See detailed tutorial on [bridging your ERC20 token to Optimism](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/standard-bridge-token) using the Standard Bridge.
:::

For an L1/L2 token pair to work on the Standard Bridge the L2 token contract need to implement [`IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/optimistic-ethereum/libraries/standards/IL2StandardERC20.sol). The standard implementation of that is available in [`L2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/optimistic-ethereum/libraries/standards/L2StandardERC20.sol) contract.

When the `L2StandardERC20` implementation does not satisfy your requirements, we can consider allowing a custom implemetation if compliant with `IL2StandardERC20`. You can freely deploy your proposed implementation to `optimism-kovan` network. Once you're ready with a tested kovan deployment, you can request a review via [this](https://docs.google.com/forms/d/e/1FAIpQLSdKyXpXY1C4caWD3baQBK1dPjEboOJ9dpj9flc-ursqq8KU0w/viewform) form and we'll consider whitelisting your deployer address on `optimism-mainnet`.

### Optimism Token List
The Standard bridge allows a one-to-may mapping between L1 and L2 tokens, meaning that there can be many OE implementations of an L1 token. However there is always a one-to-one mapping between L1 and L2 tokens in the [Optimism Token list](todo). The token list is used as the source of truth for the [Optimism Gateway](https://gateway.optimism.io) which is the main portal for moving assets between Layer 1 and Layer 2.