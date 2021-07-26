---
title: Supported Wallets
lang: en-US
---

# {{ $frontmatter.title }}

The programming interface for Optimistic Ethereum is very similar to the 
interface for regular Ethereum, so most wallets should work as long as you
follow these rules:

- Use a valid RPC URL. You can get one, for example, from 
  [Infura](https://blog.infura.io/infura-launches-support-for-optimistic-ethereum/). Alternatively, you
  can use [QuickNode](https://www.quicknode.com/chains/optimism). Our
  end points there are `mainnet.optimism.io` and `kovan.optimism.io`.  
- Use the correct 
  [chainID](/docs/operations/networks.html): 
  **10** for the production Optimistic Ethereum network, 
  **69** for the Optimistic Kovan test network.
- Keep the fees that the dapp specifies. Fees on Optimistic Ethereum are not
  freely editable as they are on L1 Ethereum.


Supported wallets on Optimistic Ethereum:

<img style="vertical-align:baseline; float:left; width:20px; height:20px;" src="./metamask.png">[Metamask, see the detailed tutorial](/docs/users/metamask.html)

<img style="vertical-align:baseline; float:left; width:20px; height:20px;" src="./imToken.jpeg">[imToken](https://support.token.im/hc/en-us/articles/900006289803-How-to-use-Layer-2-network-through-imToken's-custom-network-function-)

<img style="vertical-align:baseline; float:left; width:20px; height:20px;" src="./rainbow.png">[Rainbow Wallet](https://github.com/rainbow-me/rainbow)

<img style="vertical-align:baseline; float:left; width:20px; height:20px;" src="./coinbase.png">[Coinbase Wallet](https://medium.com/ethereum-optimism/improving-ux-on-l2-ff2f88f44836)