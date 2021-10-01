---
title: Tooling for Truffle in OVM 1.0
lang: en-US
---

::: tip OVM 2.0 Release Dates
OVM 2.0 will be released October 14th on the Kovan test network,
and October 28th into the production Optimistic Ethereum network.
:::

# {{ $frontmatter.title }}

::: danger OVM 1.0 Page
This page refers to the **current** state of the Optimistic Ethereum
network. Some of the information may be relevant to OVM 2.0, which will
be deployed in October, but some of it may change.
:::

::: warning
There is an [open issue](https://github.com/ethereum-optimism/optimism/issues/1081) that could cause a problem when following these directions.
:::

::: tip
This page is about adding Optimistic Ethereum to an existing Truffle
project. If you want to start from the Truffle Optimism Box,
[see the
tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/truffle).
:::

## Installation

Install the following packages via `yarn` or `npm`:

```sh
yarn add @truffle/hdwallet-provider
yarn add @eth-optimism/core-utils @eth-optimism/plugins @eth-optimism/solc
```

## Configuration

Create a new configuration file called `truffle-config-ovm.js`:

```javascript
// truffle-config-ovm.js
const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
  networks: {
    optimistic: {
      network_id: 420,
      gas: 15000000,
      provider: function() {
        return new HDWalletProvider({
          mnemonic: {
            phrase: 'test test test test test test test test test test test junk'
          },
          providerOrUrl: "http://127.0.0.1:8545/",
          addressIndex: 0,
          numberOfAddresses: 1,
          chainId: 420
        })
      }
    }
  },
  compilers: {
    solc: {
      version: "node_modules/@eth-optimism/solc",
    }
  }
}; 
```

## Usage

Simply add `--network optimistic --config truffle-config-ovm.js` whenever you want to test, deploy, or compile an Optimistic Ethereum app.
For instance:

```sh
truffle test --network optimism --config truffle-config-ovm.js
```
