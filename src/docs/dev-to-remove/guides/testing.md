---
title: Testing on Optimistic Test Networks
lang: en-US
---

You can find the chainid and supporting information for OP Goerli, our test network, [using these endpoints](../useful-tools/networks.md).
To obtain ETH and tokens (both ERC-20 and NFT) from faucets, [see here](../useful-tools/faucets.md).

This page shows some additional testing utilities that you might find useful.


## ERC-20 tokens

We have several ERC-20 testing token contracts.
This token is an implementation of ERC-20, with the addition of `faucet`, a function that mints for the caller 1000 tokens to facilitate testing.

Additionally, both OP Mainnet and OP Goerli have [WETH at address `0x4200000000000000000000000000000000000006`](https://help.optimism.io/hc/en-us/articles/4417948883611-What-is-ETH-WETH-How-do-they-interact-).

### Goerli ERC-20 testing contracts

| Address | Symbol | Decimals | 
| - | - | -: | 
| [`0x32307adfFE088e383AFAa721b06436aDaBA47DBE`](https://goerli-explorer.optimism.io/address/0x32307adfFE088e383AFAa721b06436aDaBA47DBE) | OUT-1 | 18 |
| [`0xb378ed8647d67b5db6fd41817fd7a0949627d87a`](https://goerli-explorer.optimism.io/address/0xb378eD8647D67b5dB6fD41817fd7a0949627D87a/) | OUT-2 | 18 |
| [`0x4e6597062c7dc988fbcfe77293d833bad770c19b`](https://goerli-explorer.optimism.io/address/0x4E6597062c7DC988FBcFE77293D833bAD770C19b) | OUT-3 | 18 |



## The bridge

The `OUTb` token is supported by the bridge on Goerli.
See [this tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/cross-dom-bridge-erc20) to see how to use it.

## ERC-721 tokens

We have an ERC-721 token on OP Goerli at address [`0x38abA480f2bA7A17bC01EE5E1AD64fCedd93EfE7`](https://goerli-explorer.optimism.io/address/0x38abA480f2bA7A17bC01EE5E1AD64fCedd93EfE7).
It is the OpenZeppelin ERC-721 token contract with the addition of `faucet`.
Just call the `faucet` function to get as many NFT tokens as you need.
