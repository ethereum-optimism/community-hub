---
title: The OP Stack Client SDK
lang: en-US
---

There are a few areas in which the SDK can help you navigate [the differences between OP Mainnet and Ethereum](../developers/build/differences/):

- [Gas costs](../developers/build/transaction-fees.md)
- [Interlayer communication](../developers/bridge/basics.md)

The SDK supports multiple OP Chains: OP, Base, Zora, etc.
To see whether a specific OP Chain is supported directly, [see the documentation](https://sdk.optimism.io/enums/l2chainid).
Chains that aren't officially supported just take a few extra steps.
Get the L1 contract addresses, and [provide them to the SDK](https://stack.optimism.io/docs/build/sdk/#contract-addresses).
Once you do that, you can use the SDK normally.

[Reference](https://sdk.optimism.io/)

## Tutorials:
- [Viewing transactions between layers](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-view-tx)
- [Bridging ETH](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/cross-dom-bridge-eth)
- [Bridging ERC-20](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/cross-dom-bridge-erc20)
- [Estimate the costs of an Optimistic (L2) transaction](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas)
