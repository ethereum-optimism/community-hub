---
title: Known Issues (none)
lang: en-US
---

**None at present**



## Known non-issues

These are issues that appear like they might be a problem, but really aren't.

- **Deposit transactions don't have a chainId on L2**.

  [Deposit transactions](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md#the-deposited-transaction-type) are transactions added to the L2 blockchain as part of the block derivation process.
  These transactions come from a dummy address and don't have a signature.
  Because in Ethereum the chainID is encoded as part of the signature, this means there is no recoverable chainID for these transactions.

  This is not a problem because the only source of deposit transactions is the block derivation process. 
  There shouldn't be a need to recover the chainID.

