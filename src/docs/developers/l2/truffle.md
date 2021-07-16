---
title: Truffle Tooling
lang: en-US
---

# {{ $frontmatter.title }}


::: tip
For detailed step by step instructions [see the
tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/truffle).
:::


## Unboxing

The easiest way to develop an Optimistic application in Truffle is to start with
these commands:

```sh
truffle unbox optimism
yarn install
```

## Command Line

In the command-line just add a `--config truffle-config.ovm.js --network optimistic_ethereum` to the command. For example,

```sh
truffle test --config truffle-config.ovm.js --network optimistic_ethereum
```

## The Configuration File

If you want to understand what the fields in the configuration file mean,
[click here](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/truffle#truffle-configuration).