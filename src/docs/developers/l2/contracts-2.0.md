---
title: Using the Protocol Contracts in OVM 2.0
lang: en-US
---

::: tip OVM 2.0 Release Dates
OVM 2.0 will be released October 14th on the Kovan test network,
and October 28th into the production Optimistic Ethereum network.
:::


# {{ $frontmatter.title }}

::: warning OVM 2.0 Page
This page refers to the **new** state of Optimistic Ethereum after the
OVM 2.0 update. We expect to deploy OVM 2.0 mid October on the Kovan
test network and by the end of October on the production network.
:::

## Finding contract addresses

Check out the [Networks and Connection Details page](/docs/infra/networks.md) for links to the contract addresses for each network.
You can also find the addresses for all networks in the [`deployments` folder](https://github.com/ethereum-optimism/optimism/tree/master/packages/contracts/deployments) of the [`contracts` package](https://github.com/ethereum-optimism/optimism/tree/master/packages/contracts).
Take a look at the [Contract Overview](/docs/protocol/protocol-2.0.md) for a list of all protocol contracts and their purpose within the system.

## [@eth-optimism/contracts](https://github.com/ethereum-optimism/optimism/tree/master/packages/contracts)

The easiest way to interact with the Optimistic Ethereum protocol contracts is to use the [@eth-optimism/contracts](https://github.com/ethereum-optimism/optimism/tree/master/packages/contracts) npm package.
You can use this package to get an interface or factory instance for any of the Optimistic Ethereum contracts.

### Installation

Install via `npm` or `yarn`:

```sh
npm install @eth-optimism/contracts
```

### Usage

`@eth-optimism/contracts` exports various useful tools.
Here are some of the most useful tools exported by the package:

#### `getContractInterface`

```js
const { getContractInterface } = require("@eth-optimism/contracts");

// Returns an ethers.utils.Interface object
const iface = getContractInterface("CanonicalTransactionChain"); // or whatever contract
```

#### `getContractFactory`

```js
const { getContractFactory } = require("@eth-optimism/contracts");

// Returns an ethers.ContractFactory object
const factory = getContractFactory("CanonicalTransactionChain"); // or whatever contract
```

#### `getL1ContractData`

```js
const { getL1ContractData } = require("@eth-optimism/contracts");

// Returns an ethers.Contract object at the correct address
const contract = getL1ContractData("mainnet").CanonicalTransactionChain; // or whatever contract
```

#### `getL2ContractData`

```js
const { getL2ContractData } = require("@eth-optimism/contracts");

// Returns an ethers.Contract object at the correct address
const contract = getL2ContractData().Lib_AddressManager; // or whatever contract
```

#### `predeploys`

```js
const { predeploys } = require("@eth-optimism/contracts");

// Returns an address (string)
const ovmETHAddress = predeploys.OVM_GasPriceOracle; // or whatever contract
```