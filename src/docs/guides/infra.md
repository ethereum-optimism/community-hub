---
title: Infrastructure providers' guide (Bedrock edition)
lang: en-US
---

::: warning This guide is for bedrock
This guide is for the *bedrock* upgrade, which is coming in the second half of 2022.
Do not attempt to use it prior to that upgrade.
:::

This document provides an overview of how the Bedrock upgrade will impact infrastructure providers. 
To learn more about how Bedrock itself works and its motivations, please see [the specs on GitHub](https://github.com/ethereum-optimism/optimism/tree/develop/specs).


## Deployment Overview

### Key Differences

- There is no more DTL.
- Nodes can sync over a peer-to-peer network just like L1.
- Transactions are distributed over a peer-to-peer network just like L1.
- The sequencer has a mempool now, and produces blocks on a fixed interval just like post-Merge L1.
- There is no more `getBlockRange` RPC, since this was used primarily by the DTL.
- Historical data (pre-bedrock) is served by a read-only version of our existing Geth node. 
  RPC requests are automatically routed between historical and non-historical Geth using a new component called the Daisy Chain.

## Components

![Components-Providers.drawio.png](../../assets/docs/guides/infra/Components-Providers.drawio.png)

### Rollup Node

- The Rollup Node is a Go binary that derives and distributes L2 blocks.
- It uses Geth’s new Engine API to append the blocks it derives to the canonical chain.
- It communicates over a peer-to-peer network to download blocks that haven’t been submitted to L1 yet.
- It detects and handles L1 reorgs.

### Bedrock Geth

- The Bedrock Geth node is a vanilla Geth 1.10.x instance with a minimal Optimism-specific diff applied.
- It syncs unconfirmed transactions over a peer-to-peer network using Geth’s build in transaction pool.
- It syncs state to other Bedrock Geth nodes using Geth’s build in snap sync mechanism.
- It serves the Engine API to the Rollup Node.

### Legacy Geth

- A stripped-down, read-only version of the legacy (i.e., pre-Bedrock) `l2geth` node.
- Serves historical data to the Daisy Chain.
- The Legacy Geth instance will ship with a pre-populated database. As a result, it does not perform need to sync any state.

### Daisy Chain

- The Daisy Chain is an RPC request router. It sends requests for historical chain data to the Legacy Geth node, and requests for current chain data to the Bedrock Geth node.


## Guidelines

1. The Bedrock Geth node is deployed identically to an L1 Geth node:
    1. It needs access to Ethereum’s peer-to-peer network.
    2. It needs a large attached disk to store its state.
    3. Its RPC ports need to be accessible in order for users to submit transactions and read chain data.
    4. The Bedrock Geth node needs to be accessible by the Rollup Node in order for the Engine API to function correctly.
2. The Rollup Node can be deployed as a single container.
    1. It needs access to an L1 RPC endpoint.
    2. It needs access to the Bedrock Geth node, preferably over a WebSocket connection.
    3. It needs access to the Rollup Node’s peer-to-peer network.
    4. The Rollup Node is stateless, so it does not need a writable disk.
3. Don’t try to run multiple Bedrock Geth nodes per Rollup Node or vice versa. Always deploy them in pairs.
    1. In a Kubernetes deployment, the Rollup Node might be deployed as a sidecar to the Bedrock Geth node.
4. The Legacy Geth node is deployed similarly to an L1 Geth node, except:
    1. The node is read-only, so it will not run any transaction pooling or sync logic.
    2. Since the state of the Legacy Geth node is immutable, it is safe to run unlimited Legacy Geth nodes behind a load balancer without worrying about consistency problems.
5. The Daisy Chain is deployed similarly to any proxy container:
    1. It needs access to the RPC endpoints of a Legacy Geth and Bedrock Geth node.
    2. The Geth nodes the Daisy Chain routes to can be behind load balancers, as long as the load balancers only contain Geth nodes of a single type (i.e., do not mix Legacy and Bedrock Geth nodes behind the same LB).

## Upgrade Plan

### Testnets

Prior to upgrading mainnet, we will be running a series of testnets. The last testnet will replace our existing Kovan testnet, and run for an entire month to give developers time to fix any integration issues they may encounter. Proposed dates are as follows:

<!--
::: warning
⚠️ These dates are tentative, and subject to change!
:::

1. Infra Providers Testnet (codename “Memphis”): June 6 - June 17
2. Kovan Testnet (codename “Manhattan”): June 27 - July 22

We aim to have binaries/containers ready for testing approximately two weeks prior to the Memphis testnet. This will give everyone time to update their infrastructure when the testnet begins.
-->

### Upgrade Process

The high level upgrade process looks like this:

#### Optimism Upgrade Steps

1. At a predefined block height, we disable the sequencer and take a state snapshot.
2. We upgrade our smart contracts.
3. We generate a `genesis.json` file from the state snapshot.
4. We initialize the sequencer with the `genesis.json` file.
5. We redeploy our Legacy Geth instances with the state snapshot.
6. We give infra providers the following artifacts:
    1. The `genesis.json` file for the sequencer.
    2. The state snapshot for Legacy Geth.
    3. The genesis hashes that the Rollup Node needs as part of its configuration.
7. We wait for infrastructure providers to upgrade.
8. We re-enable the sequencer.

#### Infra Provider Upgrade Steps

Upon receipt of the `genesis.json`, state snapshot, and genesis hashes:

1. Redeploy Legacy Geth with the provided state snapshot.
2. Initialize Bedrock Geth with the provided `genesis.json` file.
3. Configure the Rollup Node to use the provided genesis hashes.