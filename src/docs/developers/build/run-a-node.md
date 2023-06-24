---
title: Running an OP Mainnet or testnet
lang: en-US
---

If you're looking to build an app on OP Mainnet you'll need access to an OP Mainnet node. You have two options - use a hosted node from providers like Alchemy or run your own. 

## Hosted node providers

You can get a free, hosted one from [any of these providers](../../useful-tools/providers.md) to get up and building quickly. Of them, [Alchemy](https://www.alchemy.com/optimism) is our preferred node provider, and is used to power our [public endpoint](../../useful-tools/networks.md). 

However, you might be interested in running your very own node.
Here we'll go over the process of running an OP Mainnet or testnet node for yourself.

## Upgrades

If you run a node you need to subscribe to [an update feed](../releases.md) (either [the mailing list](https://groups.google.com/a/optimism.io/g/optimism-announce) or [the RSS feed](https://changelog.optimism.io/feed.xml)) to know when to upgrade. 
Otherwise, your node will eventually stop working.

## Configuration choices

### Hardware requirements

Replicas need to store the transaction history of OP Mainnet (or the relevant OP testnet) and to run Geth. 
They need to be relatively powerful machines (real or virtual). 
We recommend at least 16 GB RAM, and an SSD drive with at least 500 GB free (for OP Mainnet).

### Source of synchronization


[The `op-geth` component](../bedrock/explainer.md#execution-client) synchronizes from both other OP Mainnet (or testnet) nodes (https://github.com/ethereum-optimism/optimism/blob/develop/specs/exec-engine.md#happy-path-sync), meaning L2, [and Ethereum (or the appropriate L1 testnet)](https://github.com/ethereum-optimism/optimism/blob/develop/specs/exec-engine.md#worst-case-sync) if necessar.

To synchronize only from L1, you edit the [op-node configuration](https://github.com/ethereum-optimism/optimism/blob/develop/specs/rollup-node.md) to set `OP_NODE_P2P_DISABLE` to `true`.

When you use RPC to get block information (https://github.com/ethereum-optimism/optimism/blob/develop/specs/rollup-node.md#l2-output-rpc-method), you can specify one of four options for `blockNumber`:

- an actual block number
- **pending**: Latest L2 block
- **latest**: Latest block written to L1
- **finalized**: Latest block fully finalized on L1 (a process that takes 12 minutes with Proof of Stake)



## Docker configuration

The recommended method to create a replica is to use [Docker](https://www.docker.com/) and the Docker images we provide for [`op-geth`](https://github.com/ethereum-optimism/op-geth/releases/latest) and [`op-node`](https://github.com/ethereum-optimism/optimism/releases/).
For `op-node` you need to scroll down to the latest release that has `op-node`.

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

   - [OP Mainnet](https://datadirs.optimism.io/mainnet-bedrock.tar.zst)
   - [OP Goerli](https://datadirs.optimism.io/goerli-bedrock.tar.zst)

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
  --verbosity=3 \
  --rollup.disabletxpoolgossip=true \
  --nodiscover \
  --syncmode=full \
  --maxpeers=0 \
  --datadir ./datadir \
  --rollup.sequencerhttp= << URL TO OP Mainnet or testnet >>
```

Make sure the change `<< URL TO OP Mainnet or testnet >>` to a service provider's URL for the OP network (either OP Mainnet or an OP testnet).


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
