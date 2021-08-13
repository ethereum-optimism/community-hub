---
title: Gas Costs on L2
lang: en-US
---

# {{ $frontmatter.title }}

::: warning NOTICE
This page documents the current status of the Optimistic Ethereum protocol, and the details here are subject to change based on feedback.
:::

Optimistic Ethereum is a lot cheaper than regular Ethereum but transaction fees do still exist.
Here we'll cover what those fees are for, how to estimate them, and how to present them to your users.

We recommend that you first read the [user's guide to transaction fees](/docs/users/fees.md).

## Transaction fees on L1

In [Ethereum](https://ethereum.org/en/developers/docs/gas/#why-do-gas-fees-exist) the cost of a transaction is determined by two factors:

1. Gas limit: the maximum amount of gas that the transaction can use.
1. Gas price: the cost (in wei) of each unit of gas spent. Users can modify this value to trade off between speed and cost.

The total cost of a transaction on L1 is:

```
total_cost = gas_price * gas_used
```

Where:

```
gas_used <= gas_limit
```

## Transaction fees on L2

The gas calculations in Optimistic Ethereum are a little more complicated.
Most of this complexity arises out of the need to account for both execution cost (the way we normally think about gas) and the cost to store transaction data on L1 in the form of calldata.

### Fees for Sequencer transactions

#### What you actually need to know

You probably don't actually need to know much about how any of this works under the hood.
The only thing you absolutely *must* keep in mind is that:
1. You should always use the gas price suggested by `eth_gasPrice`.
2. You should always use the gas limit suggested by `eth_estimateGas`.

#### Under the hood

For transactions sent directly to the Sequencer, the cost of a transaction is determined by two cost centers:

1. **Data cost**, the cost of storing the transaction's data on L1. The majority of the cost of a transaction comes from this factor.
2. **Execution cost**, the cost of the actual execution on Optimistic Ethereum nodes. This cost is typically very low, but it could increase when Optimistic Ethereum is congested.

Ultimately, the cost of a transaction is computed by the following formula:

```text
total_cost = (tx_size * data_price) + (execution_gas_limit * execution_price)
```

Where:

* `tx_size` is the size (in bytes) of the serialized transaction that will be published to Layer 1.
* `data_price` is a variable that reflects the current cost of publishing data to Layer 1.
* `execution_gas_limit` is the amount of gas that the transaction can use.
* `execution_price` is the cost (in wei) per unit gas allotted (much like `gas_price` on L1).


::: tip
In Optimistic Ethereum the cost of a transaction is always
`tx.gasLimit*tx.gasPrice`, in contrast to L1 where it can be lower.
:::

#### Encoding Sequencer transaction costs

Problems arise because we need to fit these four parameters into an interface that's only designed to handle two (`gas_price` and `gas_limit`).
We essentially have two choices here: we can either (1) modify the Ethereum transaction format to support these additional fields or (2) somehow encode these values into the existing format.
Option (1) requires significant effort on the part of wallet software, so we've chosen to go for option (2) for now.

We manage to encode these values into the `gas_limit` field as follows:

1. First, we set the `gas_price` to a **fixed** value of 0.015 gwei.
2. Next, when you call `eth_estimateGas`, the L2 node computes:

```text
              (transaction_size_in_bytes * data_price) + (execution_gas_limit * execution_price)
gas_limit  =  ----------------------------------------------------------------------------------
                                                    gas_price
```

You can do some math to work backwards from this formula to get original values out, which is how the fees actually get paid during the L2 transaction.

#### Estimating gas costs in JavaScript

You can use the standard mechanisms, `estimateGas` 
on the function and `getGasPrice` on the provider, to get the actual
cost.

```javascript
    contract = new ethers.Contract("0x614df14f1ef98aEe7c9926571421D9cb141F8B45",
                                   greeterContractData.abi, L2Wallet)
```

The [Hardhat Greeter test contract](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-core/sample-project/contracts) is installed on 
address 0x614df14f1ef98aEe7c9926571421D9cb141F8B45 on Optimistic Kovan.

```javascript
    const newGreeting = "Hola mundo"

    const gasEstimate = await contract.estimateGas.setGreeting(newGreeting)
    const gasPrice = await L2Wallet.provider.getGasPrice()
```

This is the standard way to get the cost of a transaction before it actually
happens. On L1 this is a maximum, but on Optimistic Ethereum `gasEstimate*gasPrice`
is the actual cost being charged.

```javascript
    const oldBalance = await L2Wallet.getBalance()
    const tx = await contract.setGreeting(newGreeting)
    await tx.wait()
    const newBalance = await L2Wallet.getBalance()    
    const cost = oldBalance - newBalance
```

This code runs the transaction and gets the actual cost.

```javascript
    console.log(`(1) gas estimate:                 ${gasEstimate.toString()}`)
    console.log(`(2) gas limit in the transaction: ${tx.gasLimit.toString()}`)
    console.log(`(3) transaction cost: ${cost.toString()} wei`)
    console.log(`  (4) corresponding to:           ${(cost/gasPrice).toString()} gas`)
    console.log(`  (5) gas price: ${gasPrice.toString()}`)  
```

When you run this code you see that the gas estimate (1), the gas limit in the 
transaction (2) and the gas amount (4) are the same.


### Fees for L1 to L2 transactions

For an L1 to L2 transaction you only pay the L1 cost of submitting the transaction.
You send a transaction to the [`OVM_L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/messaging/OVM_L1CrossDomainMessenger.sol)
contract, which then sends a call to the [`OVM_CanonicalTransactionChain`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol).
This generally isn't *too* expensive, but it mainly depends on L1 congestion.

### Fees for L2 to L1 transactions

Each message from L2 to L1 requires two transactions:

1. An L2 transaction that *initiates* the transaction, which is priced the same way that Sequencer transactions are priced.
1. An L1 transaction that *finalizes* the transaction. This transaction is somewhat expensive because it includes [verifying](https://github.com/ethereum-optimism/optimism/blob/467d6cb6a4a35f2f8c3ea4cfa4babc619bafe7d2/packages/contracts/contracts/optimistic-ethereum/libraries/trie/Lib_MerkleTrie.sol#L73-L93) a [Merkle trie](https://eth.wiki/fundamentals/patricia-tree) inclusion proof.

The total cost of an L2 to L1 transaction is therefore the combined cost of the L2 initialization transaction and the L1 finalization transaction.
