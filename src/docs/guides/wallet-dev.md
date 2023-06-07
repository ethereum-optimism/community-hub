---
title: Supporting Optimism in your wallet
lang: en-US
---

## Overview

This guide is intended for wallet developers who want to give their users the ability to send transactions on the Optimism network.
Optimism generally behaves like any other EVM-based chain with the exception of minor discrepancies related to [transaction fees](#transaction-fees).
These fee discrepancies are an inherent result of the fact that Optimism is a Layer 2 blockchain network that must publish transaction data to Ethereum.

## Connecting to Optimism

Optimism shares the [Ethereum JSON-RPC API](https://eth.wiki/json-rpc/API) with only [a few minor differences](../developers/build/json-rpc.md).
You'll find all of the important information about each Optimism network on [our Networks page](../useful-tools/networks.md).
You can choose to connect to Optimism via our rate-limited public endpoints, [private endpoints from infrastructure providers](../useful-tools/networks.md), or [by running your own node](../developers/build/run-a-node/).
Because of throughput limits, we recommend using private node providers (particularly [Alchemy](https://www.alchemy.com/optimism)) or running your own node for production applications.

## Canonical token addresses

The ERC-20 contract address for a token on Optimism may be different from the address for the same token on Ethereum.
Optimism maintains [a token list](https://static.optimism.io/optimism.tokenlist.json) that includes known addresses for many popular tokens.
You can see the same list with a nicer user interface [here](https://tokenlists.org/token-list?url=https://static.optimism.io/optimism.tokenlist.json).

For example, looking at the **SNX** token, the [Superchain token list](https://static.optimism.io/optimism.tokenlist.json) returns the following addresses:

| ChainID | Network | Address |
| -: | - | - |
| 1  | Ethereum    | 0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f |
| 10 | Optimism    | 0x8700daec35af8ff88c16bdf0418774cb3d7599b4
| 5 | Goerli (test network) | 0x51f44ca59b867E005e48FA573Cb8df83FC7f7597
| 420 | Optimistic Goerli (test network) | 0x2E5ED97596a8368EB9E44B1f3F25B2E813845303



## Transaction status

We use the same vocabulary as the Beacon Chain to describe block finality. 
Blocks (and the transactions within them) can be in one of the following states:

- `unsafe`, meaning that the block has been received via gossip but has not yet been submitted to L1. Unsafe blocks can be reorged if L1 reorgs, or the sequencer reorgs.
- `safe`, meaning that the block has been submitted to L1. Safe blocks can also be reorged if L1 reorgs.
- `finalized`, meaning that the block has reached sufficient depth to be considered final. Finalized blocks cannot be reorged.

The current `safe`, `unsafe`, and `finalized` blocks can be queried via [JSON-RPC](../developers/build/json-rpc.md#optimism-syncstatus).

## Transaction Fees

The transaction fee is based on two components:

1. L2 execution fee
1. L1 data fee

[See here for a deeper explanation of Optimism's transasction fees](../developers/build/transaction-fees.md).

You can send transactions using standard EIP 1559 user interface and logic, as long as you make sure to **display the entire fee, including the L1 data fee**. 

We **highly recommend** displaying fees on Optimism as one unified fee to minimize user confusion.
You can do this by combining both portions of the fee (the L2 execution fee and the L1 data fee) into a single value presented to the end user.
[The SDK can do that for you](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas).


### The L2 execution fee

This fee is calculated using the same [EIP 1559 mechanism](https://eips.ethereum.org/EIPS/eip-1559) used by L1 Ethereum (except with different parameters). This means it is composed of two components: a fixed base fee and a user selected priority fee.

To enable your users to select a priority fee, you can [build a priority fee estimator]
(https://docs.alchemy.com/docs/how-to-build-a-gas-fee-estimator-using-eip-1559).
If you already have estimating code you use for L1 Ethereum, you can just use that.

### The L1 data fee

[You can see how this fee is calculated here](../developers/build/transaction-fees.md#the-l1-data-fee). 
However, the easiest way to get it is to [use the SDK](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas).
If you cannot use the SDK for some reason, you can get an L1 data fee estimate [`GasPriceOracle`'s `getL1Fee` function](https://optimistic.etherscan.io/address/0x420000000000000000000000000000000000000F#readContract#F3).



### Sending "max" ETH

Many wallets allow users to send the maximum amount of ETH available in the user's balance.
Of course, this requires that the predicted fee for the send transaction be deducted from the ETH balance being sent.
You **MUST** deduct both the L2 execution fee and the L1 data fee or the charged fee plus the balance sent will exceed the user's balance and the transaction will fail.

