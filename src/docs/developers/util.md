---
title: Useful Contracts
lang: en-US
---


::: tip OVM 2.0 Release Dates
OVM 2.0 is already released on the Kovan test network.
We expect to deploy it to the production Optimistic Ethereum network on November 11th.
:::


# {{ $frontmatter.title }}

::: tip OVM 2.0 Page
This page refers to the OVM 2.0 Kovan test network. It will be updated for
the production network after it is released.
:::

These are contracts that are expected to be useful for multiple projects.


## Optimism

The list of Optimism contracts and their addresses is available
[in the monorepo](https://github.com/ethereum-optimism/optimism/tree/regenesis/0.5.0/packages/contracts/deployments). You can also read [additional information 
here](../protocol/protocol-2.0.md).

### Wrapped Eth

This is a standard [WETH9](https://blog.0xproject.com/canonical-weth-a9aa7d0279dd)
contract, for use when you need wrapped ETH.


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0x4200000000000000000000000000000000000006](https://kovan-optimistic.etherscan.io/address/0x4200000000000000000000000000000000000006) |

<!--
| Optimistic Ethereum | [0x4200000000000000000000000000000000000006](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000006) |
-->

### L2 Standard Token Factory

Factory contract for creating standard L2 token representations of
L1 ERC20s compatible with and working on the standard bridge.
[Click here to see how to use it](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/standard-bridge-standard-token)


[Source](https://github.com/ethereum-optimism/optimism/blob/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/tokens/OVM_L2StandardTokenFactory.sol)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0x4200000000000000000000000000000000000012](https://kovan-optimistic.etherscan.io/address/0x4200000000000000000000000000000000000012) |

<!--
| Optimistic Ethereum | [0x4200000000000000000000000000000000000012](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000012) |
-->


## Multisig

There are two easy ways to achieve multisig functionality on Optimistic Ethereum

1. You can use [a clone of OG Gnsosis](https://ogg.scopelift.co/). 
2. Use any L1 multisig and then [relay the message to L2](bridge/messaging.md).


## Tokens

There is a list of tokens and their addresses [here](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/optimism.tokenlist.json).


## Uniswap Core


### Oracle

Provides price and liquidity data useful for a wide variety of system designs

[Source](https://github.com/Uniswap/uniswap-v3-core-optimism/blob/dffa6694589f1444b0b9c2ef772c0d59b9edb4e3/contracts/libraries/Oracle.sol)

[Reference](https://docs.uniswap.org/protocol/reference/core/libraries/Oracle)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0x17B0F5E5850E7230136Df66c5d49497b8C3bE0c1](https://kovan-optimistic.etherscan.io/address/0x17B0F5E5850E7230136Df66c5d49497b8C3bE0c1) |

<!--
| Optimistic Ethereum | [0x17B0F5E5850E7230136Df66c5d49497b8C3bE0c1](https://optimistic.etherscan.io/address/0x17B0F5E5850E7230136Df66c5d49497b8C3bE0c1) |
-->

### Position

Positions represent an owner address' liquidity between a lower and upper tick boundary

[Source](https://github.com/Uniswap/uniswap-v3-core-optimism/blob/dffa6694589f1444b0b9c2ef772c0d59b9edb4e3/contracts/libraries/Position.sol)

[Reference](https://docs.uniswap.org/protocol/reference/core/libraries/Position)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0x18F7E3ae7202e93984290e1195810c66e1E276FF](https://kovan-optimistic.etherscan.io/address/0x18F7E3ae7202e93984290e1195810c66e1E276FF) |

<!-- 
| Optimistic Ethereum | [0x18F7E3ae7202e93984290e1195810c66e1E276FF](https://optimistic.etherscan.io/address/0x18F7E3ae7202e93984290e1195810c66e1E276FF) |
-->

### Swap Math

Contains methods for computing the result of a swap within a single tick price range, i.e., a single tick.

[Source](https://github.com/Uniswap/uniswap-v3-core-optimism/blob/dffa6694589f1444b0b9c2ef772c0d59b9edb4e3/contracts/libraries/SwapMath.sol)

[Reference](https://docs.uniswap.org/protocol/reference/core/libraries/SwapMath)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0x198Dcc7CD919dD33Dd72c3f981Df653750901D75](https://kovan-optimistic.etherscan.io/address/0x198Dcc7CD919dD33Dd72c3f981Df653750901D75) |

<!--
| Optimistic Ethereum | [0x198Dcc7CD919dD33Dd72c3f981Df653750901D75](https://optimistic.etherscan.io/address/0x198Dcc7CD919dD33Dd72c3f981Df653750901D75) |
-->





### Tick Library

Contains functions for managing tick processes and relevant calculations

[Source](https://github.com/Uniswap/uniswap-v3-core-optimism/blob/dffa6694589f1444b0b9c2ef772c0d59b9edb4e3/contracts/libraries/Tick.sol)

[Reference](https://docs.uniswap.org/protocol/reference/core/libraries/Tick)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0x47405B0D5f88e16701be6dC8aE185FEFaA5dcA2F](https://kovan-optimistic.etherscan.io/address/0x47405B0D5f88e16701be6dC8aE185FEFaA5dcA2F) |


<!--
| Optimistic Ethereum | [0x47405B0D5f88e16701be6dC8aE185FEFaA5dcA2F](https://optimistic.etherscan.io/address/0x47405B0D5f88e16701be6dC8aE185FEFaA5dcA2F) |
-->


#### Tick Bitmap

Stores a packed mapping of tick index to its initialized state

[Source](https://github.com/Uniswap/uniswap-v3-core-optimism/blob/dffa6694589f1444b0b9c2ef772c0d59b9edb4e3/contracts/libraries/TickBitmap.sol)

[Reference](https://docs.uniswap.org/protocol/reference/core/libraries/TickBitmap)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0x01D95165C3C730D6B40f55c37e24c7AAC73d5E6f](https://kovan-optimistic.etherscan.io/address/0x01D95165C3C730D6B40f55c37e24c7AAC73d5E6f) |

<!--
| Optimistic Ethereum | [0x01D95165C3C730D6B40f55c37e24c7AAC73d5E6f](https://optimistic.etherscan.io/address/0x01D95165C3C730D6B40f55c37e24c7AAC73d5E6f) |
-->


#### Tick Math

Computes sqrt price for ticks of size 1.0001, i.e. sqrt(1.0001^tick) as fixed point Q64.96 numbers. Supports prices between 2^-128 and 2^128

[Source](https://github.com/Uniswap/uniswap-v3-core-optimism/blob/dffa6694589f1444b0b9c2ef772c0d59b9edb4e3/contracts/libraries/TickMath.sol)

[Reference](https://docs.uniswap.org/protocol/reference/core/libraries/TickMath)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0x308C3E60585Ad4EAb5b7677BE0566FeaD4cb4746](https://kovan-optimistic.etherscan.io/address/0x308C3E60585Ad4EAb5b7677BE0566FeaD4cb4746) |

<!--
| Optimistic Ethereum | [0x308C3E60585Ad4EAb5b7677BE0566FeaD4cb4746](https://optimistic.etherscan.io/address/0x308C3E60585Ad4EAb5b7677BE0566FeaD4cb4746) |
-->



### Exchange Creation

#### Pool Deployer


[Source](https://github.com/Uniswap/uniswap-v3-core-optimism/blob/dffa6694589f1444b0b9c2ef772c0d59b9edb4e3/contracts/UniswapV3PoolDeployer.sol)

[Reference](https://docs.uniswap.org/protocol/reference/core/UniswapV3PoolDeployer)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0x569E8D536EC2dD5988857147c9FCC7d8a08a7DBc](https://kovan-optimistic.etherscan.io/address/0x569E8D536EC2dD5988857147c9FCC7d8a08a7DBc) |

<!-- 
| Optimistic Ethereum | [0x569E8D536EC2dD5988857147c9FCC7d8a08a7DBc](https://optimistic.etherscan.io/address/0x569E8D536EC2dD5988857147c9FCC7d8a08a7DBc) |
-->



#### Core Factory

Deploys Uniswap V3 pools and manages ownership and control over pool protocol fees

[Source](https://github.com/Uniswap/uniswap-v3-core-optimism/blob/dffa6694589f1444b0b9c2ef772c0d59b9edb4e3/contracts/UniswapV3Factory.sol)

[Reference](https://docs.uniswap.org/protocol/reference/core/UniswapV3Factory)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0x1F98431c8aD98523631AE4a59f267346ea31F984](https://kovan-optimistic.etherscan.io/address/0x1F98431c8aD98523631AE4a59f267346ea31F984) |

<!--
| Optimistic Ethereum | [0x1F98431c8aD98523631AE4a59f267346ea31F984](https://optimistic.etherscan.io/address/0x1F98431c8aD98523631AE4a59f267346ea31F984) |
-->


## Uniswap Periphery

### Swap Router

Router for stateless execution of swaps against Uniswap V3

[Source](https://github.com/Uniswap/uniswap-v3-periphery-optimism/blob/54272682985ce05003b3461f72e78f4c992932eb/contracts/SwapRouter.sol)

[Reference](https://docs.uniswap.org/protocol/reference/periphery/SwapRouter)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0xE592427A0AEce92De3Edee1F18E0157C05861564](https://kovan-optimistic.etherscan.io/address/0xE592427A0AEce92De3Edee1F18E0157C05861564) |


<!--
| Optimistic Ethereum | [0xE592427A0AEce92De3Edee1F18E0157C05861564](https://optimistic.etherscan.io/address/0xE592427A0AEce92De3Edee1F18E0157C05861564) |
-->




### Proxy Admin

[Source](https://github.com/Uniswap/uniswap-v3-periphery-optimism/blob/54272682985ce05003b3461f72e78f4c992932eb/contracts/ProxyAdminOptimism.sol)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2](https://kovan-optimistic.etherscan.io/address/0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2) |

<!--
| Optimistic Ethereum | [0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2](https://optimistic.etherscan.io/address/0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2) |
-->


### Transparent Upgradeable Proxy


[Source](https://github.com/Uniswap/uniswap-v3-periphery-optimism/blob/54272682985ce05003b3461f72e78f4c992932eb/contracts/TransparentUpgradeableProxyOptimism.sol)

| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0xEe6A57eC80ea46401049E92587E52f5Ec1c24785](https://kovan-optimistic.etherscan.io/address/0xEe6A57eC80ea46401049E92587E52f5Ec1c24785) |


<!--
| Optimistic Ethereum | [0xEe6A57eC80ea46401049E92587E52f5Ec1c24785](https://optimistic.etherscan.io/address/0xEe6A57eC80ea46401049E92587E52f5Ec1c24785) |
-->




### Lens


#### Multicall

Enables calling multiple methods in a single call to the contract

[Source](https://github.com/Uniswap/uniswap-v3-periphery-optimism/blob/54272682985ce05003b3461f72e78f4c992932eb/contracts/lens/UniswapInterfaceMulticall.sol)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0x90f872b3d8f33f305e0250db6A2761B354f7710A](https://kovan-optimistic.etherscan.io/address/0x90f872b3d8f33f305e0250db6A2761B354f7710A) |


<!--
| Optimistic Ethereum | [0x90f872b3d8f33f305e0250db6A2761B354f7710A](https://optimistic.etherscan.io/address/0x90f872b3d8f33f305e0250db6A2761B354f7710A) |
-->


#### Quoter

Allows getting the expected amount out or amount in for a given swap without executing the swap

[Source](https://github.com/Uniswap/uniswap-v3-periphery-optimism/blob/54272682985ce05003b3461f72e78f4c992932eb/contracts/lens/Quoter.sol)

[Reference](https://docs.uniswap.org/protocol/reference/periphery/lens/Quoter)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6](https://kovan-optimistic.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6) |


<!--
| Optimistic Ethereum | [0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6](https://optimistic.etherscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6) |
-->



#### Tick

[Source](https://github.com/Uniswap/uniswap-v3-periphery-optimism/blob/54272682985ce05003b3461f72e78f4c992932eb/contracts/lens/TickLens.sol)

[Reference](https://docs.uniswap.org/protocol/reference/periphery/lens/TickLens)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0xbfd8137f7d1516D3ea5cA83523914859ec47F573](https://kovan-optimistic.etherscan.io/address/0xbfd8137f7d1516D3ea5cA83523914859ec47F573) |


<!--
| Optimistic Ethereum | [0xbfd8137f7d1516D3ea5cA83523914859ec47F573](https://optimistic.etherscan.io/address/0xbfd8137f7d1516D3ea5cA83523914859ec47F573) |
-->





### Non-Fungible Tokens (NFTs)

#### NFT Descriptor

[Source](https://github.com/Uniswap/uniswap-v3-periphery-optimism/blob/54272682985ce05003b3461f72e78f4c992932eb/contracts/libraries/NFTDescriptor.sol)

[Reference](https://docs.uniswap.org/protocol/reference/periphery/libraries/NFTDescriptor)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0x042f51014b152C2D2fC9b57E36b16bC744065D8C](https://kovan-optimistic.etherscan.io/address/0x042f51014b152C2D2fC9b57E36b16bC744065D8C) |

<!--
| Optimistic Ethereum | [0x042f51014b152C2D2fC9b57E36b16bC744065D8C](https://optimistic.etherscan.io/address/0x042f51014b152C2D2fC9b57E36b16bC744065D8C) 
-->|


#### NFT Position

[Source](https://github.com/Uniswap/uniswap-v3-periphery-optimism/blob/54272682985ce05003b3461f72e78f4c992932eb/contracts/libraries/NonfungiblePositionLibrary.sol)




| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0x42B24A95702b9986e82d421cC3568932790A48Ec](https://kovan-optimistic.etherscan.io/address/0x42B24A95702b9986e82d421cC3568932790A48Ec) |

<!--
| Optimistic Ethereum | [0x42B24A95702b9986e82d421cC3568932790A48Ec](https://optimistic.etherscan.io/address/0x42B24A95702b9986e82d421cC3568932790A48Ec) |
-->



#### NFT Position Descriptor

Produces a string containing the data URI for a JSON metadata string

[Source](https://github.com/Uniswap/uniswap-v3-periphery-optimism/blob/54272682985ce05003b3461f72e78f4c992932eb/contracts/NonfungibleTokenPositionDescriptor.sol)

[Reference](https://docs.uniswap.org/protocol/reference/periphery/NonfungibleTokenPositionDescriptor)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0x91ae842A5Ffd8d12023116943e72A606179294f3](https://kovan-optimistic.etherscan.io/address/0x91ae842A5Ffd8d12023116943e72A606179294f3) |

<!--
| Optimistic Ethereum | [0x91ae842A5Ffd8d12023116943e72A606179294f3](https://optimistic.etherscan.io/address/0x91ae842A5Ffd8d12023116943e72A606179294f3) |
-->


#### NFT Position Manager

Wraps Uniswap V3 positions in the ERC721 non-fungible token interface

[Source](https://github.com/Uniswap/uniswap-v3-periphery-optimism/blob/54272682985ce05003b3461f72e78f4c992932eb/contracts/NonfungiblePositionManager.sol)

[Reference](https://docs.uniswap.org/protocol/reference/periphery/NonfungiblePositionManager)


| Network             | Address |
| ------------------- | ------- |
| Optimistic Kovan    | [0xC36442b4a4522E871399CD717aBDD847Ab11FE88](https://kovan-optimistic.etherscan.io/address/0xC36442b4a4522E871399CD717aBDD847Ab11FE88) |

<!--
| Optimistic Ethereum | [0xC36442b4a4522E871399CD717aBDD847Ab11FE88](https://optimistic.etherscan.io/address/0xC36442b4a4522E871399CD717aBDD847Ab11FE88) |
-->


## Synthetix

<!-- * [Optimistic Ethereum contracts](https://docs.synthetix.io/addresses/#mainnet-optimism-l2) -->
* [Optimisitic Kovan contracts](https://docs.synthetix.io/addresses/#kovan-optimism-l2)


## Additional Contracts

You can find additional contracts in the list of verified contracts

<!-- * [Optimistic Ethereum verified contracts](https://optimistic.etherscan.io/contractsVerified)
-->
* [Optimistic Kovan verified contracts](https://kovan-optimistic.etherscan.io/contractsVerified)
