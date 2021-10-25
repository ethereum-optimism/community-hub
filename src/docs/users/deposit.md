---
title: Depositing into Optimistic Ethereum
lang: en-US
---

# {{ $frontmatter.title }}

::: tip OVM 2.0 Release Dates
OVM 2.0 is already released on the Kovan test network.
We expect to deploy it to the production Optimistic Ethereum network on November 11th.
:::

## Which Assets?

### Ether

Optimistic Ethereum transactions require ETH, just as do L1 Ethereum
transactions (except a lot less of it). Here are some ways to get 
your Ether to Optimistic Ethereum.

* [The teleporter](https://portr.xyz/), a custodial gateway that
  allows you transfer up to 0.05 ETH. It is a cheap gateway, but a
  custodial one (meaning you trust the people running it to be 
  honest)
* [The Optimism Gateway](https://gateway.optimism.io/), 
  which costs more but allows for larger transfers and uses the same
  underlying trust mechanisms as Optimistic Ethereum itself.
* [Hop](https://app.hop.exchange/send?token=ETH&sourceNetwork=ethereum&destNetwork=optimism)
  which also allows large transfers, but may have a different exchange 
  rate than 1:1. 


### ERC-20 Tokens

* [The Optimism Gateway](https://gateway.optimism.io/).
  We have a [list of supported ERC-20 tokens](https://static.optimism.io/optimism.tokenlist.json), but you are not limited to them, [you can select any 
  token that exists on both L1 and L2](https://optimismpbc.medium.com/arbitrary-token-bridging-d552f6bef694).

  ::: tip
  Do **not** attempt to transfer a token that isn't in the user interface unless
  you are sure of the Optimistic Ethereum address of the equivalent ERC-20 token.
  :::

* [Third-party bridges](https://www.optimism.io/apps/bridges). Those bridges are
  usually cheaper and faster than our main gateway, but have a more limited list
  of supported tokens.


## Depositing through the Optimism Gateway

1. [Browse to the gateway](https://gateway.optimism.io/).
1. Click **CONNECT**, select your wallet type, and approve the connection in the 
   wallet itself if asked.
1. Make sure the form is correct:

   * **Deposit** is selected
    
     <div style="display:inline-block">
     <img src="../../assets/docs/users/getting-started/deposit-form-a.png" alt="Deposit form" width="40%" style="float:left">
     </div>

   * From **MAINNET**
     <div style="display:inline-block">
     <img src="../../assets/docs/users/getting-started/deposit-form-b.png" alt="Deposit form" width="40%" style="float:left">
     </div>

   * The asset is the one you wish to deposit.

     <div style="display:inline-block">
     <img src="../../assets/docs/users/getting-started/deposit-form-c.png" alt="Deposit form" width="40%" style="float:left">
     </div>

   * Set an amount that is available in your account. Click **MAX** if 
     you want to deposit your entire balance.

     <div style="display:inline-block">
     <img src="../../assets/docs/users/getting-started/deposit-form-d.png" alt="Deposit form" width="40%" style="float:left">
     </div>      

1. Click **DEPOSIT**.
1. Click **DEPOSIT** again to confirm.
1. Confirm the transaction in the wallet, wait until the transaction is confirmed and the ETH
   deposited to Optimistic Ethereum.
1. [Browse here](https://chainid.link/?network=optimism) and click
   **connect** to add the Optimistic Ethereum network to your wallet. 
   You will need to approve this addition in your wallet. The network
   notification in MetaMask is shown below, other wallets are likely
   to be similar

      <div style="display:inline-block">
      <img src="../../assets/docs/users/getting-started/add-net-metamask.png" alt="MetaMask add network notification" width="40%" style="float:left">
      </div>   