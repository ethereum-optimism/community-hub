---
title: Future Proofing your Optimistic Dapp
lang: en-US
---

# {{ $frontmatter.title }}

::: warning NOTICE
[It’s difficult to make predictions, especially about the 
future](https://quoteinvestigator.com/2013/10/20/no-predict/). This document is based
on what we think is going to happen, and some things will turn out to be different.
:::


## Regenesis

In order to quickly iterate and make significant changes to the 
Optimistic Ethereum network, we will need to perform a type of upgrade called a "regenesis". 
During a regenesis, the state of the chain is snapshotted (including all users' nonces, 
token balances, contract code, and contract storage) and a new chain is spun up from that 
snapshot. This means that all historical transactions and logs will be inaccessible from the 
new chain, and the new chain will start from Block #0. The old chain data will not be 
accessible except under extreme circumstances.

If you expect to need this old data, it is recommended that you store it on your servers.

### Timeline

| Timeline        |     Action                                                              |
| --------------- | - |
| 14 days prior   | We'll announce the regenesis at least two weeks before it happens (usually much earlier, but dates might slip) |
|  7 days prior   | Regenesis on Kovan (or a different test network)
| 6-1 days prior  | During this time all the dapps running on Optimistic Ethereum should run their tests and ensure nothing breaks |
| Regenesis day   | We expect a regenesis to take up to 12 hours. At the start of regenesis, all deposits will be halted and no transactions will be ingested via the sequencer until the regenesis is complete. |
| After regenesis | Graph resyncs their hosted service </br> Users redeploy all of their Optimism subgraphs </br> Etherscan no longer contains historical data from before the resync |

### Schedule

* 0.4.0 - ETH value, Standard Bridge, Fees. 22-JUN-2021
* 0.5.0 - OVM 2.0 [You can read about the expected 
  changes here](/docs/developers/l2/deploy.html#key-info)
  * Testnet, already done
  * Mainnet, November 11th

* 0.6.0 - London, Q1 2022 (expected)

