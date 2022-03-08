---
title: Adding a custom bridge to Optimism
lang: en-US
---

# Adding a custom bridge to Optimism

## Using the Standard bridge
::: tip
Consider using the [Standard bridge](../developers/bridge/standard-bridge/) first before deciding to develop a custom bridge solution.

In the standard bridge when ERC20 is deposited on L1 and transferred to the bridge contract, it remains "locked" there while the equivallent amount is minted in the L2 token. For withdrawals the opposite happens, the L2 token amount is burned then the same amount of L1 tokens is transferred to the recipient.
This implementation satisfies a wide range of requirements.
:::

## Building a custom bridge
When the Optimism Standard bridge does not satisfy your requirements for bridging assets or data you can deploy your custom bridge solution utilizing the same cross-domain infrastructure as the Standard bridge. For details on how cross-domain messaging works, see [Bridging basics](../developers/bridge/basics/) article and also the [tutorial on depositing and withdrawing between L1 and L2](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/l1-l2-deposit-withdrawal).

Some of the reasons why the standard bridge might not work for you is for example when you cannot limit the L2 token `mint` and `burn` functions to the bridge alone (something we require for security). Also certain custom bridges implement their own logic for managing the token supply which requires custom logic. Another case might be when you are bridging non-ERC20 tokens for example NFTs. Yet another case is when you are pooling deposits for cheaper transfers to L2.

Note that when you are building a custom bridge for ERC20 tokens and planning to add these to the [Optimism token list](../developers/bridge/standard-bridge/#the-optimism-token-list), we have specific requirements for the bridge contracts. These have to implement the `IL1ERC20Bridge` interface in the L1 bridge contract and `IL2ERC20Bridge` interface in the L2 bridge contract. This ensures the [Optimism Gateway](https://gateway.optimism.io) can support token deposits and withdrawals via this custom bridge.

To add your bridge and token to the token list, you must make a pull request against the [Optimism token list repository](https://github.com/ethereum-optimism/ethereum-optimism.github.io#adding-a-token-to-the-list). Due to the complexity of reviewing a custom bridge, you will need to deploy to Optimism kovan first, before going to production. This is an example of a custom bridge [deployed on kovan](https://github.com/ethereum-optimism/ethereum-optimism.github.io/pull/46/files) for testing, before being [deployed to mainnet](https://github.com/ethereum-optimism/ethereum-optimism.github.io/pull/45/files).
