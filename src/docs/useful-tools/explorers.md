---
title: Block Explorers
lang: en-US
---

## Etherscan

We have Etherscan explorers for the [Optimism mainnet](https://optimistic.etherscan.io) and the [Optimism Kovan testnet](https://kovan-optimistic.etherscan.io).
Etherscan has lots of tools to help you debug transactions.

Optimistic Etherscan has all the tools you expect from Etherscan, such as:
- [Detailed transaction information](https://optimistic.etherscan.io/tx/0x292423266d6da24126dc4e0e81890c22a67295cc8b1a987e71ad84748511452f)
- [List of events emitted by a transaction](https://optimistic.etherscan.io/tx/0x292423266d6da24126dc4e0e81890c22a67295cc8b1a987e71ad84748511452f#eventlog)
- [Contract source code and verification](https://optimistic.etherscan.io/address/0x420000000000000000000000000000000000000F#code)
- And everything else you might find on Etherscan!

It's also got some Optimism-specific features:
- [A list of L1-to-L2 transactions](https://optimistic.etherscan.io/txsEnqueued)
- [A list of L2-to-L1 transactions](https://optimistic.etherscan.io/txsExit)
- [A tool for finalizing L2-to-L1 transactions](https://optimistic.etherscan.io/messagerelayer)
- And more! Just check it out and click around to find all of the available features.

Etherscan currently provides the most advanced block explorers for all Optimism Ethereum networks.

### Access to pre-regenesis history

The Etherscan user interface only shows information since our final regenesis on November 11th, 2021. 
To retrieve older transactions, run the query as you would normally, and then use the **CSV Export** tool.

![CSV Export](../../assets/docs/useful-tools/explorers/etherscan_csv_export.png)

This CSV export feature works for transaction starting at June 23rd, 2021. If you need anything older, please contact us.

