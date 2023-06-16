---
title: Supporting OP Mainnet in your wallet
lang: en-US
---

## Overview

This guide is intended for wallet developers who want to give their users the ability to send transactions on OP Mainnet.
OP Mainnet generally behaves like any other EVM-based chain with the exception of minor discrepancies related to [transaction fees](#transaction-fees).
These fee discrepancies are an inherent result of the fact that OP Mainnet is a Layer 2 blockchain network that must publish transaction data to Ethereum.

## Connecting to OP Mainnet

OP Mainnet shares the [Ethereum JSON-RPC API](https://eth.wiki/json-rpc/API) with only [a few minor differences](../developers/build/json-rpc.md).
You'll find all of the important information about OP Mainnet, as well as any test networks, on [our Networks page](../useful-tools/networks.md).
You can choose to connect to OP Mainnet via our rate-limited public endpoints, [private endpoints from infrastructure providers](../useful-tools/networks.md), or [by running your own node](../developers/build/run-a-node/).
Because of throughput limits, we recommend using private node providers (particularly [Alchemy](https://www.alchemy.com/optimism)) or running your own node for production applications.

## Canonical token addresses

The ERC-20 contract address for a token on OP Mainnet may be different from the address for the same token on Ethereum.
Optimism maintains [a token list](https://static.optimism.io/optimism.tokenlist.json) that includes known addresses for many popular tokens.
You can see the same list with a nicer user interface [here](https://tokenlists.org/token-list?url=https://static.optimism.io/optimism.tokenlist.json).

For example, looking at the **SNX** token, the [Superchain token list](https://static.optimism.io/optimism.tokenlist.json) returns the following addresses:

| ChainID | Network | Address |
| -: | - | - |
| 1  | Ethereum    | 0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f |
| 10 | OP Mainnet    | 0x8700daec35af8ff88c16bdf0418774cb3d7599b4
| 5 | Goerli (test network) | 0x51f44ca59b867E005e48FA573Cb8df83FC7f7597
| 420 | OP Goerli (test network) | 0x2E5ED97596a8368EB9E44B1f3F25B2E813845303



## Transaction status

A transaction in OP Mainnet can be in one of two states:

1. **Sequencer Confirmed**: The transaction has been accepted by the sequencer on OP Mainnet (L2)
2. **Confirmed Onchain**: The transaction has been written to Ethereum (L1)

We're still working on the tooling to easily detect when a given transaction has been published to Ethereum.
For the moment, we recommend wallets consider transactions final after they are "Sequencer Confirmed".
Transactions are considered "Sequencer Confirmed" as soon as their transaction receipt shows at least one confirmation.

## Transaction Fees

We aim to be [EVM equivalent](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306), meaning we aim to minimize the differences between OP Mainnet and Ethereum.
You can see a summary of the few differences between OP Mainnet and Ethereum [here](../developers/build/differences.md).
One of the most important discrepancies can be found within OP Mainnet's fee model.
As a wallet developer, you **must** be aware of this difference.

### Estimating total fees

Most of the cost of a transaction on OP Mainnet comes from the cost of publishing the transaction to Ethereum.
This publication step is what makes OP Mainnet a Layer 2 blockchain.
Unlike with the standard execution gas fee, users cannot specify a particular gas price or gas limit for this portion of their transaction cost.
Instead, this fee is automatically deducted from the user's ETH balance on OP Mainnet when the transaction is executed.

[You can read more about this subject here](../developers/build/transaction-fees.md),
or use [this tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas).
The total fee paid by a transaction will be a combination of the normal fee estimation formula (`gasPrice * gasLimit`) in addition to the estimated L1 fee.

### Displaying fees

We **highly recommend** displaying fees on OP Mainnet as one unified fee to minimize user confusion.
You can do this by combining both portions of the fee (the L2 execution fee and the L1 data fee) into a single value presented to the end user.

### Sending "max" ETH

Many wallets allow users to send the maximum amount of ETH available in the user's balance.
Of course, this requires that the predicted fee for the send transaction be deducted from the ETH balance being sent.
You **MUST** deduct both the L2 execution fee and the L1 data fee or the charged fee plus the balance sent will exceed the user's balance and the transaction will fail.

### Displaying the gas prices

If you want to display the current gas prices, you can use [`eth_gasPrice`](https://docs.alchemy.com/reference/eth-gasprice).