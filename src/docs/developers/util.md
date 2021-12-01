---
title: Useful Contracts
lang: en-US
---

# {{ $frontmatter.title }}

These are contracts that are expected to be useful for multiple projects.

## Optimism

The list of Optimism contracts and their addresses is available
[in the monorepo](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments). You can also read [additional information 
here](../protocol/protocol-2.0.md).

### Wrapped Ether (WETH)

This is a standard [WETH9](https://blog.0xproject.com/canonical-weth-a9aa7d0279dd)
contract, for use when you need wrapped ETH.



* Optimistic Ethereum: [0x4200000000000000000000000000000000000006](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000006) |
* Optimistic Kovan: [0x4200000000000000000000000000000000000006](https://kovan-optimistic.etherscan.io/address/0x4200000000000000000000000000000000000006) |



::: tip This is *not* bridged L1 WETH
If you want Optimistic Ethereum WETH, you can't just bridge it over from L1, instead you need to unwrapped the ETH on L1, bridge ETH into L2, and then rewrap it.
:::

### L2 Standard Token Factory

Factory contract for creating standard L2 token representations of
L1 ERC20s compatible with and working on the standard bridge.
[Click here to see how to use it](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/standard-bridge-standard-token)


* [Source](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardTokenFactory.sol)
* Optimistic Ethereum: [0x4200000000000000000000000000000000000012](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000012)
* Optimistic Kovan: [0x4200000000000000000000000000000000000012](https://kovan-optimistic.etherscan.io/address/0x4200000000000000000000000000000000000012)



## Existing Tokens

There is a list of tokens and their addresses [here](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/optimism.tokenlist.json).


## Multisig

There are two easy ways to achieve multisig functionality on Optimistic Ethereum

* You can use [a clone of OG Gnsosis](https://ogg.scopelift.co/). 
* Use any L1 multisig and then [relay the message to L2](bridge/messaging.md).


## Celer Bridge

* [Docs](https://cbridge-docs.celer.network/developer/cbridge-sdk)
* [Optimistic Ethernet](https://cbridge-docs.celer.network/reference/token-addresses#optimism)

## Chainlink

* [Docs](https://docs.chain.link/)
* [Optimistic Ethereum](https://docs.chain.link/docs/optimism-price-feeds/#Optimism%20Mainnet)
* [Optimistic Kovan](https://docs.chain.link/docs/optimism-price-feeds/#Optimism%20Kovan)


## Connext

* [Docs](https://docs.connext.network/)
* [Optimistic Ethereum](https://github.com/connext/nxtp/tree/main/packages/contracts/deployments/optimism)
* [Optimistic Kovan](https://github.com/connext/nxtp/tree/main/packages/contracts/deployments/optimism-kovan)

## Hop

* [Docs](https://docs.hop.exchange/js-sdk/getting-started)
* [Optimistic Ethereum](https://github.com/hop-protocol/hop/blob/develop/packages/core/src/addresses/mainnet.ts#L48-L59)

## Lyra

* [Docs](https://docs.lyra.finance/implementation/lyra-protocol-architecture)
* [Addresses (the are the same on all networks)](https://raw.githubusercontent.com/lyra-finance/lyra-protocol/master/deployments/mainnet-ovm/lyra.json)

## PolyNetwork

* [Docs](https://github.com/polynetwork/docs/tree/master/eth)
* [Addresses](https://github.com/polynetwork/docs/blob/master/config/README.md#optimistic)

## Rari Capital Nova

* [Docs](https://docs.rari.capital/nova/)
* [Optimistic Ethereum](https://github.com/Rari-Capital/nova/releases)

## Rubicon

* [Docs](https://docs.rubicon.finance/)
* [Optimistic Ethereum](https://docs.rubicon.finance/contracts/deployments)

## Synthetix

* [Docs](https://docs.synthetix.io/)
* [Optimistic Ethereum](https://docs.synthetix.io/addresses/#mainnet-optimism-l2)
* [Optimisitic Kovan](https://docs.synthetix.io/addresses/#kovan-optimism-l2)

## Uniswap

* [Docs](https://docs.uniswap.org/sdk/introduction)
* [Uniswap periphery](https://github.com/Uniswap/v3-periphery/blob/main/deploys.md).


