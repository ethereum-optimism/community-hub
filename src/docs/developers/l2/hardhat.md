---
title: Hardhat Tooling
lang: en-US
---

# {{ $frontmatter.title }}

::: tip
This is just a brief overview for reference. For step by step directions [see the
tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/hardhat).
:::

## Node Packages

To use Optimism the Hardhat environment needs one additional package: 
`@eth-optimism/hardhat-ovm`:

```sh
yarn add @eth-optimism/hardhat-ovm
```


## Configuration File

The `hardhat.config.js` file requires two changes:

1. Add the new package:
   ```javascript
   require('@eth-optimism/hardhat-ovm')
   ```
1. Add a network to `module.exports.networks`:
   ```javascript
   optimistic: {
       url: 'http://127.0.0.1:8545',  // Or whereever you run the L2 container       
       accounts: { mnemonic: 'test test test test test test test test test test test junk' },
       gasPrice: 15000000,          
       ovm: true // This sets the network as using the ovm and ensure contract will be compiled against that.
    }
    ```

## Command Line

In the command-line just add a `--network optimistic` to the command. For example,

```sh
npx hardhat compile --network optimistic
```
