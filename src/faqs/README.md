---
title: FAQs
lang: en-US
tags:
  - contracts
  - high-level
---

# {{ $frontmatter.title }}

## TL;DR

### What is Optimistic Ethereum?

Optimistic Ethereum is an [EVM](https://ethereum.org/en/developers/docs/evm/)-compatible [Optimistic Rollup](https://research.paradigm.xyz/rollups) chain. It's designed to be fast, simple, and secure.

<!--
## How can I use Optimistic Ethereum?

TODO: this section needs to be written
-->

### Where can I find more information about Optimistic Ethereum?

The most up-to-date information about Optimistic Ethereum can always be found on the [Optimism Community Hub](/docs). There you'll find stuff like docs, tutorials, and collections of videos related to Optimistic Ethereum. If you're unable to find what you're looking for there, feel free to [make an issue over on GitHub](https://github.com/ethereum-optimism/community-hub/issues).

## Using Optimistic Ethereum

### How do I connect my wallet to Optimistic Ethereum?

With the introduction of the [`wallet_addEthereumChain`](https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain) RPC method, many wallets now allow applications to trigger a popup to switch between networks. If your wallet supports this feature then you will be automatically prompted to switch networks when an application wants to utilize an Optimistic Ethereum network.

If your wallet does not support this feature, you will have to connect manually.
The exact process for connecting your wallet to an Optimistic Ethereum network depends on the specific wallet software you're using. We've provided connection walkthroughs for the following wallets:

- [MetaMask](/docs/users/metamask.html)

### How do I move assets into or out of Optimistic Ethereum?

The easiest way to move assets into or out of an Optimistic Ethereum network is to use [Optimism's Gateway application](https://gateway.optimism.io/). We've written a [detailed walkthrough](/docs/users/gateway.html) that explains how to use the Gateway.

### Why do I need to wait a week when moving assets out of Optimistic Ethereum?

Users are required to wait for a period of one week when moving assets out of the Optimistic Ethereum mainnet. This period of time is called the Challenge Period and serves to help secure the assets stored on an Optimistic Ethereum network. You can find more information about the Challenge Period [here](https://community.optimism.io/docs/developers/bridge/messaging.html#understanding-the-challenge-period). Please note that the [Optimistic Kovan testnet](https://community.optimism.io/docs/developers/networks.html#optimistic-kovan) has a Challenge Period of only 60 seconds to simplify the development process.

### Can I change the gas price or gas limit of my Optimistic Ethereum transactions in MetaMask?

<!--- TODO: Clean up a bit --->
NO!! The gas price must be set to `0.015 gwei` or else your transaction will fail. You also should _not_ change the gas limit. The gas limit encodes multiple values and should never be set manually in your wallet.

More information on how to pay fees in Optimistic Ethereum can be found on [this notion document](https://www.notion.so/optimismpbc/How-to-pay-Fees-in-Optimistic-Ethereum-f706f4e5b13e460fa5671af48ce9a695).

### Can I cancel a withdrawal after it has been submitted?

**No, withdrawals currently cannot be cancelled once submitted.**
We are exploring this as a future system feature.

### Are there transaction fees on Optimistic Ethereum?

<!-- TODO: link to fees page once finished -->

Yes, users are required to pay fees when sending transactions on an 
Optimistic Ethereum (just like on Ethereum). However, these fees are 
greatly reduced when compared to Ethereum. Refer to our [recent Medium post](/docs/developers/fees.html) for more 
information about transaction fees. Alternatively, check out our [gas comparison page](https://optimism.io/gas-comparison) for concrete numbers comparing 
the cost of transactions on Ethereum to transactions on Optimistic Ethereum.

Fees have to be paid in ETH. [Click here for more information about how they
are calculated](/docs/developers/fees.html).

## The Software

### Where can I find the source code for Optimism's implementation of the Optimistic Ethereum protocol?

All software used within Optimism's implementation of the Optimistic Ethereum protocol can be found under the [Optimism organization on GitHub](https://github.com/ethereum-optimism). Most of this software is housed inside the [Optimism Monorepo](https://github.com/ethereum-optimism/optimism). Refer to the [monorepo README](https://github.com/ethereum-optimism/optimism/blob/develop/README.md) for more information about the structure of the repository and the role of each individual software component.

### What software license does Optimism use?

Optimism uses the permissive [MIT License](https://github.com/ethereum-optimism/optimism/blob/develop/LICENSE) for a majority of its software. Code forked from [`go-ethereum`](https://github.com/ethereum/go-ethereum) under the name [`l2geth`](https://github.com/ethereum-optimism/optimism/tree/master/l2geth) is licensed under the [GNU GPLv3](https://github.com/ethereum-optimism/optimism/blob/develop/l2geth/COPYING) in accordance with the [original license](https://github.com/ethereum/go-ethereum/blob/master/COPYING).

## Infrastructure

### What infrastructure providers support Optimistic Ethereum?

<!-- TODO: link to infra page once finished and remove this table -->

| Provider                                     | Service Type         | Mainnet Support | Kovan Testnet Support |
| -------------------------------------------- | -------------------- | --------------- | --------------------- |
| [Infura](https://infura.io/)                 | Node provider        | ☑               | ☑                     |
| [Alchemy](https://www.alchemyapi.io/)        | Node provider        | ☑               |                       |
| [QuickNode](https://www.quicknode.com/)      | Node provider        | ☑               | ☑                     |
| [Etherscan](https://etherscan.io/)           | Block explorer       | ☑               | ☑                     |
| [The Graph](https://thegraph.com/)           | Data indexing        | ☑               |                       |
| [Dune Analytics](https://duneanalytics.com/) | Chain data analytics | ☑               |                       |

### Where can I find RPC endpoints and connection details?

Connection details for all of our networks can be found on the [Networks page](https://community.optimism.io/docs/developers/networks.html) of our documentation.

## Limitations and Disclaimers

::: tip Please read this section carefully.
Just like Ethereum, Optimistic Ethereum is an ever-improving system. We've chosen to enforce several temporary limitations in order to maintain a higher level of security and stability during these early days of the Optimistic Ethereum protocol. We highly recommend that you read this section carefully to better understand the current state of Optimistic Ethereum.
:::

### The incentive contract for verification proofs is disabled

In the current release of the Optimistic Ethereum protocol, there may be rare cases in which the Sequencer submits a state root (transaction result) which is invalid and therefore could be challenged. As a result, we have not yet deployed the [Bond Manager](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/verification/OVM_BondManager.sol) contract which compensates Verifier nodes for gas spent when submitting state root challenges. Verifier nodes in a default configuration do not run the [TypeScript service which submits challenges](https://github.com/ethereum-optimism/optimism-ts-services/blob/master/src/services/fraud-prover.service.ts) in the event of mismatched state roots. Additionally, our upgrade keys have the ability to directly remove state roots without going through an uncompensated state root challenge.

### Optimism operates the only "Sequencer" node

A Sequencer node is a special node in an Optimistic Ethereum network that can order transactions on short timescales (on the order of minutes). This opens up the door to very fast transaction confirmation times with strong guarantees about finality. Eventually, the operator of the Sequencer node on a network will be determined by some governing mechanism. However, for now, Optimism PBC operates the only such node on every major OE network.

### Mainnet contract deployments are restricted by a whitelist

Contract deployments to the Optimistic Ethereum mainnet are currently restricted by a whitelist. We are slowly introducing new applications to the mainnet system in order to reduce the available exploit surface and to throttle usage. Please fill out our [integration support signup form](https://docs.google.com/forms/d/e/1FAIpQLSfBGsJN3nZQRLdMjqCS_svfQoPkn35o_cc4HUVnLlXN2BHmPw/viewform) if you'd like to deploy an application to the OE mainnet. The [Optimistic Kovan testnet](https://community.optimism.io/docs/developers/networks.html#optimistic-kovan) is fully accessible to the general public.

### Optimism's codebase is only partially audited

Optimism follows a rolling audit process in which some parts of the codebase are audited while others are still being modified. An abridged record of past audits can be found below. A more complete record (including the exact scope of each audit) can be found on the public [Optimistic Audit Record page](https://optimismpbc.notion.site/Optimistic-Audit-History-Public-0bfe66af91ae4f778f92206c437814bd).

Please keep in mind that **an audit is NOT a stamp of approval**.
Furthermore, many of the audited files have been modified since the listed audit took place.

| Engagement                                               | Start Date   | Commit\*                                                                                                                                 |
| -------------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [OpenZeppelin](https://openzeppelin.com/)                | `2020-10-01` | [`ethereum-optimism/contracts@ec1afca9e1`](https://github.com/ethereum-optimism/contracts/tree/ec1afca9e15117608121377b15d66cb56084e52d) |
| [Trail of Bits](https://www.trailofbits.com/)            | `2020-10-12` | [`ethereum-optimism/contracts@f6f5f3a63b`](https://github.com/ethereum-optimism/contracts/tree/f6f5f3a63bc99b4e9ab26b51db7206d22213c406) |
| [DappHub](https://dapphub.com/)                          | `2020-11-18` | [`ethereum-optimism/contracts@bb3539bbd1`](https://github.com/ethereum-optimism/contracts/tree/bb3539bbd10c15a72a46cf4fb8d2472ef68f6322) |
| [ConsenSys Dilligence](https://consensys.net/diligence/) | `2020-03-08` | [`ethereum-optimism/contracts@6065774571`](https://github.com/ethereum-optimism/contracts/tree/606577457191973b46034602f46ddcc130a5c0ac) |
| [OpenZeppelin](https://openzeppelin.com/)                | `2020-03-15` | [`ethereum-optimism/contracts@18e1283437`](https://github.com/ethereum-optimism/contracts/tree/18e128343731b9bde23812ce932e24d81440b6b7) |

\*Commits here refer to the archived [`contracts`](https://github.com/ethereum-optimism/contracts) repository which has since been incorporated into the [`optimism`](https://github.com/ethereum-optimism/contracts) monorepo.

## Other Questions

Have a question that wasn't answered here?
Please [create an issue on GitHub](https://github.com/ethereum-optimism/community-hub/issues).
We're aiming to keep this page up-to-date with the questions that are being most frequently at any given time.
We appreciate everyone who has asked questions on GitHub and has helped make this page as useful as possible. <3
