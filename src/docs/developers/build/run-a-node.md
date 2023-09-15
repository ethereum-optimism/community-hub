---
title: Running an OP Mainnet or testnet node
lang: en-US
---

If you're looking to build an app on OP Mainnet you'll need access to an OP Mainnet node. You have two options - use a hosted node from a third-party provider or run your own. 

## Hosted node providers

You can get a free, hosted one from [any of these providers](../../useful-tools/providers.md) to get up and building quickly. However, you might be interested in running your very own node. Here we'll go over the process of running an OP Mainnet or testnet node for yourself.

## Upgrades

If you run a node you need to subscribe to [an update feed](../releases.md) (either [the mailing list](https://groups.google.com/a/optimism.io/g/optimism-announce) or [the RSS feed](https://changelog.optimism.io/feed.xml)) to know when to upgrade. 
Otherwise, your node will eventually stop working.

## Configuration choices

### Hardware requirements

Replicas need to store the transaction history of OP Mainnet (or the relevant OP testnet) and to run Geth. 
They need to be relatively powerful machines (real or virtual). 
We recommend at least 16 GB RAM, and an SSD drive with at least 500 GB free (for OP Mainnet).

### Source of synchronization



[The `op-geth` component](../bedrock/explainer.md#execution-client) synchronizes from both other OP Mainnet (or testnet) nodes (https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/exec-engine.md#happy-path-sync), meaning L2, [and Ethereum (or the appropriate L1 testnet)](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/exec-engine.md#worst-case-sync) if necessary.

To synchronize only from L1, you edit the [op-node configuration](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/rollup-node.md) to set `OP_NODE_P2P_DISABLE` to `true`.

When you use RPC to get block information (https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/rollup-node.md#l2-output-rpc-method), you can specify one of four options for `blockNumber`:

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



### Initializing `op-geth`

Initialization is done one of two ways, depending on which network you're deploying:

1. **With a Genesis File:** This is for OP Sepolia, and other testnets or deployments that are not migrated from a legacy network. In this case, you'll download the genesis file and initialize the data directory via `geth init`.
2. **With a Data Directory:** This is used for networks that are migrated from a legacy network. This would include OP Mainnet and OP Goerli. In this case, you'll download a preconfigured data directory and extract it. No further initialization is necessary in this case, because the data directory contains the network's genesis information.

If you're spinning up an OP Mainnet or OP Goerli node, use the [Initialization via Data Directory](#initialization-via-data-directory) path. If you're spinning up an OP Sepolia node, use the [Initialization via Genesis File](#initialization-via-genesis-file) path.

#### Initialization via Data Directory

The next step is to download the data directory for `op-geth`. Note that for OP Sepolia, you do not need to download a data directory.

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

#### Initialization via Genesis File

`op-geth` uses JSON files to encode a network's genesis information. Unlike OP Mainnet and OP Goerli, the genesis for OP Sepolia is not currently included in the `op-geth` binary. For networks that are initialized in this way, you'll receive a URL to the genesis JSON. You'll need to download the genesis JSON, then run the following command to initialize the data directory:

```bash
#!/bin/sh
FILE=/$DATADIR/genesis.json
OP_GETH_GENESIS_URL=https://storage.googleapis.com/oplabs-network-data/Sepolia/genesis.json

if [ ! -s $FILE ]; then
  apk add curl
  curl $OP_GETH_GENESIS_URL -o $FILE
  geth init --datadir /db $FILE
else
  echo "Genesis file already exists. Skipping initialization."
fi
```

::: danger CLI Flag Requirements
Required: `--sepolia`

Do not set:   `--rollup.historicalrpc` and `rollup.historicalrpctimeout`
:::

### Scripts to start the different components

#### `op-geth`

This is the script for OP Sepolia.
For OP Mainnet, OP Goerli (or other OP networks in the future, [get the sequencer URL here](../../useful-tools/networks.md)).

```
#! /usr/bin/bash

SEQUENCER_URL=https://sepolia-sequencer.optimism.io/

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
  --rollup.sequencerhttp=$SEQUENCER_URL \
  --nodiscover \
  --syncmode=full \
  --maxpeers=0 \
  --datadir=./datadir \
```


::: info Snapshots

Snapshots should be enabled by default, but if the node is syncing at the same time as generating the snapshot, both the snapshot generation process & syncing will be slowed down.
The datadirs provided by OP Labs have a pre-generated snapshot. If the node is using a datadir without a snapshot, the two options are to disable snapshots until the node is synced or
to disable peering until snapshots are created and then let the node sync to tip.

If a node is synced using snap sync, it will automatically have snapshots.

:::

#### `op-node`

- Change `<< URL to L1 >>` to the URL of an RPC endpoint for the L1 network (either L1 Ethereum or Goerli or Sepolia). E.g. for an OP Mainnet node, an Infura URL would look like https://mainnet.infura.io/v3/API_KEY
- Set `L1KIND` to the network provider you are using (options: alchemy, quicknode, infura, parity, nethermind, debug_geth, erigon, basic, any).
- Set `NET` to `goerli` or `mainnet` or `sepolia`.


```
#! /usr/bin/bash

L1URL=  << URL to L1 >>
L1KIND=basic
NET=sepolia

cd ~/optimism/op-node

./bin/op-node \
        --l1=$L1UL  \
        --l1.rpckind=$L1KIND \
        --l2=http://localhost:8551 \
        --l2.jwt-secret=./jwt.txt \
        --network=$NET \
        --rpc.addr=0.0.0.0 \
        --rpc.port=8547

```        




### The initial synchronization

The datadir provided by Optimism is not updated continuously, so before you can use the node you need a to synchronize it.

During that process you get log messages from `op-node`, and nothing else appears to happen.

```
INFO [06-26|13:31:20.389] Advancing bq origin                      origin=17171d..1bc69b:8300332 originBehind=false
```

That is normal - it means that `op-node` is looking for a location in the batch queue. 
After a few minutes it finds it, and then it can start synchronizing.

While it is synchronizing, you can expect log messages such as these from `op-node`:

```
INFO [06-26|14:00:59.460] Sync progress                            reason="processed safe block derived from L1" l2_finalized=ef93e6..e0f367:4067805 l2_safe=7fe3f6..900127:4068014 l2_unsafe=7fe3f6..900127:4068014 l2_time=1,673,564,096 l1_derived=6079cd..be4231:8301091
INFO [06-26|14:00:59.460] Found next batch                         epoch=8e8a03..11a6de:8301087 batch_epoch=8301087 batch_timestamp=1,673,564,098
INFO [06-26|14:00:59.461] generated attributes in payload queue    txs=1  timestamp=1,673,564,098
INFO [06-26|14:00:59.463] inserted block                           hash=e80dc4..72a759 number=4,068,015 state_root=660ced..043025 timestamp=1,673,564,098 parent=7fe3f6..900127 prev_randao=78e43d..36f07a fee_recipient=0x4200000000000000000000000000000000000011 txs=1  update_safe=true
```

And log messages such as these from `op-geth`:

```
INFO [06-26|14:02:12.974] Imported new potential chain segment     number=4,068,194 hash=a334a0..609a83 blocks=1         txs=1         mgas=0.000  elapsed=1.482ms     mgasps=0.000   age=5mo2w20h dirty=2.31MiB
INFO [06-26|14:02:12.976] Chain head was updated                   number=4,068,194 hash=a334a0..609a83 root=e80f5e..dd06f9 elapsed="188.373µs" age=5mo2w20h
INFO [06-26|14:02:12.982] Starting work on payload                 id=0x5542117d680dbd4e
```

#### How long will the synchronization take?

To estimate how long the synchronization will take, you need to first find out how many blocks you synchronize in a minute. 

You can use this [Foundry](https://book.getfoundry.sh/) script to get an estimated sync time.

```sh
#!/usr/bin/bash

export ETH_RPC_URL=http://localhost:8545
CHAIN_ID=`cast chain-id`
echo Chain ID: $CHAIN_ID
echo Please wait

if [ $CHAIN_ID -eq 10 ]; then
  L2_URL=https://mainnet.optimism.io
fi


if [ $CHAIN_ID -eq 420 ]; then
  L2_URL=https://goerli.optimism.io
fi


if [ $CHAIN_ID -eq 11155420 ]; then
  L2_URL=https://sepolia.optimism.io
fi

T0=`cast block-number --rpc-url $ETH_RPC_URL` ; sleep 60 ; T1=`cast block-number --rpc-url $ETH_RPC_URL`
PER_MIN=`expr $T1 - $T0`
echo Blocks per minute: $PER_MIN


if [ $PER_MIN -eq 0 ]; then
    echo Not synching
    exit;
fi

# During that minute the head of the chain progressed by thirty blocks
PROGRESS_PER_MIN=`expr $PER_MIN - 30`
echo Progress per minute: $PROGRESS_PER_MIN


# How many more blocks do we need?
HEAD=`cast block-number --rpc-url $L2_URL`
BEHIND=`expr $HEAD - $T1`
MINUTES=`expr $BEHIND / $PROGRESS_PER_MIN`
HOURS=`expr $MINUTES / 60`
echo Hours until sync completed: $HOURS

if [ $HOURS -gt 24 ] ; then
   DAYS=`expr $HOURS / 24`
   echo Days until sync complete: $DAYS
fi
```


### Operations

It is best to start `op-geth` first and shut it down last.
