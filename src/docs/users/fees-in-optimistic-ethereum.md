# How Fees Work in Optimistic Ethereum

## Introduction

::: tip Work in Progress™
_Our documentation is a rapidly improving work in progress. If you have questions or feel like something is missing feel free to ask in our [Discord server](https://discord.gg/5TaAXGn2D8) where we (and our awesome community) are actively responding, or [open an issue](https://github.com/ethereum-optimism/community-hub/issues) in the GitHub repo for this site._
:::

This document is mainly for users of Optimistic Ethereum (OE), including developers and general end-users that seek to learn more about how _fees_ work in OE.
We hope that the content here can serve as a reference for understanding most of what you need to know about fees in OE.

_Note: if at any time in this process you get stuck or have questions, please reach out on discord! We just ask that you do this in the public #tech-support channel so that others may learn alongside us._ 😃

## Overview

We'll be primarily covering gas costs and savings experienced in _and_ around OE when you:

1. Initiate an L1 Deposit
2. Complete a withdrawal (i.e. L2 → L1)
3. Transact on L2

We'll also cover how gas costs are calculated and what parameters to optimize for to ensure that your contract deployments and transactions don't consume too much gas in L2.

If the previous sentence didn't quite make sense, don't worry.
It'll become clearer as you make your way through this document.

So, let's learn about gas in OE!

::: tip Recommended Reading for Developers
Although the top-most subject of this document is of "Users", we strongly encourage developers to review this document so that you have a thorough understanding of how gas affects your end-users!
:::

## Initiating an L1 Deposit

::: tip L2 == L2 OE _and_ L1 == L1 Ethereum
For the rest of this document, whenever we refer to L2, unless otherwise stated, we mean L2 Optimistic Ethereum. Similarly, whenever we refer to L1, we mean L1 Ethereum.
:::

The most immediate thing you'll likely want to do is deposit ether (ETH) to OE (a layer 2 for Ethereum) so that you can interact with contracts and applications while on L2 OE.
Currently, the only way to do this is to make initiate a deposit from L1 Ethereum to L2 OE.

::: tip WETH on L2 OE
As a reminder, ETH on L2 OE is _not_ the exact same as ETH on L1 Ethereum.
On L1 Ethereum, ETH was created before there were [Ethereum Improvement Proposal (EIP)](https://eips.ethereum.org/) contract standards.
Inevitably, this has led to some awkward contract interactions on Ethereum, such as having to exchange ETH for [wrapped ether (or WETH)](https://weth.io/) to engage in numerous applications (e.g. this is prominent DeFi).
While some apps try to obviate the user experience (UX) of having to perform this ETH for WETH exchange/trade (e.g. Rarible does this quite well already), it still results in a suboptimal UX.
Users are still shown that WETH is being used, so the UX is completely rid of WETH.
This can add additional complexity to newcomers to dApps that only know and understand ETH but not WETH.

This is what OE solves by making ETH an ERC-20 on L2.
More info can be found in our [FAQs](http://community.optimism.io/faqs/#does-optimistic-ethereum-use-eth-natively) and in our [contracts](https://github.com/ethereum-optimism/contracts/blob/master/contracts/optimistic-ethereum/OVM/predeploys/OVM_ETH.sol)
:::,,

So, **what can you expect to pay in gas costs when making an L1 to L2 deposit?**

While your _real_ gas costs on OE will vary (depending on several factors like network demand or network congestion of the OE network, etc.), we can provide a _best estimate_ for what your expected costs will be.

First, let's see what the gas cost is for depositing Synthetix's token, SNX, into L2 OE.
[Open up this transaction on Etherscan](https://etherscan.io/tx/0xbc86558426c2c62fd49a57b830182b37c9e71646e1ba12aebf71b356253e785c).

We'll highlight several important fields from the `Overview` section here that we'll expand on:

* **Interacted With (To):**  Tells us the contract that was interacted with in this transaction.
* **Transaction Action**: A concise explanation of the overall action that is being made in this transasction. You can use this field as a quick summary of the transaction details, excluding the fee that was paid and timestamps.
* **Tokens Transferred**: Tells us the token and the amount of this token that was sent, which address these tokens were sent from, and which address these tokens they were sent to.
* **Transaction Fee**: Tells us the gas cost that was paid for, as a transaction fee, in this transaction. This field also gives us an estimate of the transaction fee that was paid for on the day that the block of this transaction was included in Ethereum.
* **Gas Limit**: Tells us the maximum price that the sender is willing to pay to miners to have this transaction included in a block.
* **Gas Price**: Tells us the gas cost in Gwei!
* **Ether Price**: Tells us the price of ether when transaction was submitted.
* **Gas Used by Transaction**: Self-explanatory :)

If you look at the field titled `Transaction Action`, we can see a deposit was made for an amount of `212.354252220530785846 SNX` to the Synthetix L2 Bridge.
This tells us that the main purpose of this transaction was to deposit this amount of SNX onto Synthetix L2 that is on Optimistic Ethereum.
If we look at the `Transaction Fee` field, we can see that the sender (this address is the `From` address, found under the `Tokens Transferred` field) of this transaction paid `0.039028664 Ether`, at a `Gas Price` of `116 Gwei`.

Although this field gives us an easy look at the gas cost, _**it's very important to remember that gas costs (i.e. transaction fees) are dependent on the changing gas price and gas used by the transaction!**_
What this means is that you should really be mindful of the `Gas Price` in Gwei and the `Gas Used by Transaction` for your transactions.
These variables and the `Ether Price` also let you calculate expected gas costs yourself, letting you make estimates for future transactions that you intend to make.
For example, this transaction used `336,454` gas, at a gas price of `116 Gwei` (or `0.000000116 ether`) and an ether price of `$2,009.19`.
This gives us a gas cost of `336,454 * 0.000000116 * 2009.19 = $78.42` for this SNX deposit transaction.

<!--

To make this calculation easy for you, we've included calculator to compute gas cost!

INSERT CALCULATOR HERE

-->

Thus, **we can see that this sender paid roughly `$78.42` for an SNX deposit to L2 OE**, an amount that is equal to what you would expect for an L1 Ethereum gas cost for a deposit.

### Main cost of a deposit

The main cost of a deposit comes from sending an L2 message to L1 via a call to the [`sendMessage`](https://github.com/ethereum-optimism/contracts/blob/master/contracts/optimistic-ethereum/OVM/bridge/messaging/Abs_BaseCrossDomainMessenger.sol#L51-L77) method.
In Synthetix's `SynthetixBridgeToOptimism.sol` contract, under the [`_initiateDeposit`](https://github.com/Synthetixio/synthetix/blob/develop/contracts/SynthetixBridgeToOptimism.sol#L199-L203) function, we see `sendMessage` being called to send a message to L1 (from L2) for an L2 deposit of SNX.
Note that the third argument of `sendMessage` takes a value for `_gasLimit`.
In the `sendMessage` call, we see that this `_gasLimit` value is obtained by [getting the `Deposit` gas limit from the global `CrossDomainMessageGasLimits` object](https://github.com/Synthetixio/synthetix/blob/develop/contracts/SynthetixBridgeToOptimism.sol#L202).
Afterwards, the [`messenger`](https://github.com/Synthetixio/synthetix/blob/develop/contracts/SynthetixBridgeToOptimism.sol#L43-L45) calls `CanonicalTransactionChain.enqueue` with that [`_gasLimit` specified](https://github.com/ethereum-optimism/contracts/blob/master/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol#L282).

In [`CanonicalTransactionChain.enqueue`](https://github.com/ethereum-optimism/contracts/blob/master/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol#L250-L260), we can see [gasToConsume](https://github.com/ethereum-optimism/contracts/blob/c39fcc40aec235511a5a161c3e33a6d3bd24221c/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol#L282) is calculated from the the `_gasLimit` (that was specified for the transaction for an SNX deposit) divided by the `L2_GAS_DISCOUNT_DIVISOR`.
(This value is not too important: the gist of what you need to know about the divisor is that it is a manually set parameter.)

However, what _is_ important to know is that **`gasToConsume` is equal to the L1 gas that is burned.**
(If you're curious, you can read the `L2_GAS_DISCOUNT_DIVISOR` value from our Mainnet CanonicalTransactionChain (CTC) [here](https://etherscan.io/address/0xed2701f7135eab0D7ca02e6Ab634AD6CbE159Ffb#readContract).)

Currently, the `L2_GAS_DISCOUNT_DIVISOR` is set to `32`.
So, if you need to send an L1 → L2 transaction with 9 million gas (the gas limit), you will burn `9m/32 = 281,250` L1 gas in this step of the CTC's `enqueue`.

::: tip For Developers 👷‍♀️...
As a developer, you will want to have the minimum gas limit sent with your deposit.
Minimizing the deposit gas limit will minimize gas costs to your users.

For Synthetix, this minimum gas limit seems to be roughly 2 million gas.
Therefore, we suggest that you find the minimum `_gasLimit` that will reliably result in successful deposits and _**add a buffer**_ (e.g. 1.5x the value of the gas limit), to ensure that users will not have their transactions reverted (and will get their tokens on the other side!).
:::

**NOTE: Even though we walked through expected costs for ETH transfers above, the same estimate can be used for other token deposits besides ETH as well.**

## Completing an L2 → L1 Withdrawal

::: warning 7-day withdrawal window
As a general reminder, all L2 to L1 withdrawals have a 7-day delay before the withdrawn funds can be claimed.
:::

You'll probably want to know how much it will cost to move your assets out of L2 OE.

Thankfully, initiating a withdrawal is just an approximation of the cost of any other L2 transaction.
[Here's another example from Synthetix.](https://etherscan.io/tx/0x1f6601e918572668d40405c1cefb9af96bab430f46f9dde78d82e253e33e4904)
This time, we're looking at a transaction that completes an SNX withdrawal on L1.
For this SNX withdrawal transaction, we have [`relayMessage`](https://github.com/ethereum-optimism/contracts/blob/master/contracts/optimistic-ethereum/iOVM/bridge/messaging/iOVM_L2CrossDomainMessenger.sol#L17-L30) execute the L2 message that was sent by `sendMessage` to L1 (the destination for this transaction) to complete the withdrawal on L1.
Similar to `sendMessage` in a deposit, it is the call to `relayMessage` that consumes the most gas in this withdrawal.

Again, we should calculate the gas cost as we did before!

<!-- 

To make this calculation easy for you, we've included calculator to compute gas cost!

INSERT CALCULATOR HERE

Remove the following paragraph if using calculator
-->

<!-- 

In addition to using the calculator, we're including ticker for the gas price that you can use in your calculations.

INSERT GAS PRICE TICKER HERE (used for quickly knowing gas cost for withdrawals)

-->

This turns out to be `Gas Used by Transaction * Gas Price * Ether Price`, which equals `491,814 * 0.00000005 ether * $1368.22 = $33.65`, or rougly $33.65 for completing this L2 to L1 withdrawal of SNX.

### Why is gas so expensive?

By now, you might be wondering why the gas cost for these withdrawals are so expensive ($33.65, or $52.11 at the price of April 6th, 2021, is expensive!).
The explanation comes from the expensive action of having to prove a merkle branch on L2 state. (For more information, you can see this process in the `_verifyStateRootProof` of [OVM_L1CrossDomainMessenger.sol](https://github.com/ethereum-optimism/contracts/blob/c39fcc40aec235511a5a161c3e33a6d3bd24221c/contracts/optimistic-ethereum/OVM/bridge/messaging/OVM_L1CrossDomainMessenger.sol#L201-L220))

### Gas subsidy and self-withdrawals

Currently, we're subsidizing the cost of running `relayMessage` for your withdrawals (🥳).
However, soon you will have to claim your own withdrawals.

In a self-withdrawal, it's important to know that when you initiate a withdrawal, you will have to pay roughly 500k gas at whatever gas price there is when at the end of the 7-day withdraw window.
That means that withdrawal can be relayed at any time, so if gas prices shoot up a ton, you can wait for as long as you want (days, weeks, etc.) until you wish to claim and complete your withdrawal.

One final thing to note about self-withdrawals is that the gas price (in Gwei) is highly volatile.
To illustrate why this matters, if you do decide to wait on claiming your withdrawal, you could experience higher gas prices than if you had not waited.
Thus, there is gas price risk in choosing to post-pone your self-withdrawal past the 7-day window.

## Transacting on L2

In this section we'll briefly review how much transactions cost and how they are calculated.
If you think something is missing from this section (or anywhere else in this document!), make sure to reach out to us on [Discord](https://discord.gg/5TaAXGn2D8) to let us know how we can improve this page!

### How are fees calculated in L2 Optimistic Ethereum?

To understand how much transaction fees cost on L2 OE, it behooves you to know how these fees are calculated.

As a gentle reminder, on L2 OE, gas fees are charged in ETH (but not the same ETH as in L1)!

However, the fee payment itself is equal to to your `gasLimit * eth_gasPrice`, a calculation that is slightly different from L1 Ethereum where the fee you are charged is based on `gasUsed`.
Due to this slight difference, we recommend using `eth_estimateGas` to calculate your `gasLimit`.
This is because `eth_gasPrice` is a constant value of 1 Gwei, so your focus should be on optimizing the `gasLimit`.

Two critical points to remember for this section here are: 1) you should never drop your `eth_gasPrice` or your transaction will simply get rejected on L2, and 2) never drop your `eth_estimateGas` `gasLimit` or your transaction might revert.

### Transactions for developers

As a developer, it's important to know that `eth_estimateGas` returns:

```sh
rollupTxSize * dataPrice + executionprice * gasUsed
```

* `rollupTxSize` is the size of the serialized rollup transaction if it were published on L1.
* `dataPrice` is a value set by the sequencer based on the current congestion on L1 (also known as "the cost of L1 data": if L1 gas prices are high, then `dataPrice is proportionally high).
* `executionPrice` is fetched via the standard `eth_gasPrice` rules that `geth` uses based on the current congestion on L2.

(See [ethereum-optimism/go-ethereum/pull/273](https://github.com/ethereum-optimism/go-ethereum/pull/273) for more info.)

From these gas estimation variables, this means that the majority of transaction costs until L2 becomes congested will be equal to `rollupTxSize * dataPrice`.
Additionally, you can expect for the `executionPrice` to be fairly minimal, unless L2 becomes congested.

To minimize gas costs for users, we recommend minimizing your `rollupTxSize`.
For example, you can reduce your `uint256` state variables to `uint32` variables wherever possible in your transaction inputs.
By reducing the size of your state variables, you will likely cut costs to reduce your `rollupTxSize` in exchange for increasing the amount of `gasUsed` for your transaction.

#### Final note on `gasUsed`

A final note on the amount of `gasused` per transaction.
**`gasUsed` must always be under 9 million**.

There is a per transaction gas limit of 9 million in L2 and when you compile your contracts for L2, gas usage can increase by more than 5x.

So, if your transaction does consume more than 1.5 million gas on L1, you should really be mindful of the amount of gas it consumes in L2.

<!-- 

MUST ADD KELVIN'S NOTES ON FEE LOGIC IN L2GETH

https://www.notion.so/optimismpbc/Fee-Logic-in-L2Geth-82fc5f230d684d03997f35bb98a75948

-->