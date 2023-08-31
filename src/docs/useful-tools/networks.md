---
title: Networks, Public RPC Endpoints, & APIs
lang: en-US
---

::: warning
Some API calls, such as those in the [personal namespace](https://geth.ethereum.org/docs/rpc/ns-personal) make no sense in a shared environment.
Such RPCs are either totally unsupported, or will return nonsensical values.
:::

## OP Mainnet

| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimism`** |
| Description | **`Mainnet`** |
| Chain ID | **`10`** |
| Explorer | **[https://explorer.optimism.io](https://explorer.optimism.io)** |
| HTTP Endpoint | Optimism also provides this endpoint: **`https://mainnet.optimism.io`.** _But it is not for production systems and is rate limited._   |
| Sequencer URL<sup>1</sup> | **`https://mainnet-sequencer.optimism.io/`** |
| L1 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/mainnet#layer-1-contracts) |
| L2 Contract Addresses | [link](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/mainnet#layer-2-contracts) |
| chainid.link | [https://chainid.link/?network=optimism](https://chainid.link/?network=optimism)

(1) The sequencer URL is write only, it only accepts `eth_sendRawTransaction` requests.

::: tip Developer Tip 
If you are seeing rate limit issues when testing with the public end point, or if you need websocket functionality, we recommend signing up for a third-party [provider](../useful-tools/providers.md).
:::

### Contract addresses

The authoritative list of contract addresses is [in the monorepo](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts-bedrock/deployments/mainnet).
They are reproduced here for convenience.

| Contract name | Address |
| - | -
| L1CrossDomainMessenger | [`0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1`](https://etherscan.io/address/0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1)
| L1ERC721Bridge | [`0x5a7749f83b81B301cAb5f48EB8516B986DAef23D`](https://etherscan.io/address/0x5a7749f83b81B301cAb5f48EB8516B986DAef23D)
| L1StandardBridge | [`0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1`](https://etherscan.io/address/0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1)
| L2OutputOracle | [`0xdfe97868233d1aa22e815a266982f2cf17685a27`](https://etherscan.io/address/0xdfe97868233d1aa22e815a266982f2cf17685a27) 
| OptimismMintableERC20Factory | [`0x75505a97BD334E7BD3C476893285569C4136Fa0F`](https://etherscan.io/address/0x75505a97BD334E7BD3C476893285569C4136Fa0F) 
| OptimismPortal | [`0xbEb5Fc579115071764c7423A4f12eDde41f106Ed`](https://etherscan.io/address/0xbEb5Fc579115071764c7423A4f12eDde41f106Ed) | 
| PortalSender | [`0x0A893d9576b9cFD9EF78595963dc973238E78210`](https://etherscan.io/address/0x0A893d9576b9cFD9EF78595963dc973238E78210)
| ProxyAdmin | [`0x543bA4AADBAb8f9025686Bd03993043599c6fB04`](https://etherscan.io/address/0x543bA4AADBAb8f9025686Bd03993043599c6fB04)
| SystemConfig | [`0x229047fed2591dbec1eF1118d64F7aF3dB9EB290`](https://etherscan.io/address/0x229047fed2591dbec1eF1118d64F7aF3dB9EB290)
| SystemDictator | [`0xB4453CEb33d2e67FA244A24acf2E50CEF31F53cB`](https://etherscan.io/address/0xB4453CEb33d2e67FA244A24acf2E50CEF31F53cB)
| Batch Inbox Address | [`0xff00000000000000000000000000000000000010`](https://etherscan.io/address/0xff00000000000000000000000000000000000010)


### Parameters for node operators

These parameters are mostly useful to people responsible for running and administering network nodes.

| Parameter      | Value |
| -------------- | ----- |
| L1 Chain ID    | 1 |
| Rollup Config  | This network does not require a rollup config. Specify `--network=mainnet` on the command line
| Withdrawal period | 1 week |



#### Links

::: tip
  
Links to download data directories will be posted here as soon as they are available.
  
:::
  

- [Bedrock Data Directory (303 GB)<sup>1</sup>](https://datadirs.optimism.io/mainnet-bedrock.tar.zst). 
  The `sha512sum` for this file is `c17067b7bc39a6daa14f71d448c6fa0477834c3e68a25e96f26fe849c12a09bffe510e96f7eacdef19e93e3167d15250f807d252dd6f6f9053d0e4457c73d5fb`.
- [Legacy Geth Data Directory (2.9TB)<sup>1</sup>](https://datadirs.optimism.io/mainnet-legacy-archival.tar.zst).
  The `sha512sum` for this file is `e348488c458baa755510f23bbc8601619bc66bea78a89354c949ba7be3c6b39ed7dd2c50516621e38df6120299407da0d24445b96bf94a50364ed07bb8234b26`.
  Note that you *only* need this file if you run `l2geth` to answer archive queries prior to the bedrock upgrade. 
  If you are running an archive only for post-bedrock transactions (using `op-geth` with the command line flag `gcmode=archive`), you do *not* need this file.
- [Configuration parameters](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/deploy-config/mainnet.json).
- [Latest release of `op-geth`](https://github.com/ethereum-optimism/op-geth/releases/latest)
- [Latest release of `op-node`](https://github.com/ethereum-optimism/optimism/releases/) - you need to scroll down until you get a release that has `op-node` in it.
- [Legacy geth](https://hub.docker.com/layers/ethereumoptimism/l2geth/0.5.31/images/sha256-5577036dc36d167d11f5ac49b91cc0a3d835574928a9563783c2e70309e5eb28?context=explore).
  

(1) This file is compressed with `zstd`. 
We recommend that users install the command line tool if it is not already installed on their system. 
`tar -xf` will work without installing anything if you have an up to date version of `tar`. 
If you want to decompress separately, we recommend `pzstd -d`  or `zstd -d` (pzstd will likely be faster).


## OP Goerli

::: tip Purpose
This is our current test network. Note that OP Goerli is planned to be deprecated in Q4 2023. Please migrate to OP Sepolia before then.
:::



| Parameter | Value |
| --------- | ----- |
| Network Name | **`Optimism Goerli`** |
| Description | **`Testnet (public)`** |
| Chain ID | **`420`** |
| Explorer | **[https://goerli-explorer.optimism.io](https://goerli-explorer.optimism.io)** |
| HTTP Endpoint | **`https://goerli.optimism.io`** |
| Sequencer URL<sup>1</sup> | **`https://goerli-sequencer.optimism.io/`** |
| chainid.link | [https://chainid.link/?network=optimism-goerli](https://chainid.link/?network=optimism-goerli)

(1) The sequencer URL is write only, it only accepts `eth_sendRawTransaction` requests.

### Contract addresses

The authoritative list of contract addresses is [in the monorepo](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts-bedrock/deployments/goerli).
They are reproduced here for convenience

| Contract name | Address |
| - | -
| L1CrossDomainMessenger | [`0x5086d1eEF304eb5284A0f6720f79403b4e9bE294`](https://goerli.etherscan.io/address/0x5086d1eEF304eb5284A0f6720f79403b4e9bE294)
| L1ERC721Bridge | [`0x0F9C590b958002E8B10a7431979c1aF882772E88`](https://goerli.etherscan.io/address/0x0F9C590b958002E8B10a7431979c1aF882772E88)
| L1StandardBridge | [`0x636Af16bf2f682dD3109e60102b8E1A089FedAa8`](https://goerli.etherscan.io/address/0x636Af16bf2f682dD3109e60102b8E1A089FedAa8)
| L2OutputOracle | [`0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0`](https://goerli.etherscan.io/address/0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0)
| OptimismMintableERC20Factory | [`0x883dcF8B05364083D849D8bD226bC8Cb4c42F9C5`](https://goerli.etherscan.io/address/0x883dcF8B05364083D849D8bD226bC8Cb4c42F9C5)
| OptimismPortal | [`0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383`](https://goerli.etherscan.io/address/0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383)
| PortalSender | [`0xe7FACd39531ee3C313330E93B4d7a8B8A3c84Aa4`](https://goerli.etherscan.io/address/0xe7FACd39531ee3C313330E93B4d7a8B8A3c84Aa4)
| ProxyAdmin | [`0x01d3670863c3F4b24D7b107900f0b75d4BbC6e0d`](https://goerli.etherscan.io/address/0x01d3670863c3F4b24D7b107900f0b75d4BbC6e0d)
| SystemConfig | [`0xAe851f927Ee40dE99aaBb7461C00f9622ab91d60`](https://goerli.etherscan.io/address/0xAe851f927Ee40dE99aaBb7461C00f9622ab91d60)
| SystemDictator | [`0x1f0613A44c9a8ECE7B3A2e0CdBdF0F5B47A50971`](https://goerli.etherscan.io/address/0x1f0613A44c9a8ECE7B3A2e0CdBdF0F5B47A50971)
| Batch Inbox Address | [`0xff00000000000000000000000000000000000420`](https://goerli.etherscan.io/address/0xff00000000000000000000000000000000000420)

### Test ETH

If you already have Goerli ETH, you can [bridge it](https://app.optimism.io/bridge). For more faucet options see [Network Faucets](./faucets.md).


### Parameters for node operators

These parameters are mostly useful to people responsible for running and administering network nodes.


| Parameter      | Value |
| -------------- | ----- |
| L1 Chain ID    | 5 |
| Rollup Config  | This network does not require a rollup config. Specify `--network=goerli` on the command line
| Withdrawal period | 12 seconds |



#### Links

- [Bedrock Data Directory (5.0GB)<sup>1</sup>](https://datadirs.optimism.io/goerli-bedrock.tar.zst).
  The `sha512sum` for this file is `7d420ddf34ee5b157d60cf7a9612cb950b24ff1405e1ab944f8d7910c45e7a46907bdb86ea124a8069b15ad9e171776ab5f8ed0146c43b0ff12539f38f262f7d`.
- [Legacy Geth Data Directory (50GB)<sup>1</sup>](https://datadirs.optimism.io/goerli-legacy-archival.tar.zst).
  The `sha512sum` for this file is `5d78c1f2cd5bea062fb979b9d616a5fe4c55b27a444812b91a90340631d7a5f750c4e6e5a352513f3cf102d61586a4e2861f1aa3827e5be8fcae01e2ec291d2a`.
  Note that you *only* need this file if you run `l2geth` to answer archive queries prior to the bedrock upgrade. 
  If you are running an archive only for post-bedrock transactions (using `op-geth` with the command line flag `gcmode=archive`), you do *not* need this file.
- [Configuration parameters](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/deploy-config/goerli.json)
- [Latest releases of `op-geth`](https://github.com/ethereum-optimism/op-geth/releases/latest)
- [Latest release of `op-node`](https://github.com/ethereum-optimism/optimism/releases/) - you need to scroll down until you get a release that has `op-node` in it.
- [Legacy geth](https://hub.docker.com/layers/ethereumoptimism/l2geth/0.5.31/images/sha256-5577036dc36d167d11f5ac49b91cc0a3d835574928a9563783c2e70309e5eb28?context=explore)

(1) This file is compressed with `zstd`. 
We recommend that users install the command line tool if it is not already installed on their system. 
`tar -xf` will work without installing anything if you have an up to date version of `tar`. 
If you want to decompress separately, we recommend `pzstd -d`  or `zstd -d` (pzstd will likely be faster).



## OP Sepolia

::: tip Purpose
This is our latest test network. Note that OP Sepolia is new and still missing some core third-party infra.
:::



| Parameter | Value |
| --------- | ----- |
| Network Name | **`OP Sepolia`** |
| Description | **`Testnet (public)`** |
| Chain ID | **`11155420`** |
| Explorer | (coming soon) |
| HTTP Endpoint | **`https://sepolia.optimism.io`** |
| Sequencer URL<sup>1</sup> | **`https://sepolia-sequencer.optimism.io/`** |

(1) The sequencer URL is write only, it only accepts `eth_sendRawTransaction` requests.

### Contract addresses

The authoritative list of contract addresses is [in the monorepo](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts-bedrock/deployments/sepolia).
They are reproduced here for convenience

| Contract name | Address |
| - | -
| L1CrossDomainMessenger | [`0x58Cc85b8D04EA49cC6DBd3CbFFd00B4B8D6cb3ef`](https://sepolia.etherscan.io/address/0x58Cc85b8D04EA49cC6DBd3CbFFd00B4B8D6cb3ef)
| L1ERC721Bridge | [`0xd83e03D576d23C9AEab8cC44Fa98d058D2176D1f`](https://sepolia.etherscan.io/address/0xd83e03D576d23C9AEab8cC44Fa98d058D2176D1f)
| L1StandardBridge | [`0xFBb0621E0B23b5478B630BD55a5f21f67730B0F1`](https://sepolia.etherscan.io/address/0xFBb0621E0B23b5478B630BD55a5f21f67730B0F1)
| L2OutputOracle | [`0x90E9c4f8a994a250F6aEfd61CAFb4F2e895D458F`](https://sepolia.etherscan.io/address/0x90E9c4f8a994a250F6aEfd61CAFb4F2e895D458F) 
| OptimismMintableERC20Factory | [`0x868D59fF9710159C2B330Cc0fBDF57144dD7A13b`](https://sepolia.etherscan.io/address/0x868D59fF9710159C2B330Cc0fBDF57144dD7A13b) 
| OptimismPortal | [`0x16Fc5058F25648194471939df75CF27A2fdC48BC`](https://sepolia.etherscan.io/address/0x16Fc5058F25648194471939df75CF27A2fdC48BC) | 
| ProxyAdmin | [`0x189aBAAaa82DfC015A588A7dbaD6F13b1D3485Bc`](https://sepolia.etherscan.io/address/0x189aBAAaa82DfC015A588A7dbaD6F13b1D3485Bc)
| SystemConfig | [`0x034edD2A225f7f429A63E0f1D2084B9E0A93b538`](https://sepolia.etherscan.io/address/0x034edD2A225f7f429A63E0f1D2084B9E0A93b538)
| Batch Inbox Address | [`0xff00000000000000000000000000000011155420`](https://sepolia.etherscan.io/address/0xff00000000000000000000000000000011155420)

### Test ETH

If you already have Sepolia ETH, you can deposit it by sending it to the Optimism Portal on L1 Sepolia (`0x16Fc5058F25648194471939df75CF27A2fdC48BC`). To get L1 Sepolia ETH, check out our faucet options in [Network Faucets](./faucets.md).
We are still building out Sepolia support in our [Bridge UI](https://app.optimism.io/bridge). 

### Parameters for node operators

These parameters are mostly useful to people responsible for running and administering network nodes.

| Parameter      | Value |
| -------------- | ----- |
| L1 Chain ID    | 11155111 |
| Rollup Config  | This network does not require a rollup config. Specify `--network=sepolia` on the command line
| Withdrawal period | 12 seconds |



#### Links

- Note that there is no Bedrock Data Directory or Legacy Geth Data Directory required for running OP Sepolia nodes
- [Configuration parameters](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/deploy-config/sepolia.json)
- [Latest releases of `op-geth`](https://github.com/ethereum-optimism/op-geth/releases/latest)
- [Latest release of `op-node`](https://github.com/ethereum-optimism/optimism/releases/latest)
- Note: Unlike on OP Mainnet or OP Goerli, you do not need to run `legacy-geth` to run an archival OP Sepolia node.
