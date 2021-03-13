---
title: The Temporary™ Developer Dump
lang: en-US
tags:
    - contracts
    - high-level
    - buidling
    - building
---

# {{ $frontmatter.title }}

Staging for other docs and TL;DRs.

## Running a node locally

Spin up a Layer 1 (Ethereum) node on port 9545 and a Layer 2 (Optimistic Ethereum) node on port 8545:

```
git clone git@github.com:ethereum-optimism/optimism-integration.git --recurse-submodules
cd optimism-integration
docker-compose pull
make up
```

* Change configuration in [`docker-compose.env.yml`](https://github.com/ethereum-optimism/optimism-integration/blob/master/docker-compose.env.yml).
* **Default chain ID is 420**.
* Transactions are free in dev mode, no need to give yourself a balance.

## Connecting to testnet (Kovan)

* Network Name: Optimistic Ethereum (Kovan)
* New RPC URL: https://kovan.optimism.io
* Chain ID: 69
* Currency Symbol: ETH
* Block Explorer URL: https://kovan-l2-explorer.surge.sh

## Connecting to mainnet

::: tip Warning
Contract deployment is currently disabled on the Optimistic Ethereum mainnet.
You can interact with Synthetix contracts but you can't do much else right now.
For now, use testnet if you want to deploy contracts. 😊
:::

* Network Name: Optimistic Ethereum
* New RPC URL: https://mainnet.optimism.io
* Chain ID: 10
* Currency Symbol: ETH
* Block Explorer URL: https://mainnet-l2-explorer.surge.sh

## Compiling with remix

1. Head over to [https://remix.ethereum.org](https://remix.ethereum.org).
2. Click on the plugins button (it looks like a plug 🔌).
3. Search for "optimism" and click `Activate`.
4. Click the Optimism Compiler plugin button (it looks like an "O" ⭕).
5. Select a compiler version.
6. Click `Compile`.

**Same instructions in video form:**
<video width="100%" controls>
  <source src="../../assets/videos/remix.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Using hardhat-deploy

Coming very soon!

