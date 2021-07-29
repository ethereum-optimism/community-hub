---
title: Developer Tools
lang: en-US
tags:
    - contracts
    - high-level
---

# {{ $frontmatter.title }}

## [optimism](https://github.com/ethereum-optimism/optimism/tree/master/ops)

`optimism` is the primary monorepo that implements the Optimistic Ethereum protocol.
You can use the tools within the `optimism` monorepo to:
1. [Run a local Optimistic Ethereum environment for development.](https://github.com/ethereum-optimism/optimism/#development-quick-start)
2. [Run a node connected to a live Optimistic Ethereum network.](https://github.com/optimisticben/op-replica)
3. And much more...

## [@eth-optimism/hardhat-ovm](https://github.com/ethereum-optimism/optimism/tree/master/packages/hardhat-ovm)

`@eth-optimism/hardhat-ovm` is a plugin for [hardhat](https://hardhat.org) that makes it easy to start building Optimistic apps.

### Installation

1. Install the plugin via `npm` or `yarn`:

```sh
npm install @eth-optimism/hardhat-ovm
```

2. Add the plugin to your `hardhat.config.js`:

```js
// hardhat.config.js
...
require("@eth-optimism/hardhat-ovm");
...
```

3. Update your `hardhat.config.js`:

```js
// hardhat.config.js
...
module.exports = {
  ...
  networks: {
    // Add this network to your config!
    optimistic: {
       url: 'http://127.0.0.1:8545',
       accounts: { mnemonic: 'test test test test test test test test test test test junk' },
       gasPrice: 15000000,
       ovm: true
    }
  }
  ...
}
...
```

### Usage

See the [Optimistic hardhat tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/hardhat) for detailed usage instructions.

## [@eth-optimism/contracts](https://github.com/ethereum-optimism/optimism/tree/master/packages/contracts)

Another `Node.js` package that exports useful tools for interacting with the Optimistic Ethereum smart contracts.

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