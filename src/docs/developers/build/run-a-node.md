---
title: Running a testnet or mainnet node
lang: en-US
---

If you're looking to build an app on Optimism you'll need access to an Optimism node.
Various [infrastructure providers](https://www.optimism.io/apps/tools) exist that can give you access to hosted nodes.
However, you might be interested in running your very own Optimism node.
Here we'll go over the process of running a testnet or mainnet Optimism node for yourself.

[You can read about the architecture of a replica node here](../../how-optimism-works/#block-execution).

## Hardware requirements

Replicas need to store the transaction history of Optimism and to run Geth. 
They need to be relatively powerful machines (real or virtual). 
We recommend at least 16 GB RAM, and an SSD drive with at least 100 GB free.

## Docker configuration

The easiest way to create a replica is to use [Docker](https://www.docker.com/) and the [Docker images we provide](https://hub.docker.com/u/ethereumoptimism). They include all the configuration settings.

### Prerequisites

You'll need to have the following installed:

1. [Docker](https://www.docker.com/)
1. [Docker compose](https://docs.docker.com/compose/install/)

### Configuring and running the node

Simply follow the instructions available at [this repository](https://github.com/optimisticben/op-replica/) to build and run the node.

## Non-docker configuration

Here are the instructions if you want to build you own replica without relying on our images.
I checked these instructions on a [GCP e2-standard-4](https://cloud.google.com/compute/docs/general-purpose-machines#e2-standard) virtual machine running [Debian 10](https://www.debian.org/News/2021/2021100902) with a 50 GB SSD drive. 
They should work on different operating systems with minor changes, but there are no guaranrees.

### Install packages

1. These packages are all required either to compile the software or to run it. 
    We need `libusb-1.0` because geth requires it to check for hardware wallets.

    ```sh
    export DEBIAN_FRONTEND=noninteractive    
    sudo apt install -y git make wget gcc pkg-config libusb-1.0 jq
    curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
    sudo bash nodesource_setup.sh
    sudo apt install -y nodejs
    sudo npm install -g yarn  
    ```

1. We also need the Go programming language.
    [See here for detailed installation instructions](https://go.dev/doc/install).

    ```sh
    wget https://go.dev/dl/go1.17.6.linux-amd64.tar.gz
    sudo tar -C /usr/local -xzf go1.17.6.linux-amd64.tar.gz
    cp /etc/profile /tmp
    echo "export PATH=$PATH:/usr/local/go/bin" >> /tmp/profile
    sudo mv /tmp/profile /etc
    . /etc/profile
    . ~/.profile
    ```


### The data transfer layer (DTL)

This TypeScript program reads data from the Ethereum mainnet (layer 1) and makes it available for l2geth (layer 2). 

1. Download the source code and compile the DTL:

    ```sh
    git clone -b master https://github.com/ethereum-optimism/optimism.git
    cd optimism
    yarn
    yarn build
    cd ~/optimism/packages/data-transport-layer
    cp .env.example .env
    ```

1. Edit `.env` to specify your own configuration.
    Modify these parameters:


    | Parameter | Value |
    | --------- | ----- |
    | DATA_TRANSPORT_LAYER__NODE_ENV         | production |
    | DATA_TRANSPORT_LAYER__ETH_NETWORK_NAME | mainnet |    
    | DATA_TRANSPORT_LAYER__ADDRESS_MANAGER  | [`Lib_AddressManager` address](https://github.com/ethereum-optimism/optimism/tree/develop/packages/contracts/deployments/mainnet#layer-1-contracts) |     
    | DATA_TRANSPORT_LAYER__SERVER_HOSTNAME  | localhost
    | DATA_TRANSPORT_LAYER__SERVER_PORT      | 7878
    | DATA_TRANSPORT_LAYER__SYNC_FROM_L1     | false |    
    | DATA_TRANSPORT_LAYER__L1_RPC_ENDPOINT  | Get an endpoint from [a service provider](https://ethereum.org/en/developers/docs/nodes-and-clients/nodes-as-a-service/) unless you run a node yourself |
    | DATA_TRANSPORT_LAYER__SYNC_FROM_L2     | true |
    | DATA_TRANSPORT_LAYER__L2_RPC_ENDPOINT  | [See here](../../useful-tools/networks/) |
    | DATA_TRANSPORT_LAYER__L2_CHAIN_ID      | 10 (for mainnet) |



1. Start the DTL:

    ```sh
    yarn start
    ```

1. To verify the DTL is running correctly you can run this command:

   ```sh
   curl -s http://localhost:7878/eth/syncing?backend=l2  | jq .currentTransactionIndex
   ```

   It gives you the current transaction index, which should increase with time.

    The DTL now needs to download the entire transaction history since regenesis, a process that takes hours.
    While it is running, we can get started on the client software.


### The Optimism client software

The client software, called l2geth, is a minimally modified version of [`geth`](https://geth.ethereum.org/). 
Because `geth` supports hardware wallets you might get USB errors. If you do, ignore them.

These directions use `~/gethData` as the data directory. 
You can replace it with you own directory as long as you are consistent.

1. To compile l2geth, open a separate command line window and run:

    ```sh
    cd ~/optimism/l2geth
    make geth
    ```

1. Download and verify the genesis state, the state of the Optimism blockchain during the last regenesis, 11 November 2021. 

   ```sh
   wget -O /tmp/genesis.json https://storage.googleapis.com/optimism/mainnet/genesis-v0.5.0.json
   sha256sum /tmp/genesis.json
   ```

   The output of the `sha256sum` command should be:
   ```
   361ff81fff4cc71e5f0bf43b0b982f5cfd08d068f730b9a61516fe1fa8fd914a  /tmp/genesis.json
   ```

1. Initialize l2geth with the genesis state.
   This process takes about nine minutes on my system.

    ```sh
    mkdir ~/gethData
    ./build/bin/geth init --datadir=~/gethData /tmp/genesis.json --nousb
    ```

1. Create a file called `env.sh` with this content:

    ```sh
    export CHAIN_ID=10
    export DATADIR=~/gethData
    export NETWORK_ID=10
    export NO_DISCOVER=true
    export NO_USB=true
    export GASPRICE=0
    export GCMODE=archive
    export BLOCK_SIGNER_ADDRESS=0x00000398232E2064F896018496b4b44b3D62751F
    export BLOCK_SIGNER_PRIVATE_KEY=6587ae678cf4fc9a33000cdbf9f35226b71dcc6a4684a31203241f9bcfd55d27
    export ETH1_CTC_DEPLOYMENT_HEIGHT=13596466
    export ETH1_SYNC_SERVICE_ENABLE=true
    export ROLLUP_ADDRESS_MANAGER_OWNER_ADDRESS=0x9BA6e03D8B90dE867373Db8cF1A58d2F7F006b3A
    export ROLLUP_BACKEND=l2
    export ROLLUP_CLIENT_HTTP=http://localhost:7878
    export ROLLUP_DISABLE_TRANSFERS=false
    export ROLLUP_ENABLE_L2_GAS_POLLING=false
    export ROLLUP_GAS_PRICE_ORACLE_OWNER_ADDRESS=0x648E3e8101BFaB7bf5997Bd007Fb473786019159
    export ROLLUP_MAX_CALLDATA_SIZE=40000
    export ROLLUP_POLL_INTERVAL_FLAG=1s
    export ROLLUP_SYNC_SERVICE_ENABLE=true
    export ROLLUP_TIMESTAMP_REFRESH=5m
    export ROLLUP_VERIFIER_ENABLE=true
    export RPC_ADDR=0.0.0.0
    export RPC_API=eth,rollup,net,web3,debug
    export RPC_CORS_DOMAIN=*
    export RPC_ENABLE=true
    export RPC_PORT=8545
    export RPC_VHOSTS=*
    export TARGET_GAS_LIMIT=15000000
    export USING_OVM=true
    export WS_ADDR=0.0.0.0
    export WS_API=eth,rollup,net,web3,debug
    export WS_ORIGINS=*
    export WS=true
    ```

1. Run the new file. 
   This syntax (`. <name of script>`) runs the script in the context of the current shell, rather than in a new shell.
   The reason for doing this is that we want to modify the current shell's environment variables, not start a new shell, set up the environment in it, and then exit.

   ```sh
   . env.sh
   ```


1. Create the geth account. 
   The private key needs to be the one specified in the configuration, otherwise the consensus algorithm fails and the node does not synchronize.

    ```sh
    touch $DATADIR/password
    echo $BLOCK_SIGNER_PRIVATE_KEY > $DATADIR/block-signer-key
    ./build/bin/geth account import --datadir=$DATADIR --password $DATADIR/password $DATADIR/block-signer-key
    ```

1. Start geth. 

    ```sh
    build/bin/geth \
       --datadir=$DATADIR \
       --password=$DATADIR/password \
       --allow-insecure-unlock \
       --unlock=$BLOCK_SIGNER_ADDRESS \
       --mine \
       --miner.etherbase=$BLOCK_SIGNER_ADDRESS
    ```

1. To check if l2geth is running correctly, open another command line window and run these commands:

   ```sh
   cd ~/optimism/l2geth
   build/bin/geth --datadir=~/gethData attach
   eth.blockNumber
   ```

   Wait a few seconds and then look at the blocknumber again and exit:

   ```sh
   eth.blockNumber
   exit
   ```
 
   If l2geth is synchronizing, the second block number is higher than the first.

1. Wait a few hours until the entire history is downloaded by dtl and then propagated to l2geth.
   On my system it took <n> hours to synchronize