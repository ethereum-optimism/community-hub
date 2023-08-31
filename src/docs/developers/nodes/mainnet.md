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

1. Check the validity of your download. This is an important step. Corrupted data directories will make your node fail. So ensure your checksum matches.

   ```sh
   sha256sum mainnet-bedrock.tar.zst
   # expected output
   ec4baf47e309a14ffbd586dc85376833de640c0f2a8d7355cb8a9e64c38bfcd1  mainnet-bedrock.tar.zst
   ```

   OR
   
   ```sh
   sha512sum mainnet-bedrock.tar.zst
   # expected output
   c17067b7bc39a6daa14f71d448c6fa0477834c3e68a25e96f26fe849c12a09bffe510e96f7eacdef19e93e3167d15250f807d252dd6f6f9053d0e4457c73d5fb mainnet-bedrock.tar.zst
   ```
   

2. Create the data directory in `op-geth` and fill it. This will take time.

   Navigate into your `op-geth` direcotry and run these commands:
   ```sh
   mkdir datadir
   cd datadir
   tar xvf <<PATH_TO_DATA_DIR>>
   ```

3. Create a shared secret with `op-node`:

   Navigate into your `op-geth` direcotry and run these commands:
    ```sh
    openssl rand -hex 32 > jwt.txt
    cp jwt.txt ../optimism/op-node
    ```

   	

### Scripts to start the different components

In the root of your working directory create a new directory: `scripts`.

### `op-geth`

Navigate into your `scripts` directory:

1. Create a new file: 
   ```sh
   touch run-op-geth.sh
   ```

1. Make it executable: 
   ```sh
   chmod +x run-op-geth.sh
   ```

1. Insert this snippet of code into `run-op-geth.sh` and modify the path to the `op-geth` directory.

    ```
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
      --maxpeers=0 \
      --snapshot=false
    ```

::: info Snapshots

For the initial synchronization it's a good idea to disable snapshots (`--snapshot=false`) to speed it up. 
Later, for regular usage, you can remove that option to improve geth database integrity.

:::

5. Run the following command to start `op-geth`:
   
   ```bash
   ./run-op-geth.sh
   ```

<details>
    <summary>Your standard output should look something like the following</summary>

    INFO [08-31|15:42:54.888] Starting Geth on Ethereum mainnet... 
    INFO [08-31|15:42:54.888] Bumping default cache on mainnet         provided=1024 updated=4096
    INFO [08-31|15:42:54.893] Maximum peer count                       ETH=0 LES=0 total=0
    INFO [08-31|15:42:54.894] Smartcard socket not found, disabling    err="stat /run/pcscd/pcscd.comm: no such file or directory"
    INFO [08-31|15:42:54.896] Set global gas cap                       cap=50,000,000
    INFO [08-31|15:42:54.897] Initializing the KZG library             backend=gokzg
    INFO [08-31|15:42:54.917] Allocated trie memory caches             clean=1023.00MiB dirty=1024.00MiB
    INFO [08-31|15:42:55.009] Using leveldb as the backing database 
    INFO [08-31|15:42:55.009] Allocated cache and file handles         database=/media/soyboy/sdb/op-geth/datadir/geth/chaindata cache=2.00GiB handles=524,288
    INFO [08-31|15:42:55.786] Using LevelDB as the backing database 
    INFO [08-31|15:42:55.786] Found legacy ancient chain path          location=/media/soyboy/sdb/op-geth/datadir/geth/chaindata/ancient
    INFO [08-31|15:42:55.792] Opened ancient database                  database=/media/soyboy/sdb/op-geth/datadir/geth/chaindata/ancient readonly=false
    INFO [08-31|15:42:56.030]  
    INFO [08-31|15:42:56.030] --------------------------------------------------------------------------------------------------------------------------------------------------------- 
    INFO [08-31|15:42:56.030] Chain ID:  10 (OP-Mainnet) 
    INFO [08-31|15:42:56.030] Consensus: Optimism 
    INFO [08-31|15:42:56.030]  
    INFO [08-31|15:42:56.030] Pre-Merge hard forks (block based): 
    INFO [08-31|15:42:56.030]  - Homestead:                   #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/homestead.md) 
    INFO [08-31|15:42:56.030]  - Tangerine Whistle (EIP 150): #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/tangerine-whistle.md) 
    INFO [08-31|15:42:56.030]  - Spurious Dragon/1 (EIP 155): #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/spurious-dragon.md) 
    INFO [08-31|15:42:56.030]  - Spurious Dragon/2 (EIP 158): #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/spurious-dragon.md) 
    INFO [08-31|15:42:56.030]  - Byzantium:                   #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/byzantium.md) 
    INFO [08-31|15:42:56.030]  - Constantinople:              #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/constantinople.md) 
    INFO [08-31|15:42:56.030]  - Petersburg:                  #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/petersburg.md) 
    INFO [08-31|15:42:56.030]  - Istanbul:                    #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/istanbul.md) 
    INFO [08-31|15:42:56.030]  - Muir Glacier:                #0        (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/muir-glacier.md) 
    INFO [08-31|15:42:56.030]  - Berlin:                      #3950000  (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/berlin.md) 
    INFO [08-31|15:42:56.030]  - London:                      #105235063 (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/london.md) 
    INFO [08-31|15:42:56.030]  - Arrow Glacier:               #105235063 (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/arrow-glacier.md) 
    INFO [08-31|15:42:56.030]  - Gray Glacier:                #105235063 (https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/gray-glacier.md) 
    INFO [08-31|15:42:56.030]  
    INFO [08-31|15:42:56.030] Merge configured: 
    INFO [08-31|15:42:56.030]  - Hard-fork specification:    https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md 
    INFO [08-31|15:42:56.030]  - Network known to be merged: true 
    INFO [08-31|15:42:56.030]  - Total terminal difficulty:  0 
    INFO [08-31|15:42:56.030]  - Merge netsplit block:       #105235063 
    INFO [08-31|15:42:56.030]  
    INFO [08-31|15:42:56.030] Post-Merge hard forks (timestamp based): 
    INFO [08-31|15:42:56.030]  - Regolith:                    @0          
    INFO [08-31|15:42:56.030]  
    INFO [08-31|15:42:56.030] --------------------------------------------------------------------------------------------------------------------------------------------------------- 
    INFO [08-31|15:42:56.030]  
    INFO [08-31|15:42:56.030] Loaded most recent local block           number=105,235,063 hash=dbf6a8..c2afd3 td=0 age=2mo3w5d
    INFO [08-31|15:42:56.030] Loaded most recent local finalized block number=105,235,063 hash=dbf6a8..c2afd3 td=0 age=2mo3w5d
    INFO [08-31|15:42:56.031] Initialising Ethereum protocol           network=10 dbversion=8
    INFO [08-31|15:42:56.031] Loaded local transaction journal         transactions=0 dropped=0
    INFO [08-31|15:42:56.031] Regenerated local transaction journal    transactions=0 accounts=0
    INFO [08-31|15:42:56.031] Chain post-merge, sync via beacon client 
    INFO [08-31|15:42:56.031] Gasprice oracle is ignoring threshold set threshold=2
    WARN [08-31|15:42:56.031] Sanitizing invalid optimism gasprice oracle min priority fee suggestion provided=<nil> updated=100,000,000
    WARN [08-31|15:42:56.031] Unclean shutdown detected                booted=2023-08-31T15:30:57-0700 age=11m59s
    WARN [08-31|15:42:56.031] Engine API enabled                       protocol=eth
    INFO [08-31|15:42:56.031] Starting peer-to-peer node               instance=Geth/v0.1.0-unstable-ee5b962f-20230828/linux-amd64/go1.20.6
    INFO [08-31|15:42:56.140] IPC endpoint opened                      url=/media/soyboy/sdb/op-geth/datadir/geth.ipc
    INFO [08-31|15:42:56.141] Loaded JWT secret file                   path=jwt.txt crc32=0x9ef4fdba
    INFO [08-31|15:42:56.141] HTTP server started                      endpoint=[::]:8545 auth=false prefix= cors= vhosts=localhost
    INFO [08-31|15:42:56.141] WebSocket enabled                        url=ws://127.0.0.1:8551
    INFO [08-31|15:42:56.141] HTTP server started                      endpoint=127.0.0.1:8551 auth=true  prefix= cors=localhost vhosts=localhost
    INFO [08-31|15:42:56.141] New local node record                    seq=1,693,521,776,139 id=65199d8d69f9b69b ip=127.0.0.1 udp=0 tcp=30303
    INFO [08-31|15:42:56.141] Started P2P networking                   self="enode://f530929400b47346b0e01c170d294fc2affcf64afafe95d9bd31870470230ef703f1583c3a756f61b88663d94b85238a6e71b66934395e2240fd5ff5af5c9cbc@127.0.0.1:30303?discport=0"
</details>

### `op-node`

1. Navigate to the `scripts` directory you created.
1. Create a new file: 
   ```sh
   touch run-op-node.sh
   ```
1. Make it executable: 
   ```sh
   chmod +x run-op-node.sh
   ```
1. Insert this snippet of code into `run-op-node.sh`:
   
    ```sh
    #! /usr/bin/bash

    L1URL=<< URL to L1 >>
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

- Change `<< URL to L1 >>` to your local L1 node or a service provider's URL for the L1 node (L1 Ethereum).
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

To estimate how long the synchronization will take, you need to first find out how many blocks you synchronize in a minute. 

You can use this script, which uses [Foundry](https://book.getfoundry.sh/). 

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
#! /usr/bin/bash

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


T0=`cast block-number` ; sleep 60 ; T1=`cast block-number`
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