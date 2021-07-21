---
title: Supported Wallets
lang: en-US
---

# {{ $frontmatter.title }}

The programming interface for Optimistic Ethereum is very similar to the 
interface for regular Ethereum, so most wallets should work as long as you
follow these rules:

- Use a valid RPC URL. You can get one, for example, from 
  [Infura](https://blog.infura.io/infura-launches-support-for-optimistic-ethereum/).
- Use the correct 
  [chainID](/docs/operations/networks.html): 
  **10** for the production Optimistic Ethereum network, 
  **69** for the Optimistic Kovan test network.
- Keep the fees that the dapp specifies. Fees on Optimistic Ethereum are not
  freely editable as they are on L1 Ethereum.


These are wallets that we verified work with Optimistic Ethereum:


## Metamask 

[See the detailed tutorial here](http://localhost:8080/docs/users/metamask.html)

## ImToken

[Click here for an explanation of how to use imToken with Optimistic 
Ethereum](https://support.token.im/hc/en-us/articles/900006289803-How-to-use-Layer-2-network-through-imToken's-custom-network-function-)


## Rainbow Wallet

[Rainbow Wallet](https://rainbow.me/) has a [pull request with
Optimistic Ethereum 
support](https://github.com/rainbow-me/rainbow/pull/2116).


## Coinbase Wallet 

[Coinbase Wallet also supports Optimistic 
Ethereum](https://medium.com/ethereum-optimism/improving-ux-on-l2-ff2f88f44836)