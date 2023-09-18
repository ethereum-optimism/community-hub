---
title: Running OP Mainnet from Source
lang: en-US
---

#### [Please follow these steps first if you have not done so already.](./intro.md)

### Get the data directory

The next step is to download the data directory for `op-geth`.
You will need 500+ GB for this part alone.

1. Download the data directory snapshot. This is a large file so expect it to take some time. [Bedrock Data Directory (303GB)](https://datadirs.optimism.io/mainnet-bedrock.tar.zst)

::: tip Protip
Use a tool like [aria2](https://aria2.github.io/) to reduce the chance of your data directory being corrupted.
:::

2. Check the validity of your download. This is an important step. Corrupted data directories will make your node fail. So ensure your checksum matches.

   ```bash
   sha256sum mainnet-bedrock.tar.zst
   # expected output
   ec4baf47e309a14ffbd586dc85376833de640c0f2a8d7355cb8a9e64c38bfcd1  mainnet-bedrock.tar.zst
   ```

   OR
   
   ```bash
   sha512sum mainnet-bedrock.tar.zst
   # expected output
   c17067b7bc39a6daa14f71d448c6fa0477834c3e68a25e96f26fe849c12a09bffe510e96f7eacdef19e93e3167d15250f807d252dd6f6f9053d0e4457c73d5fb mainnet-bedrock.tar.zst
   ```
   

3. Create the data directory in `op-geth` and fill it. This will take time.

   Navigate into your `op-geth` directory and run these commands:
   ```sh
   mkdir datadir
   cd datadir
   tar xvf <<PATH_TO_DATA_DIR>>
   ```

#### (Optional - OP Mainnet Archive Node) Get the data directory for `l2geth`

1. Download the data directory snapshot. This is a large file so expect it to take some time. [Legacy Geth Data Directory (2.9TB)](https://datadirs.optimism.io/mainnet-legacy-archival.tar.zst)

::: tip Protip
Use a tool like [aria2](https://aria2.github.io/) to reduce the chance of your data directory being corrupted.
:::

2. Check the validity of your download. This is an important step. Corrupted data directories will make your node fail. So ensure your checksum matches.

   ```sh
   sha256sum mainnet-legacy-archival.tar.zst
   # expected output
   4adedb61125b81b55f9bdccc2e85092050c65ef2253c86e2b79569732b772829  mainnet-legacy-archival.tar.zst
   ```

   OR
   
   ```sh
   sha512sum mainnet-legacy-archival.tar.zst
   # expected output
   e348488c458baa755510f23bbc8601619bc66bea78a89354c949ba7be3c6b39ed7dd2c50516621e38df6120299407da0d24445b96bf94a50364ed07bb8234b26 mainnet-legacy-archival.tar.zst
   ```

3. Create the data directory in `l2geth` and fill it. This will take time.

   Navigate into your `l2geth` directory and run these commands:
   ```sh
   mkdir datadir
   cd datadir
   tar xvf <<PATH_TO_DATA_DIR>>
   ```

### Create a shared secret between `op-geth` and `op-node`

1. Navigate into your `op-geth` directory and run these commands:

   ```sh
   openssl rand -hex 32 > jwt.txt
   cp jwt.txt ../optimism/op-node
   ```

### Scripts to start the different components

In the root of your working directory create a new directory: `scripts`.

### (Optional - Archive Node) `l2geth`

1. Navigate into your `scripts` directory:

2. Create a new file: 
   ```sh
   touch run-l2geth.sh
   ```

3. Make it executable: 
   ```sh
   chmod +x run-l2geth.sh
   ```

4. Insert this snippet of code into `run-l2geth.sh` and modify the path to the `l2geth` directory.

   ```sh
   #!/usr/bin/bash

   cd ../optimism-legacy/l2geth

   USING_OVM=true \
     ETH1_SYNC_SERVICE_ENABLE=false \
     RPC_API=eth,rollup,net,web3,debug \
     RPC_ENABLE=true \
     RPC_PORT=8546 \ # need to rebind port because op-geth uses the same default port
     ./build/bin/geth --datadir ./datadir
   ```

5. Run the following command to start `l2geth`:
   
   ```sh
   ./run-l2geth.sh
   ```

### `op-geth`

1. Navigate into your `scripts` directory:

2. Create a new file: 
   ```sh
   touch run-op-geth.sh
   ```

3. Make it executable: 
   ```sh
   chmod +x run-op-geth.sh
   ```

4. Insert this snippet of code into `run-op-geth.sh` and modify the path to the `op-geth` directory.

    ```sh
    #! /usr/bin/bash

    SEQUENCER_URL=https://mainnet-sequencer.optimism.io/

    cd <<Path to op-geth directory>>

    ./build/bin/geth \
      --datadir=./datadir \
      --http \
      --http.port=8545 \
      --http.addr=0.0.0.0 \
      --authrpc.addr=localhost \
      --authrpc.jwtsecret=./jwt.txt \
      --verbosity=3 \
      --rollup.sequencerhttp=$SEQUENCER_URL \
      --nodiscover \
      --syncmode=full \
      --maxpeers=0
    ```

::: info Archive Nodes
You will need to point `op-geth` at `l2geth` with `--rollup.historicalrpc`: Enables the historical RPC endpoint. This endpoint is used to fetch historical execution data from Legacy Geth from before the [Bedrock upgrade](https://twitter.com/optimismFND/status/1666850591669202965). This flag is only necessary for OP Mainnet.

You will also need to add `--gcmode archive`.
:::

1. Run the following command to start `op-geth`:
   
   ```bash
   ./run-op-geth.sh
   ```

### `op-node`

1. Navigate to the `scripts` directory you created.
   
2. Create a new file: 
   ```sh
   touch run-op-node.sh
   ```
3. Make it executable: 
   ```sh
   chmod +x run-op-node.sh
   ```
4. Insert this snippet of code into `run-op-node.sh`:
   
    ```sh
    #!/usr/bin/bash

    L1URL=<< L1 RPC URL >>
    L1KIND=basic
    NET=mainnet

    cd <<Path to op-node directory>>


    ./bin/op-node \
        --l1=$L1URL  \
        --l1.rpckind=$L1KIND \
        --l2=http://localhost:8551 \
        --l2.jwt-secret=./jwt.txt \
        --network=$NET \
        --rpc.addr=0.0.0.0 \
        --rpc.port=8547

    ```        

- Change `<< L1 RPC URL >>` to your local L1 node or a service provider's URL for the L1 node (L1 Ethereum). E.g. for Infura, `https://mainnet.infura.io/v3/API_KEY`.
- Set `L1KIND` to the network provider you are using (options: alchemy, quicknode, infura, parity, nethermind, debug_geth, erigon, basic, any).

5. Run the following command to start `op-node`:
   
    ```bash
    ./run-op-node.sh
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

To estimate how long the synchronization will take, you need to first find out how many blocks you synchronize in a minute. You can use this [Foundry](https://book.getfoundry.sh/) script to get an estimated sync time.

1. Navigate to your `scripts` directory
2. Create a new file: 
   ```sh
   touch run-estimate.sh
   ```
3. Make it executable: 
   ```sh
   chmod +x run-estimate.sh
   ```
4. Insert this snippet of code into `run-estimate.sh`:
  
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

5. Run the following command to get an estimate:
   ```sh
   ./run-estimate.sh
   ```  

### Operations

It is best to start `op-geth` first and shut it down last.