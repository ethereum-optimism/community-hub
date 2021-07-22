---
title: Truffle Tooling
lang: en-US
---

# {{ $frontmatter.title }}


::: warning
There is an [open issue](https://github.com/ethereum-optimism/optimism/issues/1081) that could cause a problem when following these
directions.
:::

::: tip

This page is about adding Optimistic Ethereum to an existing Truffle
project. If you want to start from the Truffle Optimism Box,
[see the
tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/truffle).
:::

## Node Packages

In addition to `@truffle/hdwaller-provider`, an Optimistic Ethereum
Truffle project requirees `@eth-optimism/plugins` and `eth-optimism/solc`.

```sh
truffle init   
yarn add @truffle/hdwallet-provider
yarn add @eth-optimism/core-utils @eth-optimism/plugins @eth-optimism/solc
```

## Configuration File

Replace `truffle-config.js` with this file (or add the appropriate
definitions to the existing one):

```javascript
const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = 'test test test test test test test test test test test junk'

module.exports = {
  networks: {
    development: {
      network_id: 420,
      gas:      15000000,
      provider: function() {
        return new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic
          },
          providerOrUrl: "http://127.0.0.1:8545/",
          addressIndex: 0,
          numberOfAddresses: 1,
          chainId: 420
        })
      }
    }
  },

   // Configure your compilers
  compilers: {
    solc: {
      version: "node_modules/@eth-optimism/solc",
    }
  }
}; 
```

Notice that there are two definitions in `module.exports`:
- `networks.development` defines the Optimistic Ethereum network.
- `compilers.solc` defines the solidity compiler to use, which needs to be the Optimistic version, rather than the standard compiler, 
[for reasons explained here](/docs/developers/l2/convert.html).
