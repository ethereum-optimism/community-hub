---
title: Wallet upgrade guide
lang: en-US
---

The Bedrock release introduces a few changes that affect wallets.

- Some of the JSON RPC methods have changed.
- A transaction can now be in one of three statuses.
- Transaction fees have to acount for EIP 1559 support. 


## JSON RPC

These methods have been removed:

- `eth_getBlockRange`: Use `eth_getBlockByNumber` in a batch request instead.
- `rollup_getInfo`: None of the information returned by this method exists on Bedrock, so there is no replacement for this method.
- `rollup_gasPrices`: Use [`eth_gasPrice`](https://docs.alchemy.com/reference/eth-gasprice) instead for the L2 gas price. 
  For the L1 gas price, you can call the [`GasPriceOracle`'s `l1BaseFee` function](https://optimistic.etherscan.io/address/0x420000000000000000000000000000000000000F#readContract#F5).
  If you want to estimate the cost of a transaction, you can [use the SDK](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas).


## Transaction status

We use the same vocabulary as the Beacon Chain to describe block finality. 
Blocks (and the transactions within them) can be in one of the following states:

- `unsafe`, meaning that the block has been received via gossip but has not yet been submitted to L1. Unsafe blocks can be reorged if L1 reorgs, or the sequencer reorgs.
- `safe`, meaning that the block has been submitted to L1. Safe blocks can also be reorged if L1 reorgs.
- `finalized`, meaning that the block has reached sufficient depth to be considered final. Finalized blocks cannot be reorged.

To get the status of a specific block, use [`eth_getBlockByNumber`](https://docs.alchemy.com/reference/eth-getblockbynumber) with the "block number" `finalized`.
If the last finalized block is the same or greater than the block with the transaction whose status you need, then it is finalized.
If not, use [`eth_getBlockByNumber`](https://docs.alchemy.com/reference/eth-getblockbynumber) with the "block number" `safe`. If that block is the same or after the one with the transaction, then it is `safe` (highly unlikely to be reorganized, but it could happen). Otherwise, it is `unsafe`.


## Transaction fees

In OP Mainnet (and most other OP Stack chain) transaction fees include both an [L1 data fee](../build/transaction-fees.md#estimating-the-l1-data-fee) and an [L2 execution fee](../build/transaction-fees.md#the-l2-execution-fee). 
To display the entire estimated cost of a transaction to your users we recommend you [use the SDK](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas). 

In Bedrock we support [EIP 1559](https://eips.ethereum.org/EIPS/eip-1559).
Therefore, the L2 execution fee is composed of two components: a fixed (per-block) base fee and a user selected priority fee.


### Base fee

[The EIP 1559 parameters](./differences.md#eip-1559) have different values in OP Mainnet (and most other OP Stack chain) than those on L1 Ethereum.
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




