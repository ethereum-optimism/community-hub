---
title: Transaction Fees for Developers
lang: en-US
---

# {{ $frontmatter.title }}

You can see how the fee is calculated and deducted [here](../../users/fees-2.0.md).

## For backend developers:
- You must send your transaction with a tx.gasPrice that is greater than or equal to the sequencer's l2 gas price. You can read this value from the Sequencer by querying the `OVM_GasPriceOracle` contract  (`OVM_GasPriceOracle.gasPrice`) or by simply making an RPC query to `eth_gasPrice`.  If you don't specify your `gasPrice` as an override when sending a transaction , `ethers` by default queries `eth_gasPrice` which will return the lowest acceptable L2 gas price.
- You can set your `tx.gasLimit` however you might normally set it (e.g. via `eth_estimateGas`). You can expect that gas usage for transactions on Optimism Ethereum will be identical to gas usage on Ethereum.
- We recommend building error handling around the `Fee too Low` error detailed below, to allow users to re-calculate their `tx.gasPrice` and resend their transaction if fees spike.

## For Frontend and Wallet developers:
- We recommend displaying an estimated fee to users via the following math:
   1. To estimate the L1 (security) fee that the user should expect to pay. For example, calculating the L1 fee for sending a USDC transfer:

```jsx
import { getContractFactory, predeploys }from '@eth-optimism/contracts'
import { ethers } from 'ethers'
const OVM_GasPriceOracle = getContractFactory('OVM_GasPriceOracle')
.attach(predeploys.OVM_GasPriceOracle)
const WETH = new Contract(...) //Contract with no signer
const unsignedTx = WETH.populateTransaction.transfer(to, amount)
const serializedTx = serialize({
      nonce: parseInt(unsignedTx.nonce.toString(10), 10),
      value: unsignedTx.value,
      gasPrice: unsignedTx.gasPrice,
      gasLimit: unsignedTx.gasLimit,
      to: unsignedTx.to,
      data: unsignedTx.data,
    })
const l1FeeInWei = await OVM_GasPriceOracle.getL1Fee(serializedTx)
```

- You should *not* allow users to change their `tx.gasPrice`
   - If they lower it, their transaction will get reverted
   - If they increase it, they willl still have their tx immediately included, but will have overpaid.
- Users are welcome to change their `tx.gasLimit` as it functions exactly like on L1
- You can show the math :

   ```jsx
   L1 Fee: .00098 ETH ($3.94)
   L2 Fee: .00049 ETH ($1.97)
   ____________________________
   Estimated Fee: 0.00147 ETH ($5.91)
   ```

- Or you can hide the formula behind a tooltip or an "Advanced" section and just display the estimated fee to users
   - For MVP: don't *need* to display the L1 or L2 fee
- Might need to regularly refresh the L1 Fee and L2 Fee estimate to ensure it is accurate at the time the user sends it (e.g. they get the fee quote and leave for 12 hours then come back)
   - Ideas: If the L1 fee quoted is > Xminutes old, could display a warning next to it


## Common RPC Errors

There are three common errors that would cause your transaction to be rejected at the RPC level

1. **Insufficient funds**
   - If you are trying to send a transaction and you do not have enough ETH to pay for that L2 fee + the L1 Fee charged, your transaction will be rejected.
   - Error code: `-32000`
   - Error message: `invalid transaction: insufficient funds for l1Fee + l2Fee + value`
2. **Gas Price to low**
   - Error code: `-32000`
   - Error message: `gas price too low: 1000 wei, use at least tx.gasPrice = X wei`  where `x` is l2GasPrice.
      - Note: values in this error message vary based on the tx sent and current L2 gas prices
   - It is recommended to build in error handling for this. If a user's transaction is rejected at this level, just set a new `tx.gasPrice` via RPC query at `eth_gasPrice` or by calling `OVM_GasPriceOracle.gasPrice`
3. **Fee too large**
   - Error code: `-32000`
   - Error message: `gas price too high: 1000000000000000 wei, use at most tx.gasPrice = Y wei`  where `x` is 3*l2GasPrice.
   - When the `tx.gasPrice` provided is ≥3x the expected `tx.gasPrice`, you will get this error^, note this is a runtime config option and is subject to change
