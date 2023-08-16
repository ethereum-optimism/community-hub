---
title: Running a node without Docker
lang: en-US
---

Here are the instructions if you want to build you own read-only replica without relying on our images. These instructions were generated on an Ubuntu 20.04 LTS box, but they should work with other systems too.

Note: This is not the recommended configuration. While we did QA on these instructions and they work, the QA that the docker images undergo is much more extensive.

# Prerequisites
You’ll need the following software installed to follow this tutorial:

- [Git](https://git-scm.com/)

- [Go](https://go.dev/)

- [Node](https://nodejs.org/en)

- [Pnpm](https://pnpm.io/)

- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
  
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
| Node                            | 16.19.0         | `curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -`, <br/> `sudo apt-get install -y nodejs`
| pnpm                            | 8.5.6           | `sudo npm install -g pnpm` |
| yarn                            | 1.22.19         | `sudo npm install -g yarn` |
| Foundry                         | 0.2.0           | `curl -L https://foundry.paradigm.xyz | bash`, <br/> `. ~/.bashrc`, <br/> `foundryup` |

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

<br/>

The rest of the steps depend on whether you are building on OP mainnet or a testnet.

[Click here to continue building on OP mainnet](./mainnet.md)

[Click here to continue building on OP Testnet](./testnet.md)