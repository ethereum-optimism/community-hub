---
title: Developing smart contracts on Optimism
lang: en-US
---

This guide shows you the ropes of developing smart contracts for Optimism. With Optimism, all your favourite developer tools work out the box, no special set up required. They work because Optimism is [EVM Equivalent](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306) with some [small exceptions](../developers/build/differences.md). We have made this guide to make it _that_ much easier to get started!

Optimism supports [Solidity](https://docs.soliditylang.org/en/develop/) as well as [Vyper](https://vyper.readthedocs.io/en/stable/). If you have never written a smart contract before, we have a more step by step guide for [developers using Remix](../developers/build/basic-contract.md#writing-a-quick-contract) and recommend reading the [Solidity docs getting started section](https://docs.soliditylang.org/en/develop/#getting-started).

## Local Development

To get started we need to get a local environment set up for testing and development. We have a [Hardhat tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/hardhat), [dapptools tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/dapptools), as well as a [Truffle tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/truffle). If you prefer doing things in your browser, we also have a [Remix tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/remix).

Depending on your set up you will need to set up a local testnet. All of the above tutorials have instructions on how to set up an appropriate testing environment.

## Deploying on Testnet

So you've written your contracts and are ready to deploy them to the testnet! First things first you are going to need some test ETH on Optimism Kovan. Head to the [faucet](https://faucet.paradigm.xyz/) for some test ETH on both Kovan and Optimism Kovan.

Next you will need to connect to the Optimism Kovan network to deploy your contracts. You can find all the required network information as well as PRC endpoints in our [networks page](../useful-tools/networks.md#optimism-kovan-testnet). Additionally we have a helpful page of [debugging tools](../useful-tools/debugging.md) you can make use of while working out those final bugs.

Please read through our [known issues](../developers/known-issues.md) if you run into any unexpected behaviors _before_ you deploy to mainnet.

## Mainnet Deployments

Ready for mainnet? Fantastic! Just like with the testnet, you are going to need ETH on the Optimism network in order to deploy.

There are three ways you can do this:
1. Bridge ETH from mainnet to Optimism using the [Optimism Gateway](https://gateway.optimism.io/).
2. Use a [fiat onramp](https://help.optimism.io/hc/en-us/articles/4413642522139-Is-Optimism-supported-by-fiat-onramps-or-do-I-need-to-buy-assets-and-then-bridge-them-) directly onto Optimism.
3. Bridge ETH from another chain to Optimism using a [third part bridge](https://www.optimism.io/apps/bridges).

Now that your deployer address has ETH, you will need to point to the right network to deploy. You can find the required network information as well as RPC provider information in our [networks page](../useful-tools/networks.md#optimism-mainnet).

If you run into any trouble don't hesitate to ask for help on our [Discord](https://discord.optimism.io/)!