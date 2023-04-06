---
title: Running a local development environment
lang: en-US
---

## What is this?

A development environment is a local installation of the entire Optimism system.
Our default development environment includes both L1 and L2 development nodes.
Running the Optimism environment locally is a great way to test your code and see how your contracts will behave on Optimism before you graduate to a testnet deployment (and eventually a mainnet deployment).

Alternatively, you can get a hosted development node from [Alchemy](https://www.alchemy.com/optimism) or [any of these providers](../../useful-tools/providers.md).


## Do I need this?

We generally recommend using the local development environment if your application falls into one of the following categories:

1. **You're building contracts on both Optimism and Ethereum that need to interact with one another.** The local development environment is a great way to quickly test interactions between L1 and L2. The Optimism testnet and mainnet environments both have a communication delay between L1 and L2 that can make testing slow during the early stages of development.

2. **You're building an application that might be subject to one of the few [differences between Ethereum and Optimism](./differences.md).** Although Optimism is [EVM equivalent](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306), it's not exactly the same as Ethereum. If you're building an application that might be subject to one of these differences, you should use the local development environment to double check that everything is running as expected. You might otherwise have unexpected issues when you move to testnet. We strongly recommend reviewing these differences carefully to see if you might fall into this category.

However, not everyone will need to use the local development environment.
Optimism is [EVM equivalent](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306), which means that Optimism looks almost exactly like Ethereum under the hood.
If you don't fall into one of the above categories, you can probably get away with simply relying on existing testing tools like Truffle or Hardhat.
If you don't know whether or not you should be using the development environment, feel free to hop into the [Optimism discord](https://discord-gateway.optimism.io).
Someone nice will help you out!


## How to do it

The Optimism monorepo includes [a devnode setup you can use](https://github.com/ethereum-optimism/optimism/blob/develop/specs/meta/devnet.md).

### Installation 

1. First, make sure these components are installed.
Note that the command line directions were verified under Ubuntu 20.04 LTS.
Other OSes or versions may use different tools.

- The command line utilities `make` and `jq`.

  ```sh
  sudo apt install -y make jq
  ```

- [Go programming language](https://go.dev/)  

  ```sh
  sudo apt update
  wget https://go.dev/dl/go1.20.linux-amd64.tar.gz
  tar xvzf go1.20.linux-amd64.tar.gz
  sudo cp go/bin/go /usr/bin/go
  sudo mv go /usr/lib
  echo export GOROOT=/usr/lib/go >> ~/.bashrc
  ```

- [Docker (the engine version is enough)](https://docs.docker.com/engine/install/#server)

  The latest version of docker uses `docker compose` instead of a separate `docker-compose` executable.
  To process scripts that use `docker-compose`, run these commands:

  ```sh  
  echo docker compose '$*' | sudo tee /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose 
  ```

- The Optimism monorepo.

  ```sh
  git clone https://github.com/ethereum-optimism/optimism.git
  cd optimism
  ```


### Additional information

- To start, run (in the root directory of the monorepo) `make devnet-up`.  
  The first time it runs it will be relatively slow because it needs to download the images, after that it will be faster.

- To stop, run (in the root directory of the monorepo) `make devnet-down`.

- To clean everything, run (in the root directory of the monorepo) `make devnet-clean`.

- [The monorepo includes the L1 contract addresses](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/deploy-config/devnetL1.json).
  The L2 contract addresses are, of course, the standard ones.

- There are some differences between the development node and the real world (a.k.a. Ethereum mainnet and Optimism mainnet):

  | Parameter | Real-world | Devnode |
  | - | -: | -: |
  | L1 chain ID |  1 | 900 
  | L2 chain ID | 10 | 901
  | Time between L1 blocks (in seconds) | 12 | 3

- Test ETH:
  
  - Address: `0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`
  - Private key: `ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`