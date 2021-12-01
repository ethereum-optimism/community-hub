---
title: Transaction Challenges
lang: en-US
---

# {{ $frontmatter.title }}

::: tip NOTICE
Optimistic Ethereum is still in beta.
**As of the [OVM 2.0 upgrade](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306), the Transaction Challenge process described in this article has been temporarily disabled as we rebuild the mechanism for the new EVM equivalent version of the Optimistic Etheruem protocol.**
You can check out an up-to-date analysis of the current security model [here](https://l2beat.com/projects/optimism/).
:::

Optimistic Ethereum is secured by a set of dispute contracts which live on Layer 1. Bonded "proposers" can make a claim about the state of the chain, and the dispute contracts allow for anybody watching the chain (a "verifier") to challenge malicious proposals. If a proposal goes unchallenged for enough time (the "challenge period", currently set to 1 week), then it is considered finalized. This allows the system to enforce that only correct proposals are finalized, and the rest are rejected, so long as 1 honest verifier responds before the week is up.

## Does this mean I have to wait a week to withdraw my funds?

Because the challenge period must elapse before L1 can know the finalized state of the system, the default token bridging mechanism (as accessible via the OE [gateway](http://gateway.optimism.io)) does indeed introduce a delay of 1 week before withdrawn funds are unlocked on L1.

While the base protocol has this restriction, it is possible to leverage third-party liquidity providers to enable fast withdrawals. As a user, you may want to move funds via these bridges instead of the standard gateway—you can find a list of fast bridges [here](https://www.optimism.io/apps/bridges) on our website.

## Does this mean I have to wait a week to know my transaction is secured?

One of the most common questions we get about fraud proofs is: *"what happens to my transaction if there is a fraudulent proposal? Will my transaction be reverted?"* The answer is: **no.** When a proposal is challenged on L1, it only removes the claim about what the outcome of some transactions were — NOT the transactions themselves. A successful challenge just means that the correct proposal can be finalized in its place which correctly reflects what the recent transactions did. This means that any verifier can achieve "subjective finality" as fast as the transactions are rolled up to L1. You only have to wait one week for L1 to know that your transaction is finalized; but you can know what the outcome *will be* right away.