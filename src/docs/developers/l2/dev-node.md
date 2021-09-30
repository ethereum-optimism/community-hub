---
title: Running a Development Node
lang: en-US
---

::: tip OVM 2.0 Release Dates
OVM 2.0 will be released October 14th on the Kovan test network,
and October 28th into the production Optimistic Ethereum network.
:::

# {{ $frontmatter.title }}

::: danger OVM 1.0 Page
This page refers to the **current** state of the Optimistic Ethereum
network. Some of the information may be relevant to OVM 2.0, which will
be deployed in October, but some of it may change.
:::



::: tip
You can [check out one of the getting started tutorials](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/hardhat) for a step-by-step guide to using a development node.
You can also find some more detailed information about working with the development node on the [Optimism monorepo](https://github.com/ethereum-optimism/optimism#development-quick-start).
:::

You'll need a development node to be able to test your app against Optimistic Ethereum.
Here we'll go over the basic steps to build and start your own development node.

## Prerequisites

You'll need to install the following before you can continue:

1. [Docker](https://www.docker.com/)
1. [Docker compose](https://docs.docker.com/compose/install/)
1. [Node.js](https://nodejs.org/en/), version 12 or later
1. [Classic Yarn](https://classic.yarnpkg.com/lang/en/)


## Creating a node

You can either download the docker images from [Docker 
Hub](https://hub.docker.com/u/ethereumoptimism) or build the software 
from the [source code](https://github.com/ethereum-optimism/optimism).


### Downloading the docker images

If you want to download the images, perform these steps:


1. Clone the [Optimism monorepo](https://github.com/ethereum-optimism/optimism).

   ```sh
   git clone https://github.com/ethereum-optimism/optimism.git
   ```

2. Download the images from [the Docker 
   hub](https://hub.docker.com/u/ethereumoptimism). Depending on the hardware
   and network connection, this process can take up to ten minutes.

   ```sh
   cd optimism/ops
   docker-compose -f docker-compose-nobuild.yml up -t 60 --nostart
   ``` 

   You might get a timeout at first. If that is the case, just run the 
   `docker-compose` command again.


### Building from source

If you want to build from the source code, perform these steps:

1. Clone the [Optimism monorepo](https://github.com/ethereum-optimism/optimism).

   ```sh
   git clone https://github.com/ethereum-optimism/optimism.git
   cd optimism
   ```

2. Install all of the dependencies.   

   ```sh
   yarn install
   ```

3. Build the packages.
   ```sh
   yarn build
   ```

4. Build the Docker containers

   ```sh
   cd ops
   export COMPOSE_DOCKER_CLI_BUILD=1
   export DOCKER_BUILDKIT=1
   docker-compose build && echo "Build complete"
   ```

5. Wait for the "Build complete" message to appear.

## Using the node

### Starting the node

- To start a node for which you downloaded the images use:

```sh
cd optimism/ops
docker-compose -f docker-compose-nobuild.yml up
```

- To start a node which you compiled and build yourself, use:

```sh
cd optimism/ops
docker-compose up
```


The startup process may take some time.
For the impatient, you can run the following script to know when your node is ready.
The script will exit once the system has fully started up.

```sh
cd optimism/ops
scripts/wait-for-sequencer.sh
```

### Accessing the node

`docker-compose up` creates both an L1 node and an L2 node.
You can interact with both of these nodes at the following ports:

| Node                                         | Port | 
| -------------------------------------------- | ---- |
| L2 (Optimistic Ethereum dev node)            | 8545 |
| L1 ([hardhat](https://hardhat.org) dev node) | 9545 |


[Click here to see the differences between the L1 Ethereum RPC interface and the Optimistic
Ethereum RPC interface](/docs/developers/l2/rpc.html)

### Getting ETH on your dev node

All of the default hardhat accounts are funded with ETH on both L1 and L2.
These accounts are derived from the following mnemonic:

```
test test test test test test test test test test test junk
```

You can also generate the complete list of accounts and private keys by running:

```
npx hardhat node
```

### Accessing logs

The logs appear on the command-line window used for the `docker-compose up` command, but they scroll too quickly to be of much use.
If you'd like to look at the logs for a specific container, you'll first need to know the name of the container you want to inspect.
Run the following command to get the name of all running containers:

```sh
docker ps -a --format '{{.Image}}\t\t\t{{.Names}}'
```

The output includes two columns. The first is the name of the image, and the second the name of the container.

```
IMAGE                                     NAMES
ethereumoptimism/l2geth                   ops_replica_1
ethereumoptimism/l2geth                   ops_verifier_1
ethereumoptimism/message-relayer          ops_relayer_1
ethereumoptimism/batch-submitter          ops_batch_submitter_1
ethereumoptimism/data-transport-layer     ops_dtl_1
ethereumoptimism/l2geth                   ops_l2geth_1
ethereumoptimism/deployer                 ops_deployer_1
ethereumoptimism/builder                  ops_builder_1
ethereumoptimism/hardhat                  ops_l1_chain_1
ethereumoptimism/integration-tests        ops_integration_tests_1
```

Next, run `docker logs <name of container>`.
For example, to see the L1 logs, run:

```sh
docker logs ops_l1_chain_1
```

If you'd like to follow these logs as they're being generated, run:

```sh
docker logs --follow <name of container>
```


### Getting contract addresses

The [Optimistic Ethereum contracts](/docs/protocol/protocol.html#chain-contracts) 
are already deployed on the development nodes. The contracts on L2 always have the 
same addresses, so you can 
[get them from the repository](https://github.com/ethereum-optimism/optimism/tree/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/deployments#predeploy-contracts). But the L1 addresses can vary, and
you need to get them from the logs.

For example, use this command to get the addresses for contracts that are used to relay data:

  ```sh
  docker logs ops_relayer_1 |& grep 'Connected to OVM_' | tail -4 
  ```