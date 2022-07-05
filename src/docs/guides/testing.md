---
title: Testing on Optimistic Kovan
lang: en-US
---

You can connect to Optimistic Kovan, our test network, [using these endpoints](../useful-tools/networks.md).
To obtain ETH and tokens (both ERC-20 and NFT), [see here](../useful-tools/faucets.md).

This page shows some additional testing utilities that you might find useful.


## Tokens

We have several ERC-20 testing token contracts.
This token is an implementation of ERC-20, with the addition of `faucet`, a function that mints for the caller 1000 tokens to facilitate testing.

### Kovan ERC-20 testing contracts


| Address | Symbol | Decimals | 
| - | - | -: | 
| [`0xC905388A3F73d796494b4D8D164844e166B0bA48`](https://kovan-optimistic.etherscan.io/address/0xC905388A3F73d796494b4D8D164844e166B0bA48) | OUT-1 | 0 | 
| [`0xA058b82EAB4966B1D9A10Fe0aC224FC34a69751F`](https://kovan-optimistic.etherscan.io/address/0xA058b82EAB4966B1D9A10Fe0aC224FC34a69751F) | OUT-2 | 0 | 
| [`0xA6dB0d5e8069f4027055Dbe165956218B64BA5C0`](https://kovan-optimistic.etherscan.io/address/0xa6db0d5e8069f4027055dbe165956218b64ba5c0) | OUT-3 | 0 | 
| [`0x5F6572727a825D1B8e1DFa9810d52101ed6d522a`](https://kovan-optimistic.etherscan.io/address/0x5F6572727a825D1B8e1DFa9810d52101ed6d522a) | OUT-4 | 0 | 
| [`0x5a1081FcaF5886845D5FE49fe0DE583EA15C4df3`](https://kovan-optimistic.etherscan.io/address/0x5a1081FcaF5886845D5FE49fe0DE583EA15C4df3) | OUT-5 | 0 
| [`0x010445A1bec4BD8e35e8c08Fbf46c05B4CD00100`](https://kovan-optimistic.etherscan.io/address/0x010445A1bec4BD8e35e8c08Fbf46c05B4CD00100) | Out-x.3 | 3 | 



### Goerli ERC-20 testing contracts

| Address | Symbol | Decimals | 
| - | - | -: | 
| [`0xeff05792d6cae56fd01fbd0fd87c25b423f4d96e`](https://l2-explorer.surge.sh/account/0xeff05792d6cae56fd01fbd0fd87c25b423f4d96e) | OUT | 0 |




## The bridge

You can bridge between [this token on Kovan](https://kovan.etherscan.io/address/0x3A4a0F1FC238bb0C694A5E7535069c02622Ac5DF#readContract) and [this token on Optimistic Kovan](https://kovan-optimistic.etherscan.io/address/0xdFc18Aa448CD0cD50D2C90Ba74D59Ee001F1d3d6#readContract). 
They both have three decimal points. 
While `faucet` only gives you a single token, you can move token fractions.


## Uniswap pools

### Kovan uniswap pools

We have four pools between the tokens above:

| Token 1 | Token 2 | Contract |
| ------- | ------- | -------- |
| OUT-1   | OUT-2   | [`0x96395abcd24badf7745bfe0f37c398b5a6072ed5`](https://kovan-optimistic.etherscan.io/address/0x96395abcd24badf7745bfe0f37c398b5a6072ed5#tokentxns)
| OUT-2   | OUT-3   | [`0x19c83d25a9ca57bc6e4121f6394c82c72bb5a474`](https://kovan-optimistic.etherscan.io/address/0x19c83d25a9ca57bc6e4121f6394c82c72bb5a474)
| OUT-3   | OUT-4   | [`0x8d43f75527072b22047433a65065dd948d289ada`](https://kovan-optimistic.etherscan.io/address/0x8d43f75527072b22047433a65065dd948d289ada#tokentxns)
| OUT-4   | OUT-5   | [`0xda11e21eca45840b253d02b7868f82f458740dd3`](https://kovan-optimistic.etherscan.io/address/0xda11e21eca45840b253d02b7868f82f458740dd3#tokentxns) |


### Goerli uniswap pools

Not supported yet.
