---
title: Building a Node from Source
lang: en-US
---

Here are the instructions if you want to build you own read-only replica without relying on our images. These instructions were generated on an Ubuntu 20.04 LTS box, but they should work with other systems too.

Note: This is not the recommended configuration. While we did QA on these instructions and they work, the QA that the docker images undergo is much more extensive.

# Prerequisites

## Hardware requirements

Replicas need to store the transaction history of OP Mainnet (or the relevant OP testnet) and to run Geth. They need to be relatively powerful machines (real or virtual). We recommend at least 16 GB RAM, and an SSD drive with at least 325GB + 446GB free (for OP Mainnet).

## Software requirements

You’ll need the following software installed to follow this tutorial:

- [Git](https://git-scm.com/)

- [Go](https://go.dev/)

- [nvm](https://github.com/nvm-sh/nvm)

- [Node](https://nodejs.org/en)

- [Pnpm](https://pnpm.io/)

- [Foundry](https://github.com/foundry-rs/foundry#installation)

- [Make](https://linux.die.net/man/1/make)

- [jq](https://github.com/jqlang/jq)

- [direnv](https://direnv.net/)

- [zstd](https://facebook.github.io/zstd/)

This tutorial was checked on:
| Software                        | Version         | Installation command(s) |
| ------------------------------- | --------------- | ----------------------- |
| Ubuntu                          | 20.04 LTS       |
| git, curl, jq, make, and zstd   | OS default      | `sudo apt update`, <br/>`sudo apt install -y git curl make jq zstd`
| Go                              | 1.20            | `wget https://go.dev/dl/go1.20.linux-amd64.tar.gz`, <br/> `tar xvzf go1.20.linux-amd64.tar.gz`, <br/> `sudo cp go/bin/go /usr/bin/go`, <br/>`sudo mv go /usr/lib`, <br/>`echo export GOROOT=/usr/lib/go >> ~/.bashrc` |
| Node                            | 18.17.1        | `nvm install 18.17.1`, <br/> `nvm use 18.17.1`
| pnpm                            | 8.6.12           | `sudo npm install -g pnpm` |
| Foundry                         | 0.2.0           | `curl -L https://foundry.paradigm.xyz | bash`, <br/> `. ~/.bashrc`, <br/> `foundryup` |

## Building the software

### Build the Optimism Monorepo

1. Navigate to your working directory.
   
1. Clone the [Optimism Monorepo](https://github.com/ethereum-optimism/optimism).

    ```bash
    git clone https://github.com/ethereum-optimism/optimism.git
    ```

1. Install required modules. 

    ```bash
    cd optimism
    pnpm install
    ```

1. Build the various packages inside of the Optimism Monorepo.

    ```bash
    make op-node
    pnpm build
    ```

This process will take some time, so you can move onto the next section while the build completes.

### Build op-geth

1. Navigate to your working directory.

1. Clone [`op-geth`](https://github.com/ethereum-optimism/op-geth):

    ```bash
    git clone https://github.com/ethereum-optimism/op-geth.git
    ```


1. Build `op-geth`:

    ```bash
    cd op-geth    
    make geth
    ```

### (Optional - Archive Node) Build l2geth

1. Navigate to your working directory

1. Clone [`l2geth`](https://github.com/ethereum-optimism/optimism-legacy)

    ```bash
    git clone https://github.com/ethereum-optimism/optimism-legacy.git
    ```

1. Build `l2geth`:
   
   ```bash
   cd optimism-legacy/l2geth
   make
   ```
   
<br/>

The rest of the steps depend on whether you are building on OP Mainnet or OP Testnet node.

[Click here to continue building on OP Mainnet](./mainnet.md)

[Click here to continue building on OP Testnet](./testnet.md)