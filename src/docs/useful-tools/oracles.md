---
title: Oracles 
lang: en-US
---


[Oracles](https://ethereum.org/en/developers/docs/oracles/) provide code running on a block chain, for example Optimism, off-chain data.
For example, a [stablecoin](https://ethereum.org/en/stablecoins/) that accepts ETH as collateral needs to know the ETH/USD exchange rate:

- How many stablecoins can we give a user for a given amount of ETH?
- Do we need to liquidate any deposits because they are under collateralized?

A properly written oracle is decentralized and incentivizes providing accurate information.

## Gas Oracle

Optimism provides a [Gas Price Oracle](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/predeploys/OVM_GasPriceOracle.sol) that provides information about [gas prices and related parameters](../developers/build/transaction-fees.md).
It can also calculate the total cost of a transaction for you before you send it.

This contract is a predeploy at address `0x420000000000000000000000000000000000000F`:

- [on the production Optimism network](https://optimistic.etherscan.io/address/0x420000000000000000000000000000000000000F#readContract)
- [on the Optimistic Kovan test network](https://kovan-optimistic.etherscan.io/address/0x420000000000000000000000000000000000000F#readContract)

## Chainlink

On Optimism [Chainlink](https://chain.link/) provides a number of [price feeds](https://docs.chain.link/docs/optimism-price-feeds/).
Those feeds are available both on the production network and the Kovan test network.

[See here how to use the Chainlink feeds](https://docs.chain.link/docs/get-the-latest-price/).

## Universal Market Access (UMA)

[UMA](https://umaproject.org/) is a generic oracle.
It lets any contract request information (ast a question), and any external entity can provide the answer and put up a stake.
Other external entities can dispute the proposal by providing their own answer and a putting up their own stake.
In the case of dispute the question goes to a vote of token holders.
The token holders that vote with the majority are assumed to be truthful and get rewarded.
The external entities that proposed the correct answer are rewarded.
Those that proposed the wrong answer lose their stake.

[See here for the UMA addresses on Optimism](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/10.json). 

[See here for instructions how to use UMA](https://docs.umaproject.org/build-walkthrough/build-process).
