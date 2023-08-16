---
title: Running a testnet node without Docker
lang: en-US
---

[Please follow these steps first if you have not done so already](./intro.md)

### Get the data dir

The next step is to download the data directory for `op-geth`.

1. Download the correct data directory snapshot.

   - [OP Goerli](https://datadirs.optimism.io/goerli-bedrock.tar.zst)

2. Create the data directory in `op-geth` and fill it.
   Note that these directions assume the data directory snapshot is at `~`, the home directory. Modify if needed.

   ```sh
   cd ~/op-geth
   mkdir datadir
   cd datadir
   tar xvf ~/*bedrock.tar
   ```

3. Create a shared secret with `op-node`:

   ```sh
   cd ~/op-geth
   openssl rand -hex 32 > jwt.txt
   cp jwt.txt ~/optimism/op-node
   ```

### Scripts to start the different components

#### `op-geth`

Other Sequencer URLs can be found here: [Networks, Public RPC Endpoints, & APIs](../../useful-tools/networks.md).

```
#! /usr/bin/bash

SEQUENCER_URL=https://goerli-sequencer.optimism.io/

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
  --snapshot=false
```


::: info Snapshots

For the initial synchronization it's a good idea to disable snapshots (`--snapshot=false`) to speed it up. 
Later, for regular usage, you can remove that option to improve geth database integrity.

:::