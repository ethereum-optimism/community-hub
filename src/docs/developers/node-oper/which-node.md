---
title: Running your own node
lang: en-US
---

If you're looking to build an app on OP Mainnet you'll need access to an OP Mainnet node. You have two options - use a hosted node from providers like Alchemy or run your own. 


## Hosted node providers

You can get a free, hosted node from [any of these providers](../../useful-tools/providers.md) to get up and building quickly. 
Of them, [Alchemy](https://www.alchemy.com/optimism) is our preferred node provider, and is used to power our [public endpoint](../../useful-tools/networks.md). 

Many applications include a server component that needs to communicate directly with the blockchain, if only to query for information.
Once an application's needs exceed the free tier, you can use one of the paid tiers to continue to use the hosted node provider.


## Should you run your own node?

There are several advantages to running your own node:

- **Cost**. If your application runs a lot of queries ([`eth_call`](https://docs.alchemy.com/reference/eth-call-optimism), [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas-optimism), etc.) it might be cheaper to run your own node instead of using a service provider.
- **Verification**. Some types of application need to *know* that the state commitments submitted by the sequencer are accurate.
  For example, bridges can allow fast withdrawals because they know that the assets deposited with them on L2 really exist, and belong to the user depositing them.
  Bridges achieve this, before the 


Of course, there are some additional considerations and costs to running a node on your own:

### Hardware

Replicas need to store the transaction history of OP Mainnet (or the relevant OP testnet) and to run both `op-geth` and `op-node`. 
They need to be relatively powerful machines (real or virtual). 
We recommend at least 16 GB RAM, and an SSD drive with at least 500 GB free (for OP Mainnet).
Note that during installation time you'll need more storage because you temporarily need space for a compressed copy of the latest snapshot as well as the decompressed `op-geth` data directory.


### Synchronization

[The `op-node` component](../bedrock/explainer.md#rollup-node) synchronizes from L1.
You need to get L1 Ethereum access from somewhere, either a node provider or a node that your organization runs.

[The `op-geth` component](../bedrock/explainer.md#execution-client) synchronizes from both other OP Mainnet (or testnet) nodes (https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/exec-engine.md#happy-path-sync), meaning L2, [and Ethereum (or the appropriate L1 testnet)](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/exec-engine.md#worst-case-sync) if necessary.

To synchronize only from L1, you edit the [op-node configuration](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/rollup-node.md) to set `OP_NODE_P2P_DISABLE` to `true`.




### Upgrades

At present, the best way to know when to upgrade your software is to look at the software releases on github.


- [`op-geth`](https://github.com/ethereum-optimism/op-geth/releases/latest)
- [`op-node`](https://github.com/ethereum-optimism/optimism/releases/), but because the monorepo is also used for other software, you might need to scroll down to see what is the latest `op-node` release.