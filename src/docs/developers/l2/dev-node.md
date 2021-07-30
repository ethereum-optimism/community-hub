---
title: Running a Development Node
lang: en-US
---

# {{ $frontmatter.title }}

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

## Building the Node

With the packages installed, the next step is to build the node:

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

## Using the Node

### Starting the Node

Starting the node is a single command:

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

### Accessing the Node

`docker-compose up` creates both an L1 node and an L2 node.
You can interact with both of these nodes at the following ports:

| Node                                         | Port | 
| -------------------------------------------- | ---- |
| L2 (Optimistic Ethereum dev node)            | 8545 |
| L1 ([hardhat](https://hardhat.org) dev node) | 9545 |

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

### Accessing the Logs

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
