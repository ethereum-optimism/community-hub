---
title: Truffle Tooling
lang: en-US
---

# {{ $frontmatter.title }}


::: tip
For detailed step by step instructions [see the
tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/truffle).
:::

## Using the Truffle Optimism Box

### Unboxing

The easiest way to develop an Optimistic application in Truffle is to 
start with these commands:

```sh
truffle unbox optimism
yarn install
```

### Command Line

In the command-line just add a `--config truffle-config.ovm.js --network optimistic_ethereum` to the command. For example,

```sh
truffle test --config truffle-config.ovm.js --network optimistic_ethereum
```

### The Configuration File

If you want to understand what the fields in the configuration file mean,
[click here](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/truffle#truffle-configuration).


## Development Without the Truffle Optimism Box

If you want to use Truffle but do not want to use the Truffle Optimism box,
you can follow these steps to create a Truffle environment for Optimistic 
development. 

1. Initialize your Truffle environment in a directory

   ```sh
   truffle init
   ```

2. Install the necessary Node.js packages:

   ```sh
   yarn add @truffle/hdwallet-provider
   yarn add @eth-optimism/core-utils @eth-optimism/plugins @eth-optimism/solc
   ```

3. Replace `truffle-config.js` with this file:

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
   - `compilers.solc` defines the solidity compiler to use, which needs to be the Optimistic version,
     rather than the standard compiler, [for reasons explained here](/docs/developers/l2/convert.html).