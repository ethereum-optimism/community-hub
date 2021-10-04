---
title: Withdrawing from Optimistic Ethereum
lang: en-US
---

# {{ $frontmatter.title }}

::: tip Where is my money?
If you are not sure what is happening with your withdrawal, [search for the transaction
hash here](https://optimistic.etherscan.io/messagerelayer), the withdrawal might 
still be in the validity challenge period. Alternatively, you might just need to 
[finalize the transaction](#finalize-the-withdrawal).
:::




## Which Assets?

### Ether

At writing [the Optimism Gateway](https://gateway.optimism.io/) is the sole
option to withdraw ETH directly.


### ERC-20 Tokens

* [The Optimism Gateway](https://gateway.optimism.io/).
  We have a [list of supported ERC-20 tokens](https://static.optimism.io/optimism.tokenlist.json), but you are not limited to them, [you can select any 
  token that exists on both L1 and L2](https://optimismpbc.medium.com/arbitrary-token-bridging-d552f6bef694).

* [Third-party bridges](https://www.optimism.io/apps/bridges). Those bridges are
  usually cheaper and faster than our main gateway, but have a more limited list
  of supported tokens. The way this works is that the bridge loans you the
  relevant asset on L1 (mainnet).

  When enough of an asset has accumulated, the bridge sends all of those
  tokens to L1 in one gateway transaction. This way:

  * You don't have to wait the normal challenge verification period. The
    bridge takes the risk that the block with the transaction (or a prior one)
    is invalid. Bridges run their own verification so it's not a big risk
    for them.
  * The cost of the merkle proof required for a withdrawal transaction is 
    amortized over a larger pool of tokens, so the relative cost of the 
    withdrawal is smaller.



## Withdrawing through the Optimism Gateway

Withdrawals through the Optimism Gateway is a multi-step process:

1. [Initiate the withdrawal](#initiate-the-withdrawal) on Optimistic Ethereum
1. Wait the verification challenge period, which is *seven days*. Note that the
   seven days are counted from the point the transaction is published on L1,
   which in case of outage may be later than when you initiate the withdrawal.
1. [Finalize the transaction](#finalize-the-withdrawal)

### Initiate the withdrawal

1. [Browse to the gateway](https://gateway.optimism.io/).
1. Click **CONNECT**, select your wallet type, and approve the connection in the 
   wallet itself if asked.
1. Make sure the form is correct:

   A. **Withdraw** is selected
    
      <div style="display:inline-block">
      <img src="../../assets/docs/users/withdraw/withdraw-form-a.png" alt="Withdrawal form" width="40%" style="float:left">
      </div>

   B. From **OPTIMISTIC ETHEREUM**

      <div style="display:inline-block">
      <img src="../../assets/docs/users/withdraw/withdraw-form-b.png" alt="Withdrawal form" width="40%" style="float:left">
      </div>

   C. The amount is possible. Click **MAX** to see the maximum amount 
      you can deposit (after accounting for transaction costs), and 
      if relevant enter a lower amount.

      <div style="display:inline-block">
      <img src="../../assets/docs/users/withdraw/withdraw-form-c.png" alt="Withdrawal form" width="40%" style="float:left">
      </div>

   D. The asset is the one you with to withdraw.

      <div style="display:inline-block">
      <img src="../../assets/docs/users/withdraw/withdraw-form-d.png" alt="Withdrawal form" width="40%" style="float:left">
      </div>

1. Click **WITHDRAW**.
1. Click **WITHDRAW** again to confirm.
1. Confirm the transaction in the wallet.

### Finalize the withdrawal

1. There are several ways to see if your withdrawal is ready to be finalized:

   *  [Browse to the gateway](https://gateway.optimism.io/) and click your
      account. This shows you the list of recent withdrawals and their status:

      <div style="display:inline-block">
      <img src="../../assets/docs/users/withdraw/withdrawal-gw-1.png" alt="Withdrawal date on the gateway" width="40%" style="float:left">
      </div>

      Click a specific withdrawal to see exactly when it will become available.

      <div style="display:inline-block">
      <img src="../../assets/docs/users/withdraw/withdrawal-gw-2.png" alt="Withdrawal date on the gateway" width="40%" style="float:left">
      </div>

   * Search the transaction hash on 
     [the message relayer](https://optimistic.etherscan.io/messagerelayer). If the 
     transaction is ready to be finalized, the **Execute** button will be available.

   *  You can search for the transaction hash on 
      [Optimistic Etherscan](https://optimistic.etherscan.io/). Click the L1
      State Root Submission Tx. 

      <div style="display:inline-block">
      <img src="../../assets/docs/users/withdraw/withdrawal-etherscan-1.png" alt="Withdrawal date on Etherscan" width="40%" style="float:left">
      </div>

      The verification challenge period starts when
      that transaction is confirmed:

      <div style="display:inline-block">
      <img src="../../assets/docs/users/withdraw/withdrawal-etherscan-2.png" alt="Withdrawal date on Etherscan" width="40%" style="float:left">
      </div>

1. Once the challenge period is over, you can either click on the transaction at
   the gateway or search for its hash on 
   [the message relayer](https://optimistic.etherscan.io/messagerelayer).

1. If the Execute button isn't greyed out it means the transaction is ready
   to be finalized. Make sure your wallet is connected to the L1 Ethereum network
   (mainnet) and click **Execute**.