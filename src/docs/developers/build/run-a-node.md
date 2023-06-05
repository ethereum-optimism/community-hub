---
title: Running a testnet or mainnet node
lang: en-US
---

If you're looking to build an app on Optimism you'll need access to an Optimism node. You have two options - use a hosted node from providers like Alchemy or run your own. 

## Hosted node providers

You can get a free, hosted one from [any of these providers](../../useful-tools/providers.md) to get up and building quickly. Of them, [Alchemy](https://www.alchemy.com/optimism) is our preferred node provider, and is used to power our [public endpoint](../../useful-tools/networks.md). 

However, you might be interested in running your very own Optimism node.
Here we'll go over the process of running a testnet or mainnet Optimism node for yourself.

## Upgrades

If you run a node you need to subscribe to [an update feed](../releases.md) (either [the mailing list](https://groups.google.com/a/optimism.io/g/optimism-announce) or [the RSS feed](https://changelog.optimism.io/feed.xml)) to know when to upgrade. 
Otherwise, your node will eventually stop working.

## Configuration choices

### Hardware requirements

Replicas need to store the transaction history of Optimism and to run Geth. 
They need to be relatively powerful machines (real or virtual). 
We recommend at least 16 GB RAM, and an SSD drive with at least 100 GB free.

### Source of synchronization

<details>
<summary><b>Pre-Bedrock (current version)</b></summary>

Prior to Bedrock you choose one of two configurations.

- **Replicas** replicate from L2 (Optimism).
  Replicas gives you the most up to date information, at the cost of having to trust Optimism's updates.

- **Verifiers** replicate from L1 (Ethereum).
  Verifiers read and execute transactions from the canonical block chain. 
  As a result, the only way for them to have inaccurate information is an [Ethereum reorg](https://www.paradigm.xyz/2021/07/ethereum-reorgs-after-the-merge#post-merge-ethereum-with-proof-of-stake), an extremely rare event. 

</details>

<details>
<summary><b>Bedrock (coming late 2022)</b></summary>

In Bedrock the [op-geth](https://community.optimism.io/docs/developers/bedrock-temp/infra/#bedrock-geth) typically synchronizes from other Optimism nodes (https://github.com/ethereum-optimism/optimism/blob/develop/specs/exec-engine.md#happy-path-sync), meaning L2, but it can [synchronize from L1](https://github.com/ethereum-optimism/optimism/blob/develop/specs/exec-engine.md#worst-case-sync) if necessary.

To synchronize only from L1, you edit the [op-node configuration](https://github.com/ethereum-optimism/optimism/blob/develop/specs/rollup-node.md) to set `OP_NODE_P2P_DISABLE` to `true`.

When you use RPC to get block information (https://github.com/ethereum-optimism/optimism/blob/develop/specs/rollup-node.md#l2-output-rpc-method), you can specify one of four options for `blockNumber`:

- an actual block number
- **pending**: Latest L2 block
- **latest**: Latest block written to L1
- **finalized**: Latest block fully finalized on L1 (a process that takes 12 minutes with Proof of Stake)


</details>

## Docker configuration

The recommended method to create a replica is to use [Docker](https://www.docker.com/) and the [Docker images we provide](https://hub.docker.com/u/ethereumoptimism). 
They include all the configuration settings.
This is the recommended method because it is what we for our own systems.
As such, the docker images go through a lot more tests than any other configuration.

### Configuring and running the node

Follow [these instructions](https://github.com/smartcontracts/simple-optimism-node) to build and run the node.


## Non-docker configuration

Here are the instructions if you want to build you own read-only replica without relying on our images.
These instructions were generated on an Ubuntu 20.04 box, but they should work with other systems too.

**Note:** This is *not* the recommended configuration.
While we did QA on these instructions and they work, the QA that the docker images undergo is much more extensive.


### Build the Optimism Monorepo

1. Clone the [Optimism Monorepo](https://github.com/ethereum-optimism/optimism).

    ```bash
    cd ~
    git clone https://github.com/ethereum-optimism/optimism.git
    ```

1. Install required modules. 
   This is a slow process, while it is running you can already start building `op-geth`, as shown below.

    ```bash
    cd optimism
    yarn install
    ```

1. Build the various packages inside of the Optimism Monorepo.

    ```bash
    make op-node
    yarn build
    ```

### Build op-geth

1. Clone [`op-geth`](https://github.com/ethereum-optimism/op-geth):

    ```bash
    cd ~
    git clone https://github.com/ethereum-optimism/op-geth.git
    ```


1. Build `op-geth`:

    ```bash
    cd op-geth    
    make geth
    ```



### Get the data dir

The next step is to download the data directory for `op-geth`.

1. Download the correct data directory snapshot.

   - [Optimism Goerli](https://storage.googleapis.com/oplabs-goerli-data/goerli-bedrock.tar)

1. Create the data directory in `op-geth` and fill it.
   Note that these directions assume the data directory snapshot is at `~`, the home directory. Modify if needed.

   ```sh
   cd ~/op-geth
   mkdir datadir
   cd datadir
   tar xvf ~/*bedrock.tar
   ```

1. Create a shared secret with `op-node`:

   ```sh
   cd ~/op-geth
   openssl rand -hex 32 > jwt.txt
   cp jwt.txt ~/optimism/op-node
   ```

### Scripts to start the different components

#### `op-geth`

```
#! /usr/bin/bash

cd ~/op-geth

./build/bin/geth \
  --ws \
  --ws.port=8546 \
  --ws.addr=0.0.0.0 \
  --ws.origins="*" \
  --http \
  --http.port=8545 \
  --http.addr=0.0.0.0 \
  --http.vhosts="*" \
  --http.corsdomain="*" \
  --authrpc.addr=localhost \
  --authrpc.jwtsecret=./jwt.txt \
  --authrpc.port=8551 \
  --authrpc.vhosts="*" \
  --datadir=/data \
  --verbosity=3 \
  --rollup.disabletxpoolgossip=true \
  --nodiscover \
  --syncmode=full \
  --maxpeers=0 \
  --datadir ./datadir \
  --rollup.sequencerhttp= << URL TO OPTIMISM >>
```

Make sure the change `<< URL TO OPTIMISM>>` to a service provider's URL for the Optimism network (either the production one or Optimism Goerli).


#### `op-node`

```
#! /usr/bin/bash

cd ~/optimism/op-node

./bin/op-node \
        --l2=http://localhost:8551 \
        --l2.jwt-secret=./jwt.txt \
        --network=goerli \
        --rpc.addr=0.0.0.0 \
        --rpc.port=8547 \
        --p2p.disable \
        --l1= << URL TO L1 >>       
```        

Make sure to change `<< URL to L1 >>` to a service provider's URL for the L1 network (either L1 Ethereum or Goerli).


### Operations

It is best to start `op-geth` first and shut it down last.