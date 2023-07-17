---
title: Known Issues
lang: en-US
---

## Transactions stuck in the transaction pool

OP Chain uses EIP-1559, but with different parameters than L1 Ethereum.
As a result, while the base fee on L1 can grow by up to 12.5% in a twelve second period (in the case of a single 30M gas block), the L2 base fee can grow by up to 77% (in the case of six 30M gas blocks).
However, it still shrinks by only up to 12.5% in the same twelve second period (if all the blocks are empty).

If the maximum base fee specified by the transaction is less than the block base fee, it does not get included until the base fee drops to below the value in the transaction.

### Recommendation

Set the maximum base fee for transactions to a relatively high value, such as 0.1 gwei. 
This will *not* increase the transaction cost because the same base fee, determined by a formula, is charged to all the transactions in the block. 
[See here for more details](../guides/wallet-dev.md#base-fee).

If you already have a transaction that is stuck and you want to cancel it, or increase its base fee, submit another transaction with the same nonce value. 
[See the help center for information on how to do it](https://help.optimism.io/hc/en-us/articles/17045804513307-What-to-do-with-a-stuck-pending-transaction-).



## Known non-issues

These are issues that appear like they might be a problem, but really aren't.

- **Deposit transactions don't have a chainId on L2**.

  [Deposit transactions](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/deposits.md#the-deposited-transaction-type) are transactions added to the L2 blockchain as part of the block derivation process.
  These transactions come from a dummy address and don't have a signature.
  Because in Ethereum the chainID is encoded as part of the signature, this means there is no recoverable chainID for these transactions.

  This is not a problem because the only source of deposit transactions is the block derivation process. 
  There shouldn't be a need to recover the chainID.

