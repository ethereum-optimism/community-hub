---
title: Optimistic Ethereum Documentation
lang: en-US
tags:
    - contracts
    - high-level
---

# {{ $frontmatter.title }}

Welcome to our documentation site, and thanks for your interest in learning more about Optimistic Ethereum (OE)!

## OE Protocol and Integration

Optimism is _currently working_ to expand our protocol and integration docs. However, despite each being under active development, you can still explore each section with the links below.

- [Protocol Docs](./protocol.md): Gives an understanding of how the system functions under the hood.
- [Integration Docs](./integration.md): Outlines the minor modifications necessary to adapt a smart contract application (dApp) to run on Optimistic Ethereum.

## Resources (comprehensive)

Alternatively, if you would like to learn more about Optimism from previous resources provided by the team (and friends!), check out some of the resources below.

### 1. General

- [Mainnet soft launch](https://medium.com/ethereum-optimism/mainnet-soft-launch-7cacc0143cd5) (Jan. 15th, 2021)

    This Medium post article describes the current layered ["defense-in-depth"](https://en.wikipedia.org/wiki/Defense_in_depth_(computing)) pre-release deployment strategy that the Optimism team is using to improve the security of their mainnet release. Read to learn more about the approach and to get a peak at the team's next company milestones.

### 2. Guides and Tutorials

- [Optimism's official introductory tutorial](../tutorial/) (Jan. 15, 2021)

    The **official** introductory tutorial by the Optimism team. Note, that this tutorial is _short and sweet_. For more thorough guides, refer to other the resources below, the Protocol, or Intregation

- [Scopelift 's Uniswap v2 OVM tutorial](https://hackmd.io/@scopelift/Hy853dTsP)  (October - December 2020)

    However, this guide by Scopelift is a bit slightly outdated. For the most up-to-date tutorial, please refer to Optimism's offical introductory tutorial above.

- [Unofficial guide on deploying a custom Optimism rollup on Kovan](https://gist.github.com/miguelmota/973e62c8f3da0571fc2c469b65c54d71)

    A short GitHub gist by [@miguelmota](https://twitter.com/miguelmotah) for how to deploy a custom ORU on the Kovan testnet.

### 3. Protocol Readings

- [OVM Deep Dive, Medium post](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52) (May 5th, 2020)

    A **thorough** Medium post from Optimism's blog that provides that explains **what the Optimism Virtual Machine (OVM) is and the problem it solves.**

- [OVM/EVM differences](https://hackmd.io/Inuu-T_UTsSXnzGtrLR8gA) (October - December 2020)

    Another HackMD post that examines the significant differences between **OVM and EVM opcodes, native wrapped ether (WETH) support, OVM account abstraction, and gas optimization in the OVM**.

- [OVM vs. EVM Incompatibilities](https://hackmd.io/elr0znYORiOMSTtfPJVAaA?view#OVM-vs-EVM-Incompatibilities)

- [How does Optimism's Rollup really work?](https://research.paradigm.xyz/optimism) by Georgios Konstantopoulos from Paradigm Research

    A thorough post by Paradigm's research division that takes a deep dive into the protocol implementation of Optimism's ORUs. **Covers OVM topics like: data availability batches, state commitments, fraud proofs, incentives & bonds, and nuisance gas.**

- [MEV Auction: Auctioning transaction ordering rights as a solution to Miner Extractable Value](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

    A thorough discussion on miner extractable value auctions (MEVA) by Karl Floersch. MEVA is used in Optimism's ORUs.

### 3. Speaking engagements

If you prefer videos, feel free to watch any of these informational videos that describe Optimism's core protocol, ORUs, and MEVA.

- [From Scalable to Sustainable](https://www.youtube.com/watch?v=0hppV1IfILw&feature=youtu.be) by Karl Floersch at SustainWeb3
- [Optimistic Rollup](https://www.youtube.com/watch?v=97DU_YgNPgE&feature=youtu.be) by Karl Floersch at EDCON 2020
- [Optimism: Keeping Ethereum Half-Full](https://www.youtube.com/watch?v=eYeOW4ePgZE) by Kelvin Fichter at ETHOnline
- [ETH2 Data Availability and Rollups](https://www.youtube.com/watch?v=q42NZw6Gle0&feature=youtu.be) by Ben Jones at ETHOnline
- [Optimistic Podcast](https://blockcrunch.libsyn.com/is-plasma-dead-the-rise-of-optimistic-rollups-on-ethereum-kevin-ho-optimism-ep-97) by Kevin Ho on BlockCrunch

### 4. Tools
- [`smock`](https://github.com/ethereum-optimism/smock):  
  
  Smock is a hardhat plugin that allows you to mock the functionality of any smart contract with just a little bit of JavaScript. Smock's README on GitHub has thorough documentation.
  
   - [Community example of using Smock](https://soliditydeveloper.com/smock)
   
        A community-made tutorial on using the `smock` plugin.

- [`ovm-toolchain`](https://github.com/ethereum-optimism/optimism-monorepo), i.e. Optimism Monorepo

    The core optimism packages contained in a single GitHub repository.

- [Optimism's `contracts-v2`](https://github.com/ethereum-optimism/contracts-v2):
  
  The smart contracts that make up the L1 component of Optimism's ORU contruction.

- [`optimism-integration` Optimism Service Integration and Rapid Development](https://github.com/ethereum-optimism/optimism-integration):
  
  A single GitHub repository intended to provide the ability to run a local Optimistic Ethereum environment including both L1 & L2 chains. This can be used to rapidly iterate over the many Optimism repositories and run integration tests.