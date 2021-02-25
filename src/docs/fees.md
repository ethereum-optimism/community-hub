---
title: Fees on Optimistic Ethereum
lang: en-US
tags:
    - contracts
    - protocol
    - fees
---

# {{ $frontmatter.title }}

Optimistic Ethereum handles transaction fees in (mostly) the same way Ethereum does.
In a nutshell, **users pay for transactions in ETH just as they would on L1**.

However, there are a few low-level protocol quirks that can have a small impact the exact fee amount paid.
This page explains those quirks and the situations in which they apply.
If you're planning to build applications on Optimistic Ethereum, you may find this information interesting or useful.

## Standard Transaction Fee Formula
The formula for the exact amount of ETH charged per transaction on Optimistic Ethereum is:

```
fee (ether) = transaction.gasPrice (ether per gas) * transaction.gasLimit (gas)
```

You may notice that this differs from the standard Ethereum gas cost formula in that a fee is charged based on the `transaction.gasLimit` instead of `transaction.gasUsed`.
This is a side-effect of the fact that a majority of the cost of a rollup (in terms of Layer 1 transaction fees) comes from calldata and not from computation.
Although this is a little different, the overall experience of using the system remains unchanged.
The L2 `transaction.gasPrice` will be significantly lower than on Layer 1, so the fee ultimately paid will be proportionally low.

## Fees for L1 → L2 Transactions
Transactions that are submitted directly to the [Canonical Transaction Chain](https://community.optimism.io/docs/protocol.html#chain) contract on Layer 1 (as opposed to transactions submitted to a [sequencer]()) are paid for by burning a certain amount of Layer 1 gas.
These transactions do **not** have to pay a fee on top of the gas burned.
The exact amount of gas burned is:

```
fee (ether) = transaction.gasLimit / L2_GAS_DISCOUNT_DIVISOR
```

Where [`L2_GAS_DISCOUNT_DIVISOR`](https://github.com/ethereum-optimism/contracts/blob/b2a98aab650548e66b614571a0f5666c4f54f89d/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol#L295-L313) is a essentially a measure of the "scalability" of the L2 system.
This gas burning step is necessary to make sure that a bad actor can't easily spam Optimistic Ethereum with computationally expensive transactions.
From an end-user perspective, this just looks like a slightly more expensive L1 transaction.
We imagine that most transactions will be sent via a sequencer and will therefore not have to worry about this gas burning step.
