# Transaction Fees

Transaction fees on Optimistic Ethereum are handled a little differently than on Ethereum.
Your end-users won't notice any difference, but you might be interested to understand exactly where fees come from and how they're computed.

Users will be taking three primary actions when interacting with Optimistic Ethereum:

1. L2 transactions
2. L1 ⇒ L2 transactions
3. L2 ⇒ L1 transactions

On this page we'll explain the costs related to each of these actions.

## Fees for L2 transactions

Just like on Ethereum, fees on Optimistic Ethereum are denominated in ETH.
The formula for gas cost on Ethereum is:

```text
fee = transaction.gasPrice * gasUsed
```

However, the formula for gas cost on Optimistic Ethereum is:

```text
fee = transaction.gasPrice * transaction.gasLimit (⇐ this part is different)
```

The exact reason for this difference is a little hard to explain.
In a nutshell, it has to do with the fact that **the majority of the cost of running a Layer 2 system comes from the gas cost of publishing transaction data to Layer 1**.

Practically speaking, **this shouldn't have much of an impact on the user experience**.
You should still use `eth_gasPrice` to figure out the appropriate gas price and `eth_estimateGas` to find an appropriate gas limit.

Please note that:

* If you supply a `transaction.gasPrice` less than 1 Gwei, your transaction will be rejected.
* If you supply a `transaction.gasLimit` less than the value returned by `eth_estimateGas`, your transaction will be rejected.

### Understanding our gas estimation method

As a developer, it's important to know that `eth_estimateGas` returns:

```text
estimate = (rollupTransactionSize * dataPrice) + (gasUsed * executionPrice)
```

Where:

* `rollupTransactionSize` is the size (in bytes) of the serialized transaction that will be published to Layer 1.
* `dataPrice` is a variable that reflects the current cost of publishing data to Layer 1.
* `gasUsed` is the standard result of `eth_estimateGas` for a transaction.
* `executionPrice` is a variable that reflects the current congestion level on Layer 2, much like the `gasPrice` on Layer 1.

## Fees for L1 ⇒ L2 transactions

When you create L1 ⇒ L2 transactions, you'll *only* have to pay for the standard Ethereum gas costs associated with the transaction.
Concretely, this means sending a transaction to the [`OVM_L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/messaging/OVM_L1CrossDomainMessenger.sol) which then makes a call to the [`OVM_CanonicalTransactionChain`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol).

We're [working hard](https://github.com/ethereum-optimism/optimism/pull/667) to minimize the amount of gas used by this sort of transaction.
We're currently down to about ~75k gas for an L1 ⇒ L2 transaction.
Depending on current L1 congestion levels and the current ETH price, the USD-denominated cost of this sort of transaction can be anywhere from about ~$15 to about ~$75.

Furthermore, your mileage will vary depending on any additional contract logic you perform before you execute the L1 ⇒ L2 transaction.
For example, [this deposit of 200 SNX via the Synthetix L2 Bridge](https://etherscan.io/tx/0xbc86558426c2c62fd49a57b830182b37c9e71646e1ba12aebf71b356253e785c) cost about ~$78 USD.

## Fees for L2 ⇒ L1 transactions

L2 ⇒ L1 transactions tend to be a little more expensive than their L1 ⇒ L2 counterparts because you'll need to make a transaction on both L2 *and* L1.

Every L2 ⇒ L1 transaction consists of:

1. An L2 transaction that *initiates* the transaction.
2. An L1 transaction that *finalizes* the transaction.

The cost of the L2 initialization transaction is determined in the same way as any other L2 transaction (see above for more info).
The cost of the L1 finaliztion transaction again depends on the current L1 congestion level and the ETH price.
In terms of gas, finalization transactions can currently cost upwards of 4-500k gas because they involve [verifying](https://github.com/ethereum-optimism/optimism/blob/467d6cb6a4a35f2f8c3ea4cfa4babc619bafe7d2/packages/contracts/contracts/optimistic-ethereum/libraries/trie/Lib_MerkleTrie.sol#L73-L93) a [Merkle trie](https://eth.wiki/fundamentals/patricia-tree) inclusion proof.
We're working to decrease this gas cost by making various optimizations that would reduce the number of proof steps required to successfully verify these L2 ⇒ L1 transactions.

For some concrete numbers, check out this [example transaction finalizing a withdrawal of SNX](https://etherscan.io/tx/0x1f6601e918572668d40405c1cefb9af96bab430f46f9dde78d82e253e33e4904) which used ~500k gas for a total cost of ~$50.

::: tip On withdrawal subsidies
We've been subsidizing L2 ⇒ L1 transactions and processing them on your behalf for the last few months.
However, **you'll soon need to start finalizing these transactions on your own**.
We'll provide you with all the necessary tools to do this.
:::
