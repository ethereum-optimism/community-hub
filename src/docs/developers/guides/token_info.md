---
title: Obtaining Token Information
lang: en-US
---

# {{ $frontmatter.title }}

A token's L2 address may differ from that token's L1 address. You
can see the known tokens, and their addresses, in [this list](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/optimism.tokenlist.json). The relevant entries are those with the production Optimistic Ethereum chain ID, `10`.

For example, to see a user's DAI balance you might want to connect to address `0x6B175474E89094C44Da98b954EedeAC495271d0F` on L1 and address `0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1` on Optimistic Ethereum.