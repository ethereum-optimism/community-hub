---
title: Building on Optimistic Ethereum
lang: en-US
tags:
    - contracts
    - high-level
    - buidling
    - building
---

# {{ $frontmatter.title }}

::: tip Work in Progress™
_Our documentation is a rapidly improving work in progress. If you have questions or feel like something is missing feel free to ask in our [Discord server](https://discord.gg/5TaAXGn2D8) where we (and our awesome community) are actively responding, or [open an issue](https://github.com/ethereum-optimism/community-hub/issues) in the GitHub repo for this site._
:::

## Introduction

Hello and welcome!  If you're looking to find out what it takes to get your dApp up and running on layer 2, then you've come to the right place!  This document will serve as a reference to take you through the stages of integrating.

*Note: if at any time in this process you get stuck or have questions, please reach out on [discord](https://discord.gg/5TaAXGn2D8)!  We just ask that you do this in the public `#tech-support` channel so that others may learn alongside us.* :)

## Buidling Overview

There are two main steps to get a dapp running on Optimistic Ethereum:

1. **Compile and test your contracts:** get your existing contract tests running on a local version of Optimistic Ethereum via [truffle](https://www.trufflesuite.com/), [hardhat](https://hardhat.org), or your preferred Ethereum testing framework.
2. **Deploy your contracts to Optimistic Ethereum:** run those cheap a$$ transactons for real!

You might also want to take the following two steps depending on your specific needs:

1. **(Optional) Deploy and test against L2 Geth:** get those contracts running on a local instance of the full L2 system with our modified version of [go-ethereum](https://github.com/ethereum-optimism/go-ethereum).
2. **(Optional) Create bridges between L1 and L2:** get L1 and L2 communicating where necessary, such as adding deposits/withdrawals.

## Compiling and Testing Contracts

### Setup and Resources

The first part of getting started with Optimistic Ethereum is to get your contracts up and running on a local L2 node.
This process involves two primary sub-steps:

1. Compile your contracts with the OVM Solidity compiler.
2. Deploy and test your contracts onto the local L2 node.

If you're using [hardhat](https://hardhat.org), our preferred development environment, this can all be done with the use of some handy plugins we've built.
For the rest of this documentation, we'll expect you to have your Solidity contracts ready to go.
Please note that Vyper support is currently not enabled but is planned for a future release.

If you want to try out an example contract instead of deploying your own, you can follow our [tutorial](https://github.com/ethereum-optimism/optimism-tutorial) (which should be pretty seamless).
If you're using another testing suite like [truffle](https://www.trufflesuite.com/), that tutorial won't apply. But these `npm` packages have got you covered:

- [`@eth-optimism/solc`](https://www.npmjs.com/package/@eth-optimism/solc): exports the Optimistic Ethereum compiler for `solidity@0.5/0.6/0.7`
- [`@eth-optimism/plugins`](https://www.npmjs.com/package/@eth-optimism/plugins): exports "OVM-ified" `waffle.mockProvider` and `ganache` packages which will work with contracts output by the compiler.

An example of usage with [waffle](https://getwaffle.io) can be found in [this great tutorial](https://github.com/ScopeLift/ovm-uniswap-v2-core#porting-solidity-contracts-to-optimism-a-guide-using-uniswap-v2) by [Scopelift](https://www.scopelift.co/) which walks through getting Uniswap V2 ported over.
If you are using [truffle](https://www.trufflesuite.com/), [here is an example config file](https://github.com/ethereum-optimism/optimism-monorepo/blob/6b535ab759aa2d4bf9325d40ea68aa5f7fc466a6/packages/ovm-toolchain/test/config/truffle-config.js) which shows how to incorporate the compiler and `ganache` for the OVM.

We recommend preserving EVM functionality when doing your port.
For example, you might want to add separate `test:evm` and `test:ovm` scripts that use different `truffle-config.js` and `truffle-config-ovm.js` configuration files.
**It's very important to make sure that all of your contract tests work in the EVM first before debugging the OVM.**
Sometimes it looks like the OVM has a bug, when really it's just an error in your contracts.

::: tip
We're focusing most of our internal development efforts on our [hardhat](https://hardhat.org) tooling.
However, we are still attempting to provide continued support for other development frameworks like [truffle](https://www.trufflesuite.com/).
If any of our plugins are giving you issues, please ping us in our [#tech-support channel](https://discord.gg/NypkmfSkkw) in our discord server and we can help out.
:::

### Troubleshooting

There are some small differences between the EVM and the OVM which could require some debugging at this stage.
For help with these, you can check out the following resources:

1. [High level overview](https://hackmd.io/elr0znYORiOMSTtfPJVAaA) of differences.
2. [Complete EVM/OVM comparison](/docs/protocol/evm-comparison) of all discrepancies.
3. [Scopelift Uniswap tutorial](https://github.com/ScopeLift/ovm-uniswap-v2-core#porting-solidity-contracts-to-optimism-a-guide-using-uniswap-v2), which has some great "OVM vs. EVM" sections.

## Deploying on Optimistic Ethereum
Assuming you've been able to succesfully follow one of the above tutorials, you should now have an easy way to test your Optimistic Ethereum contracts.
Hopefully you have a bunch of green checkmarks coming out of a fancy L2 VM!
Next we're going to get your contracts deployed to a real Optimistic Ethereum node (running on our [fork of go-ethereum](https://github.com/ethereum-optimism/go-ethereum)).

### Local Deployment (Optional)
This step is technically optional, but we'd recommend going through it anyway.
Before deploying to a "real" network (testnet or mainnet), you may want to deploy to a local version of our `go-ethereum` fork.
If your contracts are relatively simple you may not need to do this.
However, if you plan to write contracts that communicate between L1 and L2, then we highly recommend reading this section.

#### Using the `optimism-integration` Repo
The [`optimism-integration`](https://github.com/ethereum-optimism/optimism-integration) repo gives you a single command to spin up a complete L1/L2 development environment.
We use [docker](https://www.docker.com/) to standardize our development experience, so please make sure you've [installed docker](https://www.docker.com/products/docker-desktop) and that the docker service is running before you continue.
You can check out the [tool's full usage page](https://github.com/ethereum-optimism/optimism-integration#usage) for a complete "getting started" guide.

First, run the following commands to get set up:

```shell
git clone git@github.com:ethereum-optimism/optimism-integration.git --recurse-submodules
cd optimism-integration
docker-compose pull
```

Then, run the famous `up.sh` script to spin everything up:

```shell
./up.sh
```

And that's it!
You now have an L2 chain (sequencer) at `localhost:9545` connected to an L1 chain at `localhost:8545`.

#### Common Gotchas
::: tip Need help?
We're doing our best to keep this section updated as common issues come and go.
If none of the tips here work for you, please report an issue on [discord](https://discord.gg/5TaAXGn2D8).
:::

People tend to run into a few common issues when first interacting with Optimistic Ethereum.
Here's a checklist to run through if you're having any problems.

##### Gotcha: Invalid chain ID
The default chain ID of the `up.sh` script is `420`.
If you're getting an error when sending transactions, please make sure they you're using the right chain ID.

##### Gotcha: Local node does not charge fees
At the moment, the node created by `up.sh` does not charge the user for any fees.
You can send successfully transactions with `gasPrice = 0`.

##### Gotcha: Constantly exceeding gas limit
Because of some technical details about rollups, the maximum gas limit of each transaction is always a bit less than on mainnet.
You can bypass this during testing by updating [this environment variable](https://github.com/ethereum-optimism/optimism-integration/blob/dccd1b95b890c53679d32b36e14b50165900fb6d/docker-compose.env#L17).
However, you will still need to decrease your gas usage before deploying to a "live" network.

##### Gotcha: Still seeing the same bug after a patch or new release
We frequently update our software and corresponding docker images.
Make sure to periodically download the latest code by running the `pull.sh` script inside the `optimism-integration` repository.

##### Gotcha: Gas used appears to be exceeding gas limit
All L2 transactions are technically metatransactions sent by the sequencer.
This means that `receipt.gasUsed` may be higher than the `tx.gasLimit`, and is currently an underestimate by about 20%.
This will be fixed in an upcoming release. 

##### Gotcha: Contract deployment appears to fail for no reason
Make sure you're compiling with the Optimistic Ethereum version of the Solidity compiler.
Contract deployments will usually fail if you compile using the standard Solidity compiler.

### Testnet Deployment
You probably want to deploy to testnet before heading over to mainnet (good idea, tbh).
Our primary L2 testnet is currently deployed on top of Ethereum's [Kovan](https://kovan.etherscan.io) network.
We sometimes run other testnets too. 
Here's a current list of our testnet endpoints (will be updated when things change):

| L1 Network                          | L2 Network | HTTP Endpoint                                          | Websocket Endpoint                                               |
| ----------------------------------- | ---------- | ------------------------------------------------------ | ---------------------------------------------------------------- |
| [Kovan](https://kovan.etherscan.io) | OE Kovan 1 | [https://kovan.optimism.io](https://kovan.optimism.io) | [https://kovan.optimism.io:8546](https://kovan.optimism.io:8546) |


## Bridging L1 and L2
::: tip Work in Progress™
This section is still a work in progress.
Cross-chain communication is one of the most complex (but also coolest) parts of our system.
Thank you for your patience while we get all of this documentation out. ❤️
:::

Apps on Optimistic Ethereum are extra cool because they can, if necessary, interact with smart contracts sitting on Ethereum.
We provide a standard message-passing interface for sending data between L1 and L2 to make this as easy as possible.
If you don't think you'll be sending information between layers, you probably don't need to read through this section.

Documentation for arbitrary message passing is a Work In Progress™, but all features do already work.
In the meantime, you may be interested in taking a look at the Synthetix Bridge contracts.
These contracts are pretty cool and make heavy use of our L1⇔L2 messaging infrastructure:

1. Depositing SNX into L2
    - [Initiating a deposit on L1](https://github.com/Synthetixio/synthetix/blob/49427867e6d50886e0c8725e15c8b87e25aa6f8c/contracts/SynthetixBridgeToOptimism.sol#L190-L205)
    - [Which leads to receiving a balance on L2](https://github.com/Synthetixio/synthetix/blob/49427867e6d50886e0c8725e15c8b87e25aa6f8c/contracts/SynthetixBridgeToBase.sol#L111-L115)
2. Migrate SNX Escrow entries to L2 (transferring large amounts of state from L1->L2):
    - [Initiating a migration on L1](https://github.com/Synthetixio/synthetix/blob/49427867e6d50886e0c8725e15c8b87e25aa6f8c/contracts/SynthetixBridgeToOptimism.sol#L207-L236)
    - [Which leads to receiving escrow entries on L2](https://github.com/Synthetixio/synthetix/blob/49427867e6d50886e0c8725e15c8b87e25aa6f8c/contracts/SynthetixBridgeToBase.sol#L98-L108)
3. Withdrawing SNX to L1:
    - [Burning L2 SNX and initiating the withdrawal on L2](https://github.com/Synthetixio/synthetix/blob/49427867e6d50886e0c8725e15c8b87e25aa6f8c/contracts/SynthetixBridgeToBase.sol#L76-L94)
    - [Completing the withdrawal and receiving a balance on L1](https://github.com/Synthetixio/synthetix/blob/49427867e6d50886e0c8725e15c8b87e25aa6f8c/contracts/SynthetixBridgeToOptimism.sol#L126-L136)

## Additional Developer Documentation

### L1 and L2 Communication Overview
::: tip Old AF™
This section is in line for some significant updates. 
It's still technically correct, but we'd like to show it some more love.
:::

### API
This section details the interface that our system exposes for implementing L1⇔L2 communication.
Here are **roughly** the functions you get access to (we're ignoring any of the "fluff" arguments like nonces, etc. that are there in practice).
If you'd like to view the exact APIs, you can take a look at our [`OVM_L1CrossDomainMessenger`](https://github.com/ethereum-optimism/contracts/blob/master/contracts/optimistic-ethereum/OVM/bridge/messenging/OVM_L1CrossDomainMessenger.sol) and [`OVM_L2CrossDomainMessenger`](https://github.com/ethereum-optimism/contracts/blob/master/contracts/optimistic-ethereum/OVM/bridge/messenging/OVM_L2CrossDomainMessenger.sol) contracts.

#### Layer 1 API

##### sendL1ToL2Message

```solidity
function sendL1ToL2Message(targetL2Contract: address, data: bytes) public;
```

Sends a message the specified some contract on L2. This will trigger a transaction with that `calldata` on L2.

##### verifyL2ToL1Message

```solidity
function verifyL2ToL1Message(l2MessageSender: address, data: bytes) public view returns (bool);
```

Verifies that the specified message was sent by the specified contract on L2, and the dispute period has elapsed.

#### Layer 2 API

##### getL1TxOrigin

```solidity
function getL1TxOrigin() public view returns (address);
```

Gets the address of the account that called `sendL1ToL2Message(...)` on L1 and triggered this L2 transaction.
If the current transaction was not sent via `sendL1ToL2Message(...)`, then this function will return the zero address (`0x00...00`).

##### sendL2ToL1Message

```solidity
function sendL2ToL1Message(data: bytes) public;
```

Sends a message from L2 to L1, will be verifiable on L1 once the dispute period has elapsed.

### Pseudocode For Deposits and Withdrawals
Here's some light pseudocode for how you might use the above messaging functions to move ERC20 tokens between Layer 1 and Layer 2.
We need two contracts in total, one sitting on L1 and another one on L2.

#### Layer 1 Deposit/Withdrawal Contract

::: tip Note
This is pseudocode and won't actually work if you try to compile it.
It's just to give you an idea of what's going on.
:::

```solidity
contract L1DepositWithdrawalContract {
    // The rollup contract to handle deposits/withdraws with.
    address const ROLLUP_CONTRACT: 0x...;

    // Address of the ERC20 token on Layer 1 (Ethereum).
    address const L1_ERC20_TOKEN: 0x...;

    // Address of the same ERC20 token on Layer 2 (Optimistic Ethereum).
    address const L2_ERC20_TOKEN_EQUIVALENT: 0x...;

    function depositIntoL2(
        uint256 _value
    )
        public
    {
        // Store the deposited funds inside this contract for safekeeping.
        L1_ERC20_TOKEN_ADDRESS.transferFrom(
            msg.sender,
            address(this)
            value,
        );

        // Now we tell the L2 contract about the deposit so it can mint equal funds there.
        // Gotta generate the L1->L2 message calldata.
        bytes memory data = abi.encodeWithSignature(
            "processDeposit(uint256,address)",
            _value,
            msg.sender
        );

        // Send the L1->L2 message.
        ROLLUP_CONTRACT.sendL1ToL2Message(
            data,
            L2_ERC20_TOKEN_EQUIVALENT
        );
    }

    function redeemWithdrawal(
        uint256 _amount        
    )
        public
    {
        address withdrawer = msg.sender;

        // If the withrawal is permitted, this is what should've been sent.
        bytes memory expectedData = abi.encodePacked(
            withdrawer,
            _amount
        );

        // Verify that the correct L2 contract did indeed authenticate this withdrawal.
        ROLLUP_CONTRACT.verifyL2ToL1Message(
            expectedData,
            L2_ERC20_TOKEN_EQUIVALENT
        )

        // Send to the withdrawer.
        L1_ERC20_TOKEN.transfer(amount, withdrawer)
    }
}
```

#### Layer 2 Deposit/Withdrawal Contract

This OVM contract would be deployed at `L2_ERC20_TOKEN_EQUIVALENT` going by the above code.
Assume it extends a base ERC20 class which allows `mint()`ing and `burn()`ing coins to particular addresses.

```solidity
import { OvmUtils } from 'somewhere';

contract L2DepositWithdrawalContract is ERC20WithMintAndBurn {
    // This would be the delpoyed L1 contract above
    address const L1_DEPOSIT_CONTRACT = 0x...;

    function processDeposit(
        uint256 _amount,
        address _depositer
    )
        public
    {
        // Make sure this is really a deposit.
        require(
            OvmUtils.getL1TxOrigin() == L1_DEPOSIT_CONTRACT,
            'Only the deposit contract may mint this bridged L2 token.'
        );

        // Mint the L2 version of the token to depositer.
        mint(_amount, _depositer);
    }

    function withdrawToL1(
        uint256 _amount
    )
        public
    {
        address withdrawer = msg.sender;

        // we need to tell the L1 contract who is withdrawing, and how much.
        bytes memory data = concat(withdrawer, _amount);

        // send off the message to L1
        OvmUtils.sendL2ToL1Message(data);

        // Now that it will be unlockable on L1, it must be burned here
        burn(withdrawer, _amount);

        // That's it, just wait the dispute period to reedeem!
    }
}
```
