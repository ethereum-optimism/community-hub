---
title: Integrating with Optimistic Ethereum
lang: en-US
tags:
    - contracts
    - high-level
---

# {{ $frontmatter.title }}


::: tip Heads Up
_Our documentation is a rapidly improving work in progress. If you have questions or feel like something is missing feel free to ask in our [Discord server](https://discord.gg/5TaAXGn2D8) where we (and our awesome community) are actively responding, or [open an issue](https://github.com/ethereum-optimism/community-hub/issues) in the GitHub repo for this site._
:::


## Introduction

Hello and welcome!  If you're looking to find out what it takes to get your dApp up and running on layer 2, then you've come to the right place!  This document will serve as a reference to take you through the stages of integrating.

*Note: if at any time in this process you get stuck or have questions, please reach out on [discord](https://discord.gg/5TaAXGn2D8)!  We just ask that you do this in the public `#tech-support` channel so that others may learn alongside us. :)*

## Overview

There are three main steps to trace to get your dApp running on the OVM:
1. **Integrate L2 contracts and compiler:** get your existing contract tests running on a local OVM, i.e. ganache or hardhat.
2. **Integrate full L2 system:** get those contracts running on a local instance of the full system, including a local L1 chain, sequencer, etc.
3. **Bridging:** Get L1 and L2 communicating where necessary, such as adding deposits/withdrawals.

## 1. Running on the OVM

### Setup and Resources
The first step in getting started on the OVM is getting your contracts up and running in an L2 VM (the OVM!).  This involves two parts:
1. Getting the contracts building with the OVM compiler.
2. Running those contracts on an OVM-compatible VM.

If you're using hardhat, our preferred development environment, this can all be done with the use of some handy plugins we've built.  If you follow our `optimism-tutorial` [here](https://github.com/ethereum-optimism/optimism-tutorial), this should be pretty seamless.

If you're using another testing suite like waffle or ganache, that tutorial won't apply.  but, these packages NPM have got you covered:
- `@eth-optimism/solc`: exports OVM compiler for `solidity@0.5/0.6/0.7`.
- `@eth-optimism/ovm-toolchain`: exports "OVM-ified" `waffleV3.mockProvider` and `ganache` packages which will work with contracts output by the compiler.

An example of usage with `waffle` can be found in [this great tutorial](https://github.com/ScopeLift/ovm-uniswap-v2-core#porting-solidity-contracts-to-optimism-a-guide-using-uniswap-v2) by Scopelift which walks through getting Uniswap V2 ported over.  If you are using `truffle`, [here is an example config file](https://github.com/ethereum-optimism/optimism-monorepo/blob/master/packages/ovm-toolchain/test/config/truffle-config.js) which shows how to incorporate the compiler and `ganache` for the OVM.

*//Note: we recommend preserving EVM functionality when doing your port; for example by adding separate `test:evm` and `test:ovm` flags that use separate `truffle-config.js` and `truffle-config-ovm.js`.  **It's very important to make sure that all of your contract tests work in the EVM first before debugging the OVM.  Sometimes it looks like the OVM has a bug, when really it's just an error in your contracts**.*

### Troubleshooting
There are some small differences between the EVM and the OVM which could require some debugging at this stage, such as removing usage of opcodes which do not have an equivalent in L2.  For help with these, you can check out the following resources:
1. This [high level overview](https://hackmd.io/elr0znYORiOMSTtfPJVAaA) of differences
2. The [scopelift Uniswap tutorial](https://github.com/ScopeLift/ovm-uniswap-v2-core#porting-solidity-contracts-to-optimism-a-guide-using-uniswap-v2) has some great "OVM vs. EVM" sections.
3. For a DEEP robust explanation of ALL OVM <> EVM incompatabilities: https://hackmd.io/Inuu-T_UTsSXnzGtrLR8gA

## 2. Running on Optimistic Ethereum
Now you should have a nice easy way to run `test:ovm` and see a bunch of green checkmarks running on a fancy L2 VM.  Yay!

However, this L2 is a standalone simulation.  The next step is to get the system running on a full local copy of Optimisic Ethereum -- this includes things like the L1 contracts which secure the L2 protocol, the sequencer, and fee payments.

### Local Deployment

The `optimism-integration` repo gives you a single command to spin up the full E2E system locally.  You can check out the [full usage page](https://github.com/ethereum-optimism/optimism-integration#usage), but the basic commands to run are:

```bash=
$ git clone git@github.com:ethereum-optimism/optimism-integration.git --recurse-submodules
$ cd optimism-integration
$ docker-compose pull
$ ./up.sh
```

And that's it!  You now have an L2 chain (sequencer) at `localhost:8545` connected to an L1 chain at `localhost:9545`.

#### Gotchas
Common things which you might encounter here:
- The default chainID of the `up.sh` is `420`.
- Eventually you will have to incorporate L2 fees, but you can start with setting `gasPrice=0`.
- If your gas is going over the limit, you can update [this environment variable](https://github.com/ethereum-optimism/optimism-integration/blob/dccd1b95b890c53679d32b36e14b50165900fb6d/docker-compose.env#L17) to continue testing before getting the cost down below mainnet's limit.
- We do sometimes update this software with breaking changes, so make sure to keep updated periodically by running `git pull` and `docker-compose pull`.
- All L2 transactions are technically metatransactions sent by the sequencer.  This means that `receipt.gasUsed` may be higher than the `tx.gasLimit`, and is currently an underestimate by about 20%.  This will be fixed in an upcoming release. 
- Contract deployments may fail because they either exceed the L2 chain tx gas limit of 9m or because the contract contained unsafe bytecode.


## 3. Bridging L1 and L2

The last step to get the system ready to deploy is, if necessary, work on connecting L1 and L2.  We provide a standard message-passing interface for sending data between L1 and L2.  Your application may not need this, or it may just need to use the existing bridge infrastructure for deposits and withdrawals.

Documentation for arbitrary message passing is a Work In Progress, but all features do already work.  So, in the meantime, you can take a look at Synthetix's Bridge contracts for their usage of our L1<->L2 messaging:
1. Depositing SNX into L2
    - Initiating on L1: https://github.com/Synthetixio/synthetix/blob/49427867e6d50886e0c8725e15c8b87e25aa6f8c/contracts/SynthetixBridgeToOptimism.sol#L190-L205
    - This leads to recieving on L2: https://github.com/Synthetixio/synthetix/blob/49427867e6d50886e0c8725e15c8b87e25aa6f8c/contracts/SynthetixBridgeToBase.sol#L111-L115
2. Migrate SNX Escrow entries to L2 (transferring large amounts of state from L1->L2): 
    - Initiating on L1: https://github.com/Synthetixio/synthetix/blob/49427867e6d50886e0c8725e15c8b87e25aa6f8c/contracts/SynthetixBridgeToOptimism.sol#L207-L236
    - This leads to receiving on L2: https://github.com/Synthetixio/synthetix/blob/49427867e6d50886e0c8725e15c8b87e25aa6f8c/contracts/SynthetixBridgeToBase.sol#L98-L108
3. Withdrawing SNX to L1:
    - Burning L2 SNX and initiating the withdrawal on L2: https://github.com/Synthetixio/synthetix/blob/49427867e6d50886e0c8725e15c8b87e25aa6f8c/contracts/SynthetixBridgeToBase.sol#L76-L94
    - Completing the Withdrawal on L1: https://github.com/Synthetixio/synthetix/blob/49427867e6d50886e0c8725e15c8b87e25aa6f8c/contracts/SynthetixBridgeToOptimism.sol#L126-L136