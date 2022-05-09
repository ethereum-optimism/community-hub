---
title: Making Optimism Dapps Even Cheaper
lang: en-US
---

The cost of using a decentralized application in Optimism is much lower than the cost of the equivalent application on L1 Ethereum.
[See here](https://l2fees.info/) for the current values.
However, with proper optimization, we can make our decentralized applications even cheaper.
Here are some strategies.


## Background

### What are the transaction fees?

The cost of an L2 transaction on Optimism is composed of two components:

- L2 execution fee, which is proportional to the gas actually used in processing the transaction.
  Except when the system is extremely congested, the cost of L2 gas is 0.001 gwei.
- L1 data fee, which is proportional to:
  - The gas cost of writing the transaction's data to L1 (roughly equal to the transaction's length)
  - The cost of gas on L1.
    At writing, this cost is approximately 45 gwei. 

You can see the current prices, for both L2 and L1, [here](https://public-grafana.optimism.io/). 

[See here for additional details about how transaction fees are calculated](transaction-fees.md).

### Optimization tradeoffs

In almost all cases, the L1 data fee is the vast majority of the transaction's cost, and the L2 execution fee is, comparatively speaking, negligible.
This means that the optimization tradeoffs are very different in Optimism than they are in Ethereum.

Transaction call data is *expensive*.
The cost of writing a byte to L1 is approximately 16 gas.
As I'm writing this, this means 720 gwei, or 720,000 units of L2 gas.

In comparison, on-chain processing and storage are cheap.
The worst case for writing to storage (previously uninitialized storage) is a cost of [22100 gas per 32 byte word](https://www.evm.codes/#55), which averages out to less than 700 gas / byte.
At writing, this means it is cheaper to write a whole kilobyte to storage, rather than add one byte to the transaction call data. 

## Modify the ABI (application binary interface)

[The standard ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) was designed with L1 tradeoffs in mind. 
It uses four byte function selectors and pads values into 32 byte words. 
Neither is optimal when using Optimism.

[It is much more efficient to create a shorter ABI with just the required bytes, and decode it onchain](https://ethereum.org/en/developers/tutorials/short-abi/).
To get better compatibility, create two contracts:
- The main contract which accepts the standard ABI. This is the contract that will be called by:
  - Other contracts (the call data cost is only for the transaction issued from the outside, internal transactions don't need to be written to L1)
  - Client code outside your control.
- A proxy contract that accepts the shorter ABI, which your application will call. 

Note that only transactions are written to L1.
All of your [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) and [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions) functions can use the standard ABI at no cost.


## Use smaller values when possible

Your modified ABI is not going to pad values, so the less bytes you use the better.
For example, it is standard to use `uint256` for amounts.
This means that the highest amount of ETH we can represent is 2<sup>256</sup>-1 wei, or about 1.2*10<sup>59</sup> ETH. 
With a total amount of minted ETH around [120 million](https://ycharts.com/indicators/ethereum_supply), this is overkill. 
We can use `uint88`, which is just eleven bytes, and still represent any value below 309 million ETH.


To reduce costs even further, do we really need to be able to specify values to the last wei? 
As I'm writing this, it would take approximately 4000 gwei (or 4*10<sup>21</sup> wei) to make one US cent ([see current values here](https://nomics.com/markets/gwei-gwei/usd-united-states-dollar)). 
If we specify our amounts in 100 gwei units, and use only six bytes (`uint48`), we can still represent any value below 28 million ETH at an accuracy of a tenth of a cent.
Just remember to rescale by deploying new code when ETH reaches $100,000 and a 100 gwei is equal to a cent.


## Cache as cache can

Call data is expensive on Optimism (relatively speaking), but storage is very cheap ([see above](#optimization-tradeoffs)).
So any value that is likely to be used multiple times should be cached if possible.
If you are writing your own ABI, you can use variable length fields for cache references.

For example, when specifying an address in a call from your client to your contract, you can specify that if the value starts with 0x00 the rest of the value is the twenty bytes of an uncached address. If the value starts ix 0x1 then the next 12 bits (the last four bitys of the first value followed by one byte) are a cache key. If you need a bigger cache, 0x2 marks a 20 bit cache key (the last four bits followed by two bytes), etc.
