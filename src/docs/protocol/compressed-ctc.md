---
title: The Cannonical Transaction Chain (CTC) Format
lang: en-US
---

Every transaction submitted to Optimism is written to the mainnet Ethereum blockchain as call data, this is how Optimism inherits the availability and integrity guarantees of Ethereum.
This is also the cause of the majority of the cost of Optimism transactions.
As I am writing this, it is cheaper to write a kilobytes to storage on Optimism than it is to add one byte to the calldata on Ethereum.

## Initial solution

The initial solution was to write transaction sequentially with some supporting data.
You can see this solution, for example, in this transaction: 
The first solution is to write transaction sequentially with some supporting data.
You can see it, for example, in [this transaction](https://etherscan.io/tx/0xf5a2dd9d0815ad4dcee00063ff8f8f3fd44b3bd8ffc1f7f6c7f7f0b4b086c5a7/advanced).

The meaning of the data is as follows:

| Location | Field             | Field size in bytes | Value | Comments |
| --: | ------------------ | ------------------: | ----: | -------- |
|  0 | Function signature |  4 | 0xd0f89344 | [appendSequencerBatch()](https://www.4byte.directory/signatures/?bytes4_signature=0xd0f89344) |
|  4 | Starting tx index  |  5 | 4025992 | [this transaction](https://optimistic.etherscan.io/tx/4025992) |
|  9 | Elements to append |  3 | 89 |
| 12 | Batch contexts     |  3 | 15 |
| 15-30 | **Context 0** |
| 15 |Transactions sent directly to L2 | 3 | 3 |
| 18 | Deposits | 3 | 0 |
| 21 | Timestamp | 5 | 1646146436 | `block.timestamp` for transactions in this context (Tue Mar 01 2022 14:53:56 UTC)
| 26 | Block number | 5 | The L1 block number in this context, as obtained by calling [OVM_L1BlockNumber](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/predeploys/iOVM_L1BlockNumber.sol). ([14301739](https://etherscan.io/block/14301739)) | 
| 31-46 | **Context 1** |
| 31 | Transactions sent directly to L2 | 3 | 8 |
| 34 | Deposits | 3 | 0 |
| 37 | Timestamp | 5 | 1646146451 | 15 seconds after the previous batch
| 42 | Block number | 5 | [14301739](https://etherscan.io/block/14301739) 
| 47-63 | **Context 2** |
| 47 | Transactions sent directly to L2 | 3 | 3 |
| 50 | Deposits | 3 | 0 |
| 53 | Timestamp | 5 | 1646146451 | Same time as the previous batch
| 59 | Block number | 5 | [14301741](https://etherscan.io/block/14301741) 


In general, context `n` starts at byte `16*n+15`.
This means that the first byte after the last context in this transaction, which starts the transaction list, is `16*15+15=255`.
Transactions are provided as a three byte length followed by the RLP encoded transaction.

Looking at locations 255-257, we see `0x00016e`, so the first transaction is 366 bytes long. 

## Additional batch types

The initial solution did not have a batch type. 
However, to add compression a batch type is needed.
The solution is to set the timestamp of the first context to zero.
This does not create ambiguity because a timestamp of zero represents January 1st, 1970 (based on the UNIX convention), which cannot happen.
The block number then represents the transaction type.

## Type zero

After the normal header and the first context, which has a timestamp of zero and a block number of zero, the other contexts contain the normal data. 
After that the list of transaction lengths and transaction data is compressed using [zlib](https://nodejs.org/api/zlib.html).
