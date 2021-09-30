---
title: Gas Costs on L2
lang: en-US
---

::: tip OVM 2.0 Release Dates
OVM 2.0 will be released October 14th on the Kovan test network,
and October 28th into the production Optimistic Ethereum network.
:::

# {{ $frontmatter.title }}

::: danger OVM 1.0 Page
This page refers to the **current** state of the Optimistic Ethereum
network. Some of the information may be relevant to OVM 2.0, which will
be deployed in October, but some of it may change.
:::

Optimistic Ethereum is a lot cheaper than regular Ethereum but transaction fees do still exist.
Here we'll cover what those fees are for, how to estimate them, and how to present them to your users.


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
total_cost = ((tx_size * d_price) + (exec_gas * exec_price))
```

Where:

* `tx_size` is the size (in bytes) of the serialized transaction that will be
  published to Layer 1.
* `d_price` is a variable that reflects the current cost of publishing data 
   to Layer 1.
* `exec_gas` is the amount of gas that the transaction can use.
* `exec_price` is the cost (in wei) per unit gas allotted (much like
  `gas_price` on L1).


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
              (tx_size * d_price) + (exec_gas * exec_price)
gas_limit  =  ---------------------------------------------
                                gas_price
```

You can do some math to work backwards from this formula to get original values out, which is how the fees actually get paid during the L2 transaction.


#### Estimating gas costs in JavaScript

You can use the standard mechanisms, `estimateGas` 
on the function and `getGasPrice` on the provider, to get the actual
cost.

The [Hardhat Greeter test contract](https://github.com/nomiclabs/hardhat/blob/master/packages/hardhat-core/sample-projects/basic/contracts/Greeter.sol) is installed on 
address `0x614df14f1ef98aEe7c9926571421D9cb141F8B45` on Optimistic Kovan.

```javascript
    contract = new ethers.Contract("0x614df14f1ef98aEe7c9926571421D9cb141F8B45",
                                   greeterContractData.abi, L2Wallet)
```

This is the standard way to get the cost of a transaction before it actually
happens. On L1 this is a maximum, but on Optimistic Ethereum `gasEstimate*gasPrice`
is the actual cost being charged.

```javascript
    const newGreeting = "Hola mundo"

    const gasEstimate = await contract.estimateGas.setGreeting(newGreeting)
    const gasPrice = await L2Wallet.provider.getGasPrice()
```

This code runs the transaction and gets the actual cost.

```javascript
    const oldBalance = await L2Wallet.getBalance()
    const tx = await contract.setGreeting(newGreeting)
    await tx.wait()
    const newBalance = await L2Wallet.getBalance()    
    const cost = oldBalance - newBalance
```

When you run this code you see that the gas estimate (1), the gas limit in the 
transaction (2) and the gas amount (4) are the same.


```javascript
    console.log(`(1) gas estimate:                 ${gasEstimate.toString()}`)
    console.log(`(2) gas limit in the transaction: ${tx.gasLimit.toString()}`)
    console.log(`(3) transaction cost:             ${cost.toString()} wei`)
    console.log(`(4) the cost corresponds to:      ${(cost/gasPrice).toString()} gas`)
    console.log(`(5) gas price:                    ${gasPrice.toString()} wei/gas`)  
```


<!--

#### Estimating costs locally

Sometimes it is advantageous to run the gas estimate locally instead of asking
a network node. For example, you might want to run a what-if scenario if the
L1 gas price goes up or down, or if a transaction that fails in the current
state were successful.

To do this, we provide the Javascript package 
[`@eth-optimism/core-utils`](https://www.npmjs.com/package/@eth-optimism/core-utils). Here is sample code that uses it:

We need a contract instance to get the transaction data, but it doesn't
actually need to be connected to a contract on an Ethereum network, so
it's OK to give a dummy address and not have a provider or wallet.

```javascript
    contract = new ethers.Contract("0x0000000000000000000000000000000000000000", 
          greeterContractData.abi)
```

[`populateTransaction`](https://docs.ethers.io/v5/api/contract/contract/#contract-populateTransaction) allows us to create the transaction
that we'd normally send to run a function.

```javascript
    const newGreeting = "Hola mundo"
    let tx = await contract.populateTransaction.setGreeting(newGreeting)
```

The L1 and L2 gas prices are available through [our RPC 
interface](/docs/developers/l2/rpc.html#rollup-gasprices). For the L1
gas price you can also use [`getGasPrice`](https://docs.ethers.io/v5/api/providers/provider/#Provider-getGasPrice).
 

```javascript
    const encoded = coreUtils.TxGasLimit.encode({
        l1GasPrice: l1GasPrice,
        l2GasPrice: l2GasPrice,
```

An estimate of how much gas the transaction will take. 

```javascript                
        l2GasLimit: l2GasLimit,
```

Most fields in a transaction are fixed length and we don't need their values
to figure the storage cost. The exception is the transaction's calldata, which we 
take from `populateTransaction`.

```javascript
        data: tx.data,
    })
```

The `gasLimit` we need to provide is the `encoded` value. That, times 
`0.015 gwei`, is the cost of the transaction.

```javascript
    console.log(`coreUtils gasLimit: ${encoded}`)
```


-->

<!--
#### How much does L2 gas cost?

L2 gas is purchased in units of 10,000 gas. The last four digits of 
`gasLimit` are the number of units purchased. At writing `1 ETH ≈ $3000`,
so these digits can add at most `10,000 * 0.015 gwei * 3000 / 10^9` to the
transaction cost. This works out to `0.045 ¢`, a negligible cost.
 
At writing `l2GasPrice` on the Optimistic Ethereum is a million. Every 10^5 
gas adds 10,000 to `gasLimit` (for other gas prices 
it should also be every `10^11 / l2GasPrice` gas). In other words, 10 gas units
cost 0.015 gwei. 

On L1 a gas unit typically costs over twenty gwei 
([click here for a graph](https://ycharts.com/indicators/ethereum_average_gas_price)). This means that ten thousand units of L2
gas cost are cheaper than one unit of L1 gas.

At present prices a cent buys you approximately 2.2 million L2 gas. 

::: warning Congestion Pricing
The `l2GasPrice` is normally a million, but it could rise at times of
high congestion.
:::

-->

### Fees for L1 to L2 transactions

For an L1 to L2 transaction you only pay the L1 cost of submitting the transaction.
You send a transaction to the [`OVM_L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/messaging/OVM_L1CrossDomainMessenger.sol)
contract, which then sends a call to the [`OVM_CanonicalTransactionChain`](https://github.com/ethereum-optimism/optimism/blob/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol).
This generally isn't *too* expensive, but it mainly depends on L1 congestion.

### Fees for L2 to L1 transactions

Each message from L2 to L1 requires two transactions:

1. An L2 transaction that *initiates* the transaction, which is priced the same way that Sequencer transactions are priced.
1. An L1 transaction that *finalizes* the transaction. This transaction is somewhat expensive because it includes [verifying](https://github.com/ethereum-optimism/optimism/blob/467d6cb6a4a35f2f8c3ea4cfa4babc619bafe7d2/packages/contracts/contracts/optimistic-ethereum/libraries/trie/Lib_MerkleTrie.sol#L73-L93) a [Merkle trie](https://eth.wiki/fundamentals/patricia-tree) inclusion proof.

The total cost of an L2 to L1 transaction is therefore the combined cost of the L2 initialization transaction and the L1 finalization transaction.
