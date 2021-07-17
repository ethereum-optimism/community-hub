---
title: Truffle Tooling
lang: en-US
---

# {{ $frontmatter.title }}


::: tip
For detailed step by step instructions [see the
tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/truffle).
:::

## Using the Box

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


## Without the Truffle Optimism Box

If you want to use Truffle but do not want to use the Truffle Optimism box,
follow these steps:

1. Initialize your Truffle environment in a directory

   ```sh
   truffle init
   ```

2. Install the necessary Node.js packages:

   ```sh
   yarn add @truffle/hdwallet-provider
   yarn add @eth-optimism/core-utils @eth-optimism/plugins @eth-optimism/solc
   ```

3.    