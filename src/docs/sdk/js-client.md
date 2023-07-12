---
title: The OP Mainnet Client SDK
lang: en-US
---

There are a few areas in which the SDK can help you navigate [the differences between OP Mainnet and Ethereum](../developers/build/differences/):

- [Gas costs](../developers/build/transaction-fees.md)
- [Interlayer communication](../developers/bridge/basics.md)

## JavaScript SDK

The JavaScript SDK directly multiple OP Chains: OP (Mainnet and Goerli), Base Goerli, etc.
To see whether a specific OP Chain is supported directly, look in the `CONTRACT_ADDRESSES` constant in [`chain-constants.ts`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/sdk/src/utils/chain-constants.ts#L124-L129).

"Unsupported chains" just take an extra step to use.
Get the L1 contract addresses, and [provide them to the SDK](https://stack.optimism.io/docs/build/sdk/#contract-addresses).
Once you do that, you can use the SDK normally.

[Reference](https://sdk.optimism.io/)

Tutorials:
- [Viewing transactions between layers](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-view-tx)
- [Bridging ETH](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/cross-dom-bridge-eth)
- [Bridging ERC-20](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/cross-dom-bridge-erc20)
- [Estimate the costs of an Optimistic (L2) transaction](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas)
