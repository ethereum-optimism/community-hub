---
title: OP Mainnet's Security Model
lang: en-US
---

OP Mainnet is a work in progress.
Constantly pushing to improve the security guarantees that users have while using OP Mainnet is a top priority.
At the moment, **it’s important to understand that the security of OP Mainnet is dependent on a [multisig wallet](https://www.coindesk.com/tech/2020/11/10/multisignature-wallets-can-keep-your-coins-safer-if-you-use-them-right/)** managed by several anonymous individuals.
This multisig wallet can be used to upgrade core OP Mainnet smart contracts without upgrade delays.

Please also keep in mind that just like any other system, **the Optimism codebase may contain unknown bugs** that could lead to the loss of some or all of the assets held within the system.
[2222 smart contract codebase has been audited repeatedly](https://github.com/ethereum-optimism/optimism/tree/develop/technical-documents/security-reviews) but **audits are not a stamp of approval** and **a completed audit does not mean that the audited codebase is free of bugs.**
It’s important to understand that using OP Mainnet inherently exposes you to the risk of bugs within the Optimism codebase, and that you use OP Mainnet at your own risk.

## Security Model FAQ

### Does OP Mainnet have fault proofs?

**No**, OP Mainnet does not currently have fault proofs.
**Fault proofs do not meaningfully improve the security of a system if that system can be upgraded within the 7 day challenge window (”fast upgrade keys”)**.
A system with fast upgrade keys, such as OP Mainnet, is fully dependent on the upgrade keys for security.
OP Mainnet's goal is to be the first system that deploys fault proofs that can secure the system by themselves, without fast upgrade keys.

### Who manages the multisig?

The multisig is managed by an anonymous set of individuals.
Members are anonymous in order to make the multisig more difficult to compromise.

### How is Optimism planning to remove the multisig?

Check out Optimism’s detailed [Pragmatic Path to Decentralization](https://medium.com/ethereum-optimism/our-pragmatic-path-to-decentralization-cb5805ca43c1) post for a detailed view into how the multisig may be removed in a way that makes OP Mainnet the first chain with true fault proof security.

### How can I help make OP Mainnet more secure?

[OP Mainnet has one of the biggest bug bounties (ever)](./bounties.md).
You can earn up to $2,000,042 by finding critical bugs in the Optimism codebase.
You can also run your own verifier node to detect network faults.
