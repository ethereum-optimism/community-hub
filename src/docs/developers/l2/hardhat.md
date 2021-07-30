---
title: Tooling for Hardhat
lang: en-US
---

# {{ $frontmatter.title }}

::: tip
For more detailed step by step instructions [check out the hardhat tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/hardhat).
:::

## Installation

All you need to start building apps for Optimistic Ethereum with [hardhat](https://hardhat.org) is the `@eth-optimism/hardhat-ovm` package.
Install it via `npm` or `yarn`:

```sh
yarn add @eth-optimism/hardhat-ovm
```

## Configuration

You'll need to make the following two changes to `hardhat.config.js`:

1. Import the plugin:

   ```javascript
   // hardhat.config.js
   ...
   require('@eth-optimism/hardhat-ovm')
   ...
   ```

1. Add an `optimistic` network to your exported config:

   ```javascript
   ...
   module.exports = {
      ...
      networks: {
         ...
         optimistic: {
            url: 'http://127.0.0.1:8545', // this is the default port
            accounts: { mnemonic: 'test test test test test test test test test test test junk' },
            gasPrice: 15000000, // required
            ovm: true // required
         }
      }
      ...
   }
      
   ```

## Usage

Simply add `--network optimistic` whenever you want to test, deploy, or compile an Optimistic Ethereum app.
For instance:

```sh
npx hardhat compile --network optimistic
```
