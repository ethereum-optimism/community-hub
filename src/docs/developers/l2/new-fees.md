---
title: Transaction Fees for Developers
lang: en-US
---

# {{ $frontmatter.title }}

You can see how the fee is calculated and deducted [here](https://optimismhelp.zendesk.com/hc/en-us/articles/4411895794715-Transaction-Fees).

Every Optimism transaction has two costs:

1. The **L2 execution fee** pays for the costs incurred in running the transaction. It is calculated the same way as in L1 Ethereum: `tx.gasPrice * l2GasUsed`. Typically `tx.gasPrice` is 0.001 gwei ([You can check the current L2 gas price here](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)), but in time of congestion it can rise.

   This is cost is accessible via the normal Ethereum mechanisms, you can estimate it using ethers' [`estimateGas`](https://docs.ethers.io/v5/api/contract/contract/#contract-estimateGas), for example.

2. The **L1 security fee** pays for the cost of publishing the transaction on L1 (the cost of Ethereum equivalent security). It is deducted automatically from the user's ETH balance on Optimism. It is based on three factors:

   - The gas price for L1 transactions (when the transaction was processed). You can see the current value [here](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

   - The gas used on L1 to publish the transaction. This is based on the transaction length, as well as the byte type (whether it is zero or a different value) for each byte. It scales, roughly speaking, with the size of your calldata.

   - The L1 fee scalar, which is at writing 1.5. This value covers the change in L1 gas price between the time the transaction is submitted and when it is published, as well as the income we need to keep our system running.

For example, lets look at [this transaction](https://optimistic.etherscan.io/tx/0x3ba996515abd898cd7e939aad4bd086b0d5159d14b4bc639e00d47a3aa68fd09). The **L2 execution fee** is the gas used, `108,207`, times the l2 gas price at the time, which was 0.001 gwei. In other words, approximately 108 gwei. The **L1 security fee**, on the other hand, is 4,862 (a fairly typical value, although longer transactions naturally cost more). At the L1 gas price at the time, about 75 gwei, this gives us an L1 security fee of `75*4,862*1.5 = 546,975 gwei`. So the L1 security fee is about five thousand times the L2 execution fee.

::: tip
This transaction is typical. In almost all cases **L2 execution fee** is negligible compared to the **L1 security fee**.
:::

## For backend developers
- You must send your transaction with a tx.gasPrice that is greater than or equal to the sequencer's l2 gas price. You can read this value from the Sequencer by querying the `OVM_GasPriceOracle` contract  (`OVM_GasPriceOracle.gasPrice`) or by simply making an RPC query to `eth_gasPrice`.  If you don't specify your `gasPrice` as an override when sending a transaction , `ethers` by default queries `eth_gasPrice` which will return the lowest acceptable L2 gas price.
- You can set your `tx.gasLimit` however you might normally set it (e.g. via `eth_estimateGas`). You can expect that gas usage for transactions on Optimism Ethereum will be identical to gas usage on Ethereum.
- We recommend building error handling around the `Fee too Low` error detailed below, to allow users to re-calculate their `tx.gasPrice` and resend their transaction if fees spike.

## For Frontend and Wallet developers
- We recommend displaying an estimated fee to users via the following math:
   1. To estimate the L1 (security) fee that the user should expect to pay. For example, calculating the L1 fee for sending a WETH transfer:

      ```ts
      import { getContractFactory, predeploys } from '@eth-optimism/contracts'
      import { ethers } from 'ethers'

      const main = async () => {
         // Create an ethers provider connected to the public mainnet endpoint.
         const provider = new ethers.providers.JsonRpcProvider(
            'https://mainnet.optimism.io'
         )

         // Create contract instances connected to the GPO and WETH contracts.
         const GasPriceOracle = getContractFactory('OVM_GasPriceOracle')
            .attach(predeploys.OVM_GasPriceOracle)
            .connect(provider)
         const WETH = getContractFactory('WETH9')
            .attach(predeploys.WETH9)
            .connect(provider)

         // An account with a small amount of WETH in it on mainnet
         const from = '0xbeefbeefbeefbeefbeefbeefbeefbeefbeefbeef'
         // Arbitrary recipient address.
         const to = '0x1111111111111111111111111111111111111111'
         // Small amount of WETH to send (in wei).
         const amount = 1234

         // Compute the estimated fee in wei
         const l1FeeInWei = await GasPriceOracle.getL1Fee(
            ethers.utils.serializeTransaction({
               ...(await WETH.populateTransaction.transfer(to, amount)),
               gasPrice: await provider.getGasPrice(),
               gasLimit: await WETH.estimateGas.transfer(to, amount, {
               from,
               }),
            })
         )

         console.log(`Estimated L1 fee (in wei): ${l1FeeInWei.toString()}`)
      }

      main()

      ```

- You should *not* allow users to change their `tx.gasPrice`
   - If they lower it, their transaction will get reverted
   - If they increase it, they will get their transaction included immediately (same as with the
     correct price) but at a higher cost
- Users are welcome to change their `tx.gasLimit` as it functions exactly like on L1
- You can show the math :

   ```jsx
   L1 Fee:    0.000,680,850 ETH ($3.25)
   L2 Fee:    0.000,000,195 ETH (~zero)
   ____________________________________
   Total Fee: 0.000,681,045 ETH ($3.25)
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
