---
title: Oracles 
lang: en-US
---


[Oracles](https://ethereum.org/en/developers/docs/oracles/) provide offchain data onchain. 
This allows code running on a blockchain to access a wide variety of information.
For example, a [stablecoin](https://ethereum.org/en/stablecoins/) that accepts ETH as collateral needs to know the ETH/USD exchange rate:

- How many stablecoins can we give a user for a given amount of ETH?
- Do we need to liquidate any deposits because they are under collateralized?

Different oracles have different security assumptions and different levels of decentralization.
Usually they are either run by the organization that produces the information, or have a mechanism to reward entities that provide accurate information and penalize those that provide incorrect information.

## Types of oracles

There are two types of oracles:

1. **Push oracles** are updated continuously and always have up to date information available onchain.

1. **Pull oracles** are only updated when information is requested by a contract.
   Pull oracles are themselves divided into two types:
   1. Double-transaction oracles, which require two transactions. 
      The first transaction is the request for information, which usually causes the oracle to emit an event that triggers some offchain mechanism to provide the answer (through its own transaction).
      The second transaction actually reads onchain the result from the oracle and uses it.
   1. Single-transaction oracles, which only require one transaction, such as [Chainlink's random number generator](https://docs.chain.link/docs/get-a-random-number/#request-random-values).
      The way this works is that the transaction that requests the information includes a callback (address and the call data to provide it). 
      When the oracle is updated (which also happens through a transaction, but one that is not sent by the user), the oracle uses the callback to inform a contract of the result.

## Gas Oracle

Optimism provides a [Gas Price Oracle](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/predeploys/OVM_GasPriceOracle.sol) that provides information about [gas prices and related parameters](../developers/build/transaction-fees.md).
It can also calculate the total cost of a transaction for you before you send it.

This contract is a predeploy at address `0x420000000000000000000000000000000000000F`:

- [On the production Optimism network](https://explorer.optimism.io/address/0x420000000000000000000000000000000000000F#readContract)
- [On the Optimism Goerli test network](https://goerli-explorer.optimism.io/address/0x420000000000000000000000000000000000000F)

This is a push Oracle. 
Optimism updates the gas price parameters onchain whenever those parameters change. 
The L1 gas price, which can be volatile, is only pushed once every 5 minutes, and each time can change only by up to 20%.

## Chainlink

On Optimism [Chainlink](https://chain.link/) provides a number of [price feeds](https://docs.chain.link/docs/optimism-price-feeds/).
Those feeds are available on the production network.

This is a push Oracle. 
You can always get up to date information (see, for example, [here (scroll down to **latestAnswer**)](https://explorer.optimism.io/address/0x13e3Ee699D1909E989722E753853AE30b17e08c5#readContract)).

[See this guide to learn how to use the Chainlink feeds](https://docs.chain.link/docs/get-the-latest-price/).

## Tellor

[Tellor](https://tellor.io/) is a permissionless, censorship-resistant, and customizable oracle.

The Tellor protocol can secure putting any verifiable data onchain, from spot price feeds, TWAPs, random numbers, to EVM calldata - you can even [specify your own "query type"](https://github.com/tellor-io/dataSpecs/issues/new?assignees=&labels=&template=new_query_type.yaml&title=%5BNew+Data+Request+Form%5D%3A+) to build a feed to fit your specific needs.

As described in the oracles overview section of this page, we are an oracle protocol that has "a mechanism to reward entities that provide accurate information and penalize those that provide incorrect information." Therefore it is necessary to allow some reasonable [amount of time](https://docs.tellor.io/tellor/getting-data/solidity-integration#reading-data) between an oracle update and using that data, to allow for a potential dispute (probablistic finality).

Tellor is a pull oracle where users fund (tip) a specific feed to get updated data reports and then read the data from our oracle contract, however under certain circumstances it can act similar to a push oracle; if your reading from a feed that is already being updated by others, or if you are [running your own data reporter.](https://docs.tellor.io/tellor/reporting-data/introduction)

To learn more about using tellor please [read our docs](https://docs.tellor.io) or [get in touch](https://discord.gg/tellor).

[Tellor contract addresses on Optimism can be found here.](https://docs.tellor.io/tellor/the-basics/contracts-reference#optimism)

### Verifiable Randomness Function (VRF)

#### Band
[Band](https://bandprotocol.com/vrf) provides a source of [onchain randomness](https://bandprotocol.com/vrf). 
[You can learn how to use it here](https://docs.bandchain.org/vrf/getting-started.html).
It is a single-transaction pull oracle.



## Universal Market Access (UMA)

[UMA](https://umaproject.org/) is a generic oracle.
It lets any contract request information (ask a question), and any staked entity can provide an answer.
Other external entities can dispute the proposed answer by providing their own answer and putting up their own stake.
In the case of dispute the question goes to a vote of token holders.
The token holders that vote with the majority are assumed to be truthful and get rewarded.
The external entities that proposed the correct answer are rewarded.
Those that proposed the wrong answer lose their stake.

[See here for the UMA addresses on Optimism](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/10.json). 

[See here for instructions how to use UMA](https://docs.umaproject.org/build-walkthrough/build-process).

UMA is a pull Oracle, it does not get information until it is requested by a contract. 
This means that a decentralized application needs to issue two transactions.
First, a transaction that causes a contract on the blockchain to ask for the information.
Later (in the case of UMA 48 hours later if there is no dispute, longer if there is), a second transaction need to be triggered to cause the contract to read from the Oracle and see the response to the request.

## Uniswap

Technically speaking [Uniswap](https://uniswap.io/) is not an oracle, because the information comes from onchain sources.
However, Uniswap pools do provide [quotes that give the relative costs of assets](https://docs.uniswap.org/concepts/protocol/oracle).

::: warning

Using onchain asset prices, especially those in low liquidity pools, makes you vulnerable to price manipulation. 

:::

To use Uniswap as an Oracle:

1. See [the list of pools on Optimism](https://info.uniswap.org/#/optimism/).
1. To find the pool address, [look at the Uniswap factory](https://explorer.optimism.io/address/0x1f98431c8ad98523631ae4a59f267346ea31f984#readContract).
   Use **getPool** with these parameters:

      | Parameter           | Meaning                             |
      | ------------------- | ----------------------------------- | 
      | One token address   | [Address of the ERC-20 contract for that token on Optimism (chainId 10)](https://static.optimism.io/optimism.tokenlist.json) |
      | Other token address | [Address of the ERC-20 contract for that token on Optimism (chainId 10)](https://static.optimism.io/optimism.tokenlist.json) |      
      | Pool fee            | The pool fee percentage times ten thousand. For example, for 0.3% enter `3000` |

1. In your contract, use [IUniswapV3PoolState](https://github.com/Uniswap/v3-core/blob/main/contracts/interfaces/pool/IUniswapV3PoolState.sol) and [IUniswapV3PoolDerivedState](https://github.com/Uniswap/v3-core/blob/main/contracts/interfaces/pool/IUniswapV3PoolDerivedState.sol) to get the pool state.
