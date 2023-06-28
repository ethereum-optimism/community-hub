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



## Transaction fees

In OP Mainnet transaction fees include both an [L1 data fee](../build/transaction-fees.md#estimating-the-l1-data-fee) and an [L2 execution fee](../build/transaction-fees.md#the-l2-execution-fee). 
To display the entire estimated cost of a transaction to your users we recommend you [use the SDK](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas).
We **highly recommend** displaying fees on OP Mainnet as one unified fee to minimize user confusion.


In Bedrock we support [EIP 1559](https://eips.ethereum.org/EIPS/eip-1559).
Therefore, the L2 execution fee is composed of two components: a fixed (per-block) base fee and a user selected priority fee.


### Base fee

[The EIP 1559 parameters](./differences.md#eip-1559) have different values in OP Mainnet than those on L1 Ethereum.
As a result, in every block the base fee can be between 98% and 110% of the previous value. 
As blocks are produced every two seconds, the base fee can be between 54% and 1,745% of the value a minute earlier.
If it takes the user fourteen seconds to approve the transaction in the wallet, the base fee can almost double in that time.

The base fee specified in the transaction is not necessarily the base fee that the user will pay, *it is merely an upper limit to that amount*.
In most cases, it makes sense to specify a much higher base fee than the current value, to ensure acceptance. 
For example, as I'm writing this, ETH is about $2000, and a cent is about 5000 gwei. 
Assuming 20% of a cent is an acceptable base fee for a transaction, and that the transaction is a big 5,000,000 gas one (at the target block size), this gives us a base fee of 200,000 wei. 
That would be the value to put in the transaction, even though the L2 base fee (as I'm writing this) is 2,420 wei. 

::: info Up to date information

You can get the current L2 base fee [in the gas tracker dashboard](https://optimism.io/gas-tracker).

:::


### Priority fee

In contrast to the base fee, the priority fee in the transaction is the amount that the user pays, and therefore it makes sense to keep it as low as possible.
To enable your users to select a priority fee, you can [build a priority fee estimator](https://docs.alchemy.com/docs/how-to-build-a-gas-fee-estimator-using-eip-1559).
If you already have estimating code you use for L1 Ethereum, you can just use that.

Note that on OP Mainnet the priority fee tends to be very low. 
As I am writing this, a priority fee of 500 wei is sufficient ([see here](https://optimism.io/gas-tracker) to get the current values).



### Sending "max" ETH

Many wallets allow users to send the maximum amount of ETH available in the user's balance.
Of course, this requires that the predicted fee for the send transaction be deducted from the ETH balance being sent.
You **MUST** deduct both the L2 execution fee and the L1 data fee or the charged fee plus the balance sent will exceed the user's balance and the transaction will fail.

### Displaying the gas prices

If you want to display the current gas prices, you can use [`eth_gasPrice`](https://docs.alchemy.com/reference/eth-gasprice).