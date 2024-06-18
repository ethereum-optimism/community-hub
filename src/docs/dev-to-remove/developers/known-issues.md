---
title: Known Issues
lang: en-US
---

## Transactions stuck in the transaction pool

OP Chain uses EIP-1559, but with different parameters than L1 Ethereum.
As a result, while the base fee on L1 can grow by up to 12.5% in a twelve second period (in the case of a single 30M gas block), the L2 base fee can grow by up to 77% (in the case of six 30M gas blocks).
However, it still shrinks by only up to 12.5% in the same twelve second period (if all the blocks are empty).

If the maximum fee per gas specified by the transaction is less than the block base fee, it does not get included until the base fee drops to below the value in the transaction.
When this happens, some users may see their transaction become stuck. 
No funds are lost, but the transaction does not clear on its own. 

We have a workaround that users and wallet operators can implement immediately, and we expect a protocol-level fix to be live by the end of Q4.

### Recommendation

Set the maximum fee per gas for transactions to a relatively high value, such as 0.1 gwei. 
This will *not* increase the transaction cost because the same base fee, determined by a formula, is charged to all the transactions in the block. 
[See here for more details](../guides/wallet-dev.md#base-fee).
To save on the cost of L2 gas you want to minimize the max priority fee.

Also, if the [current base fee](https://optimism.io/gas-tracker) is comparable to 0.1 gwei or higher, you might want to suggest to users a higher multiple of the base fee than you would on L1 Ethereum, because it can grow faster in the time interval between transaction creation and transaction signing and submission. 

#### Recommendations for wallet developers

Wallets are usually in charge of determining the default priority fee and max fee that a transaction would include, so the above recommendations can be applied directly.


#### Recommendations for dapp developers

As a dapp developer you can usually override the default recommendation of the wallet
(see, for example, [ethers](https://github.com/ethers-io/ethers.js/blob/v5.7/packages/contracts/lib/index.d.ts#L10-L11)). 
As long as not all wallets are upgraded according to our recommendations, it makes sense for dapps to get the current base fee and recommend a value based on that.


#### Recommendations for users

As a user you are the final authority on transaction fields.
[See the help center](https://help.optimism.io/hc/en-us/articles/16711400204315-Managing-the-gas-fees-that-make-up-the-L2-execution-fee) for an explanation of how to modify the fees.

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

