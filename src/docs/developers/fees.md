# Transaction Fees

## Introduction

This document is for users of Optimistic Ethereum (OE), including developers and general end-users that seek to learn more about how _fees_ work in OE.
We hope that the content here can serve as a reference for understanding most of what you need to know about fees in OE.

## Overview

We'll be primarily covering gas costs and savings experienced in _and_ around OE when you:

1. Transact on L2
2. Initiate an L1 Deposit
3. Complete a withdrawal (i.e., L2 → L1)

We'll also cover how gas costs are calculated and what parameters to optimize for to ensure that your contract deployments and transactions don't consume too much gas on L2.

::: tip L2 == OE, L1 == Ethereum
For the rest of this document, whenever we refer to L2, unless otherwise stated, we mean Optimistic Ethereum. Similarly, whenever we refer to L1, we mean the Ethereum mainnet.
:::

So, let's learn about gas in OE!

## 💵 1. Transacting on L2

### How are fees calculated on L2?

Gas fees on L2 are charged in ETH (remember, [L2 ETH is not the same as ETH on L1](../protocol/evm-comparison.html#native-weth))

However, **the gas fee payment itself is equal to to your `gasLimit * gasPrice`**, a calculation that is slightly different from L1 where the fee you are charged is based on `gasUsed`.
Due to this slight difference, **we recommend using `eth_estimateGas` to calculate your `gasLimit`.**
This is because `gasPrice` is a constant value of `1 Gwei`, so your focus should be on optimizing the `gasLimit`.

The definitions for these values are:

* `gasUsed` must always be under 9 million per transaction.
* `gasPrice` is fixed as a constant (it is initially set to `1 Gwei`).
* `gasUsed` is always equal to the `gasLimit` (since 100% of gas is always used).
* `executionGasUsed` is added as a new field in the transaction receipt.

Lastly for this section:

1. You should never reduce your `eth_gasPrice` below the initial value of `1 Gwei` or your transaction will simply get rejected on L2, and
2. Never drop your `gasLimit` below the value returned by `eth_estimateGas` `gasLimit`, or your transaction might revert.

### 👩‍💻 Transactions for developers

As a developer, it's important to know that `eth_estimateGas` returns:

```
rollupTxSize * dataPrice + executionPrice * gasUsed
```

where

* `rollupTxSize` is the size, in _bytes_, of the serialized rollup transactions if it were published on L1
* `dataPrice` is a value set by the sequencer based on the current L1 congestion
* `executionPrice` is fetched via the standard `eth_gasPrice` rules that geth uses based on the current L2 congestion, and
* `gasUsed` (NOTE: this the _expected_ gas to be used at the time `eth_estimateGas` is called) is the standard result of `eth_estimateGas` for a transaction.

(See [ethereum-optimism/go-ethereum/pull/273](https://github.com/ethereum-optimism/go-ethereum/pull/273) for more info on these variables.)

You can think of `rollupTxSize * dataPrice` as the L1 costs of Optimistic Ethereum.
These L1 costs are the only costs that Optimistic Ethereum incurs.
Additionally, you can think of `executionPrice * gasUsed` as the L2 costs which are paid to the L2 network.
It's also important to note that L2 congestion is _not_ correlated to L1 congestion, which means that the `executionPrice` and `dataPrice` are independently by the demand for their respective network.

**To minimize gas costs for users, we recommend minimizing your `rollupTxSize`.**
For example, you can reduce your `uint256` values to `uint32` variables wherever possible in your transaction inputs.
By reducing the size of your input variables, you will likely cut costs to reduce your `rollupTxSize` in exchange for increasing the amount of `gasUsed` for your transaction.

From these gas estimation variables, this means that the majority of transaction costs _until L2 becomes congested_ will be equal to `rollupTxSize * dataPrice`.

#### How is `executionPrice` calculated?

Here, [`executionPrice` is equal to the gasPrice returned by `SuggestPrice`](https://github.com/ethereum-optimism/go-ethereum/blob/master/internal/ethapi/api.go#L1022-L1028) (you can find the source for `SuggestPrice` [here](https://github.com/ethereum-optimism/go-ethereum/blob/930c9f1381bb304496b036bab8f51899d1e63c71/eth/gasprice/gasprice.go#L76-L148)) in L2 `geth`.This means that the `executionPrice == gasPrice == 1`

**Additionally, you can expect the `executionPrice` to be fairly minimal, unless L2 becomes congested.**

### What is the gas limit on L2?

**There is a per transaction gas limit of 9 million on L2 and when you compile your contracts for L2, gas usage can increase by more than 5x**.

So, if your transaction consumes more than 1.5 million gas on L1, you should really be mindful of the amount of gas it consumes on L2.

## 🏦 2. Initiating an L1 Deposit

The most immediate thing you'll likely want to do is deposit ether (ETH) to L2 so that you can interact with contracts and applications while on L2.
(Note, [ETH on L2 is actually WETH](../protocol/evm-comparison.html#native-weth), but we abstract this away for you 🙂.)
Currently, the only way to do this is to initiate a deposit from L1 to L2.

### What can you expect to pay in gas costs when depositing from L1 to L2?

While your _real_ gas costs on OE will vary (depending on several factors like network demand or network congestion of the OE network, etc.), we can provide a _best estimate_ for what your expected costs will be.

First, let's see what the gas cost is for depositing SNX to L2.
[Open up this transaction on Etherscan](https://etherscan.io/tx/0xbc86558426c2c62fd49a57b830182b37c9e71646e1ba12aebf71b356253e785c).

If we look at the `Transaction Action`, we see a deposit was made for roughly `212.35 SNX` to the Synthetix L2 Bridge. Although this field gives us an easy look at the gas cost, _**it's very important to remember that gas costs (i.e. transaction fees) are dependent on the changing gas price and gas used by the transaction!**_
What this means is that you should really be mindful of the `Gas Price` in Gwei and the `Gas Used by Transaction` for your transactions.

Next, if we look at the `Transaction Fee`, we can see that **this sender paid roughly `$78.42` for an SNX deposit to L2, a gas cost that you would expect for a somewhat complex L1 transaction.**

### 💸 What is the main cost of a deposit?

The main cost of a deposit comes from sending an L2 message to L1 via a call to the [`sendMessage`](https://github.com/ethereum-optimism/contracts/blob/master/contracts/optimistic-ethereum/OVM/bridge/messaging/Abs_BaseCrossDomainMessenger.sol#L51-L77) method.
In Synthetix's `SynthetixBridgeToOptimism.sol` contract, under the [`_initiateDeposit`](https://github.com/Synthetixio/synthetix/blob/develop/contracts/SynthetixBridgeToOptimism.sol#L199-L203) function, we see `sendMessage` being called to send a message to L1 (from L2) for an L2 deposit of SNX.
Note that the third argument of `sendMessage` takes a value for `_gasLimit`.
In the `sendMessage` call, we see that this `_gasLimit` value is obtained by [getting the `Deposit` gas limit from the global `CrossDomainMessageGasLimits` object](https://github.com/Synthetixio/synthetix/blob/develop/contracts/SynthetixBridgeToOptimism.sol#L202).
Afterwards, the [`messenger`](https://github.com/Synthetixio/synthetix/blob/develop/contracts/SynthetixBridgeToOptimism.sol#L43-L45) calls `CanonicalTransactionChain.enqueue` with that [`_gasLimit` specified](https://github.com/ethereum-optimism/contracts/blob/master/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol#L282).

In [`CanonicalTransactionChain.enqueue`](https://github.com/ethereum-optimism/contracts/blob/master/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol#L250-L260), we can see [gasToConsume](https://github.com/ethereum-optimism/contracts/blob/c39fcc40aec235511a5a161c3e33a6d3bd24221c/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol#L282) is calculated from the the `_gasLimit` (that was specified for the transaction for an SNX deposit) divided by the `L2_GAS_DISCOUNT_DIVISOR`.
(This value is not too important: the gist of what you need to know about the divisor is that it is a manually set parameter.)

#### How do we calculate L2 gas consumed?

However, what _is_ important to know is that **`gasToConsume` is equal to the L1 gas that is burned.**
(If you're curious, you can read the `L2_GAS_DISCOUNT_DIVISOR` value from our Mainnet CanonicalTransactionChain (CTC) [here](https://etherscan.io/address/0xed2701f7135eab0D7ca02e6Ab634AD6CbE159Ffb#readContract).)

**Currently, the `L2_GAS_DISCOUNT_DIVISOR` is set to `32`.**
**So, if you need to send an L1 → L2 transaction with 9 million gas (the gas limit), you will burn `9m/32 = 281,250` L1 gas in this step of `CanonicalTransactionChain.enqueue`.**

#### How can we optimize the gas limit?

As a developer, you will want to have the minimum gas limit sent with your deposit.
Minimizing the deposit gas limit will minimize gas costs to your users.
For Synthetix, this minimum gas limit seems to be roughly 2 million gas.
Therefore, **we suggest that you find the minimum `_gasLimit` that will reliably result in successful deposits and _add a buffer_ (e.g. 1.5x the value of the gas limit), to ensure that users will not have their transactions reverted (and will get their tokens on the other side!).**

**NOTE: Even though we walked through expected costs for ETH transfers above, the same estimate can be used for other token deposits besides ETH as well.**

## 🏧 3. Completing an L2 → L1 Withdrawal

::: warning 7-day withdrawal window
As a general reminder, all L2 to L1 withdrawals have a 7-day delay before the withdrawn funds can be claimed.
:::

You'll probably want to know how much it will cost to move your assets out of L2.

Thankfully, initiating a withdrawal is just an approximation of the cost of any other L2 transaction.
[Here's another example from Synthetix.](https://etherscan.io/tx/0x1f6601e918572668d40405c1cefb9af96bab430f46f9dde78d82e253e33e4904)
This time, we're looking at a transaction that completes an SNX withdrawal on L1.
For this SNX withdrawal transaction, we have [`relayMessage`](https://github.com/ethereum-optimism/contracts/blob/master/contracts/optimistic-ethereum/iOVM/bridge/messaging/iOVM_L2CrossDomainMessenger.sol#L17-L30) execute the L2 message that was sent by `sendMessage` to L1 (the destination for this transaction) to complete the withdrawal on L1.
Similar to `sendMessage` in a deposit, it is the call to `relayMessage` that consumes the most gas in this withdrawal.

<!-- 

To make this calculation easy for you, we've included calculator to compute gas cost!

INSERT CALCULATOR HERE

Remove the following paragraph if using calculator
-->

<!-- 

In addition to using the calculator, we're including ticker for the gas price that you can use in your calculations.

INSERT GAS PRICE TICKER HERE (used for quickly knowing gas cost for withdrawals)

-->

**Here, the gas cost was roughly $33.65 for completing this L2 to L1 withdrawal of SNX.**

### 🤷‍♂️ Why is gas so expensive?

By now, you might be wondering why the gas cost for these withdrawals are so expensive ($33.65, or $52.11 at the price of April 6th, 2021, is expensive!).
The explanation comes from the expensive action of having to prove a merkle branch on L2 state. (For more information, you can see this process in the `_verifyStateRootProof` of [OVM_L1CrossDomainMessenger.sol](https://github.com/ethereum-optimism/contracts/blob/c39fcc40aec235511a5a161c3e33a6d3bd24221c/contracts/optimistic-ethereum/OVM/bridge/messaging/OVM_L1CrossDomainMessenger.sol#L201-L220))

### Are there any subsidies for withdrawals?

Currently, we're subsidizing the cost of running `relayMessage` for your withdrawals (🥳).
However, soon you'll have to claim your own withdrawals.

### Are there risks in making a withdrawal myself?

It's important to know that when you initiate a self-withdrawal, you will have to pay roughly 500k gas at the gas price at the end of the 7-day withdraw window.
That means that a self-withdrawal can be relayed at any time, so if gas prices shoot up a ton, you can wait for as long as you want (days, weeks, etc.) until you wish to claim and complete your withdrawal.

Lastly, note that the gas price (in Gwei) is highly volatile.
As an example of gas price risk, if you decide to wait on claiming your withdrawal, you could experience higher gas prices than if you had not waited.
Thus, **there is gas price risk in choosing to postpone your self-withdrawal past the 7-day window.**

------------

## Advanced Technical Info

Here we present some more technical documentation on advanced subjects for those interested in learning more about gas from the level of the protocol.

### Nuisance Gas

Nuisance gas is a separate subject from the topics we covered above.
Nonetheless, this type of gas is included on L2 transaction costs.

#### What is nuisance gas?

Nuisance gas **provides an upper bound on the _maximum possible L1 gas_ that a [_fraud proof_](https://research.paradigm.xyz/optimism#fraud-proofs) can cost.**
This kind of gas is referred to as a "nuisance" because there will be additional gas on L1 (i.e. inclusion proofs) that are not needed in normal L2 execution.

**As a developer, nuisance gas is not something to worry about.**
Nuisance gas is set to a very high limit, so as long as nuisance gas is kept under this limit, it has no impact on your development.
