---
title: Running a Dev Node
lang: en-US
---

# {{ $frontmatter.title }}

::: tip
For detailed step by step instructions [see one of the getting started 
tutorials](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/hardhat).
:::

You need a development node to be able to test your dapp with Optimistic Ethereum.

## Packages

These packages are required to run an Optimistic Ethereum node:

1. [Docker](https://www.docker.com/)
1. [Docker compose](https://docs.docker.com/compose/install/)
1. [Node.js](https://nodejs.org/en/), version 12 or later
1. [Classic Yarn](https://classic.yarnpkg.com/lang/en/)


## Building Optimism

With the packages installed, the next step is to build Optimism:


1. Clone the [Optimism monorepo](https://github.com/ethereum-optimism/optimism).

   ```sh
   git clone https://github.com/ethereum-optimism/optimism.git
   cd optimism
   ```
   
2. Build the Optimistic Ethereum software.   
   
   ```sh
   yarn install
   yarn build
   ```
   
3. Build the Docker containers

   ```sh
   cd ops
   export COMPOSE_DOCKER_CLI_BUILD=1
   export DOCKER_BUILDKIT=1
   docker-compose build && echo Build complete
   ```
   
## Using the Node

### Starting the Node

To start the node run these commands:

```sh
cd <directory where you issued the git clone command>
cd optimism/ops
docker-compose up
```

The start process takes some time. To ensure it is concluded you
can run this command and wait for it to finish:

```sh
cd <directory where you issued the git clone command>
cd optimism/ops
scripts/wait-for-sequencer.sh
```

### Accessing the Node

There are two interfaces that respond to Ethereum RPC commands:

| Interface                              | Port(s) on localhost | 
| -------------------------------------- | -------------------- |
| The Optimistic Ethereum network itself | 8545, 8547, 8549     |
| The Underlying L1 Ethereum network     | 9545                 |


For a rich (in pretend ETH) testing account use the mnemonic 
`test test test test test test test test test test test junk`. 


### Accessing the Logs

The logs appear on the command-line window used for the `docker-compose up`
command, but they scroll too quickly to be of much use. 

First, get the list of containers running this command:

```sh
docker ps -a --format '{{.Image}}\t\t\t{{.Names}}'
```

The output includes two columns. The first is the name of the image, and
the second the name of the container.

```
ethereumoptimism/l2geth                 ops_replica_1
ethereumoptimism/l2geth                 ops_verifier_1
ethereumoptimism/message-relayer                        ops_relayer_1
ethereumoptimism/batch-submitter                        ops_batch_submitter_1
ethereumoptimism/data-transport-layer                   ops_dtl_1
ethereumoptimism/l2geth                 ops_l2geth_1
ethereumoptimism/deployer                       ops_deployer_1
ethereumoptimism/builder                        ops_builder_1
ethereumoptimism/hardhat                        ops_l1_chain_1
ethereumoptimism/integration-tests                      ops_integration_tests_1
```

Next, run `docker logs <name of container>`. For example, to see the L1 logs, run:

```sh
docker logs ops_l1_chain_1
```
