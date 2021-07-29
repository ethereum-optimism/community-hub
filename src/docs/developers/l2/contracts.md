---
title: Using the Protocol Contracts
lang: en-US
---

# {{ $frontmatter.title }}

## Finding Contract Addresses

Check out the [Networks and Connection Details page](/docs/infra/networks.md) for links to the contract addresses for each network.
You can also find the addresses for all networks in the [`deployments` folder](https://github.com/ethereum-optimism/optimism/tree/master/packages/contracts/deployments) of the [`contracts` package](https://github.com/ethereum-optimism/optimism/tree/master/packages/contracts).
Take a look at the [Contract Overview](/docs/protocol/protocol.md) for a list of all protocol contracts and their purpose within the system.

## [@eth-optimism/contracts](https://github.com/ethereum-optimism/optimism/tree/master/packages/contracts)

The easiest way to interact with the Optimistic Ethereum protocol contracts is to use the [@eth-optimism/contracts](https://github.com/ethereum-optimism/optimism/tree/master/packages/contracts) npm package.
You can use this package to get an interface or factory instance for any of the OE contracts.

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
const iface = getContractInterface("OVM_CanonicalTransactionChain"); // or whatever contract
```

#### `getContractFactory`

```js
const { getContractFactory } = require("@eth-optimism/contracts");

// Returns an ethers.ContractFactory object
const factory = getContractFactory("OVM_CanonicalTransactionChain"); // or whatever contract
```

#### `getL1ContractData`

```js
const { getL1ContractData } = require("@eth-optimism/contracts");

// Returns an ethers.Contract object at the correct address
const contract = getL1ContractData("mainnet").OVM_CanonicalTransactionChain; // or whatever contract
```

#### `getL2ContractData`

```js
const { getL2ContractData } = require("@eth-optimism/contracts");

// Returns an ethers.Contract object at the correct address
const contract = getL2ContractData().OVM_ETH; // or whatever contract
```

#### `predeploys`

```js
const { predeploys } = require("@eth-optimism/contracts");

// Returns an address (string)
const ovmETHAddress = predeploys.OVM_ETH; // or whatever contract
```