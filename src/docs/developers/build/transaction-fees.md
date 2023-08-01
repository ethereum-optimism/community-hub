---
title: Transaction fees on OP Mainnet
lang: en-US
---

Transaction fees on OP Mainnet work a lot like fees on Ethereum.
However, Layer 2 introduces some new paradigms that means it can never be exactly like Ethereum.
Luckily, OP Mainnet's [EVM equivalence](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306) makes these differences easy to understand and even easier to handle within your app.

This page includes the formula for calculating the gas cost of transactions on OP Mainnet.
You can [use our SDK](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas) to calculate those costs for you. If the SDK is too heavy, or you just want to walk through some reference code, use [@eth-optimism/fee-estimation](https://github.com/ethereum-optimism/optimism/tree/develop/packages/fee-estimation). OP Stack fee estimation will soon be natively availabe in your favorite Ethereum tools.

There are two costs for transaction on OP Mainnet: the L2 execution fee and the L1 data/security fee.

## The L2 execution fee

Just like on Ethereum, transactions on OP Mainnet have to pay **gas** for the amount of computation and storage that they use.
Every L2 transaction will pay some **execution fee**, equal to the amount of gas used by the transaction multiplied by the gas price attached to the transaction.
This is exactly how fees work on Ethereum with the added bonus that gas prices on OP Mainnet are seriously low.

Here's the (simple) math:

```
transaction_gas_price = l2_base_fee + l2_priority_fee
l2_execution_fee = transaction_gas_price * l2_gas_used
```

The amount of L2 gas used depends on the particular transaction that you're trying to send.
Thanks to [EVM equivalence](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306), transactions typically use approximately the same amount of gas on OP Mainnet as they do on Ethereum.
Gas prices fluctuate with time and congestion, but you can always check the current estimated L2 gas price on the [public OP Mainnet dashboard](https://optimism.io/gas-tracker).



### Base fee

The [base fee](https://eips.ethereum.org/EIPS/eip-1559#simple-summary) is charged for each unit of gas that a transaction uses.
It is the same base fee for each transaction in the block, and is determined by formula based on the base fee of the previous block and how full that block was.


[The EIP-1559 parameters](./differences.md#eip-1559) have different values in OP Mainnet (and most other OP Stack chain) than those on L1 Ethereum.
As a result, in every block the base fee can be between 98% and 110% of the previous value. 

::: info Base fee volatility

As blocks are produced every two seconds, the base fee can be between 54% and 1,745% of the value a minute earlier.
If it takes the user fourteen seconds to approve the transaction in the wallet, the base fee can almost double in that time.

:::

The base fee specified in the transaction (`max_gas_fee - max_priority_fee`) is not necessarily the base fee that the user will pay, *it is merely an upper limit to that amount*.
In most cases, it makes sense to specify a much higher base fee than the current value, to ensure acceptance. 

For example, as I'm writing this, ETH is about $2000, and a cent is about 5000 gwei. 
Assuming 20% of a cent is an acceptable base fee for a transaction, and that the transaction is a big 5,000,000 gas one (at the target block size), this gives us a base fee of 200,000 wei. 
That plus a reasonable priority fee would be the value to put in the transaction as max gas fee, even though the L2 base fee (as I'm writing this) is 2,420 wei. 

You can get the current L2 base fee [in the gas tracker dashboard](https://optimism.io/gas-tracker).



### Priority fee

In contrast to the base fee, the priority fee in the transaction is the amount that the user pays, and therefore it makes sense to keep it as low as possible.
To enable your users to select a priority fee, you can [build a priority fee estimator](https://docs.alchemy.com/docs/how-to-build-a-gas-fee-estimator-using-eip-1559).
If you already have estimating code you use for L1 Ethereum, you can just use that.


## The L1 data fee

OP Mainnet differs from Ethereum because all transactions on OP Mainnet are also published to Ethereum.
This step is crucial to the security properties of OP Mainnet because it means that all of the data you need to sync an OP Mainnet node is always publicly available on Ethereum.
It's what makes OP Mainnet an L2.

Users on OP Mainnet have to pay for the cost of submitting their transactions to Ethereum.
We call this the **L1 data fee**, and it's the primary discrepancy between OP Mainnet (and other L2s) and Ethereum.
Because the cost of gas is so expensive on Ethereum, the L1 data fee typically dominates the total cost of a transaction on OP Mainnet.
This fee is based on four factors:

1. The current gas price on Ethereum.
2. The gas cost to publish the transaction to Ethereum. This scales roughly with the size of the transaction (in bytes).
3. A fixed overhead cost denominated in gas. This is currently set to 188.
4. A dynamic overhead cost which scales the L1 fee paid by a fixed number. This is currently set to 0.684.

Here's the math:

```
l1_data_fee = l1_gas_price * (tx_data_gas + fixed_overhead) * dynamic_overhead
```

Where `tx_data_gas` is:

```
tx_data_gas = count_zero_bytes(tx_data) * 4 + count_non_zero_bytes(tx_data) * 16
```

You can read the parameter values from the [gas oracle contract](https://explorer.optimism.io/address/0x420000000000000000000000000000000000000F#readContract).

::: warning NOTE
Ethereum has limited support for adding custom transaction types.
As a result, unlike the L2 execution fee, **users are not able to set limits for the L1 data fee that they may be charged**.
The L1 gas price used to charge the data fee is automatically updated when new data is received from Ethereum.
**Spikes in Ethereum gas prices may result in users paying a higher or lower than estimated L1 data fee, by up to 25%.**

[See here for a detailed explanation why the difference is capped at 25%](https://help.optimism.io/hc/en-us/articles/4416677738907-What-happens-if-the-L1-gas-price-spikes-while-a-transaction-is-in-process).
:::


## Transaction fees' effect on software development

### Sending transactions

The process of sending a transaction on OP Mainnet is identical to the process of sending a transaction on Ethereum.
When sending a transaction, you should provide a gas price greater than or equal to the current L2 gas price, or use [transaction type 2](https://www.educative.io/answers/type-0-vs-type-2-ethereum-transactions) and a priority fee that is within the same range as the transactions included in the latest block.
Similarly, you should set your transaction gas limit in the same way that you would set your transaction gas limit on Ethereum (e.g. via `eth_estimateGas`).


### Displaying fees to users

Many Ethereum applications display estimated fees to users by multiplying the gas price by the gas limit.
However, as discussed earlier, users on OP Mainnet are charged both an L2 execution fee and an L1 data fee.
As a result, you should display the sum of both of these fees to give users the most accurate estimate of the total cost of a transaction.

[See here for a code sample using the JavaScript SDK](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas)

#### Estimating the L2 execution fee

You can estimate the L2 execution fee by multiplying the gas price by the gas limit, just like on Ethereum.

#### Estimating the L1 data fee

You can use the SDK [(see here)](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas).
Alternatively, you can estimate the L1 data fee using the `GasPriceOracle` predeployed smart contract located at [`0x420000000000000000000000000000000000000F`](https://explorer.optimism.io/address/0x420000000000000000000000000000000000000F).
[The `GasPriceOracle` contract](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/predeploys/OVM_GasPriceOracle.sol) is located at the same address on every Optimism network (mainnet and testnet).
To do so, call `GasPriceOracle.getL1Fee(<unsigned RLP encoded transaction>)`.

#### Estimating the total fee

You can estimate the total fee by combining your estimates for the L2 execution fee and L1 data fee.

### Sending max ETH

Sending the maximum amount of ETH that a user has in their wallet is a relatively common use case.
When doing this, you will need to subtract the estimated L2 execution fee and the estimated L1 data fee from the amount of ETH you want the user to send.
Use the logic described above for estimating the total fee.

## Additional RPC Errors

### Insufficient funds

- Error code: `-32000`
- Error message: `invalid transaction: insufficient funds for l1Fee + l2Fee + value`

You'll get this error when attempting to send a transaction and you don't have enough ETH to pay for the value of the transaction, the L2 execution fee, and the L1 data fee.
You might get this error when attempting to send max ETH if you aren't properly accounting for both the L2 execution fee and the L1 data fee.
