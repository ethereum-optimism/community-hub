---
title: Using your favorite tools
lang: en-US
---

How do you use your favorite tools for building contracts when you're working with Optimism?
Just use them!

<!--
TODO: We need a page on EVM equivalence.
-->

Optimism isn't just EVM compatible, it's EVM *equivalent*.
All the Ethereum tooling you know and love should work on Optimism without lots of fiddling.
Hardhat? Brownie? Truffle?
Yep, yep, and yep.
If you find a tool that *doesn't* seem to work with Optimism out of the box, try [opening an issue over on GitHub](https://github.com/ethereum-optimism/optimism/issues).
Someone working on Optimism will probably help fix the issue pretty quickly.

## Hardhat

Configuring Hardhat to deploy your contracts to Optimism is a breeze.
Simply add the following to your Hardhat config file:

```js
module.exports = {
  networks: {
    ...
    // for mainnet
    'optimism': {
      url: "https://mainnet.optimism.io",
      accounts: [privateKey1, privateKey2, ...]
    },
    // for testnet
    'optimism-kovan': {
      url: "https://kovan.optimism.io",
      accounts: [privateKey1, privateKey2, ...]
    },
    // for the local dev environment
    'optimism-local': {
      url: "http://localhost:8545",
      accounts: [privateKey1, privateKey2, ...]
    },
  },
  ...
}
```

## Foundry

Foundry supports Optimism out of the box! Just provide an optimism rpc:

```sh
forge create ... --rpc-url=https://kovan.optimism.io/
```

Additionally, you can use [forge-optimism](https://github.com/tarrencev/forge-optimism) to simulate the optimism context and simplify testing.

## Truffle

Configuring Truffle is easy too:

```js
const HDWalletProvider = require('@truffle/hdwallet-provider')

...
module.exports = {
  networks: {
    ...
    // for mainnet
    'optimism': {
      provider: () => {
        return new HDWalletProvider(YOUR_MAINNET_MNEMONIC_GOES_HERE, 'https://mainnet.optimism.io')
      }
      network_id: "10"
    },
    // for testnet
    'optimism-kovan': {
      provider: () => {
        return new HDWalletProvider(YOUR_KOVAN_MNEMONIC_GOES_HERE, 'https://kovan.optimism.io')
      }
      network_id: "69"
    },
    // for the local dev environment
    'optimism-local': {
      provider: () => {
        return new HDWalletProvider('test test test test test test test test test test test junk', 'http://localhost:8545')
      }
      network_id: "420"
    }
  },
  ...
}
```

## Brownie

We're [working on getting Optimism added to the built-in list of networks](https://github.com/eth-brownie/brownie/pull/1362) within Brownie.
For now you can add networks to Brownie manually with the following commands.

Mainnet:

```sh
brownie networks add Optimism optimism-main host=https://mainnet.optimism.io chainid=10 explorer=https://api-optimistic.etherscan.io/api multicall2=0x2DC0E2aa608532Da689e89e237dF582B783E552C
```

Testnet:

```sh
brownie networks add Optimism optimism-test host=https://kovan.optimism.io chainid=69 explorer=https://api-kovan-optimistic.etherscan.io/api multicall2=0x2DC0E2aa608532Da689e89e237dF582B783E552C
```

Local:

```sh
brownie networks add Optimism optimism-local host=https://mainnet.optimism.io chainid=420
```

## Other tools

Got a favorite tool that works well with Optimism?
Want it displayed on this page?
[Make a pull request over on the docs repository](https://github.com/ethereum-optimism/community-hub/pulls)!
