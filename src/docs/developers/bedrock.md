---
title: How is Bedrock Different?
lang: en-US
---

Bedrock is the next major release of the Optimism network, planned for the second half of 2022. 
Here are the major changes:



## The EVM

The execution environment is even closer to Ethereum.

- ETH balances are no longer stored in an ERC-20 contract (`0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` is dead).
- There is no longer an `L1BLOCKNUMBER` opcode. 
- Bedrock includes an upgrade to the London fork, so the `BASEFEE` opcode is now supported.

## Contracts

Note that the links in this section refer to the current state of the repository.
At some point the contracts at `.../contracts-bedrock` will move to `.../packages/contracts`.

Also, contracts that are part of the system to communicate between layers [are explained here](##communication-between-layers).

### L1 contracts


#### L2OutputOracle

[This contract](https://github.com/ethereum-optimism/optimism/blob/develop/contracts-bedrock/contracts/L1/L2OutputOracle.sol) contains the state root of the Optimism blockchain.
Once fault proofs are activated, it will be the one that receives the result of the fault proof process.


### L2 contracts (predeploys)


#### L1BlockAttributes

[This new contract](https://github.com/ethereum-optimism/optimism/blob/develop/contracts-bedrock/contracts/L2/L1Block.sol) sits at address `0x4200000000000000000000000000000000000015`.
You can use [the getter functions](https://docs.soliditylang.org/en/v0.8.12/contracts.html#getter-functions) to get these parameters:

- `number`: The latest L1 block number known to L2 (the `L1BlockNumber` contract is still supported to avoid breaking existing applications)
- `timestamp`: The timestamp of the latest L1 block
- `basefee`: The basefee in that block
- `hash`: The hash of the that block
- `sequenceNumber`: The number of the L2 block within the epoch (the epoch changes when there is a new L1 block)



#### SequencerFeeVault

This new predeploy handles funding the sequencer on L1 using the ETH "burned by EIP 1559" on L2.



## JSON RPC 

Bedrock supports `eth_sendMessage` and `eth_getAccounts`.


## Communication between layers

In Optimism terminology "deposit" refers to any message going from the Ethereum blockchain to Optimism, whether it has any assets attached or not.
Similarly, "withdrawal" refers to any message going from Optimism to Ethereum.

[See here for the messenger specs](https://github.com/ethereum-optimism/optimism/blob/develop/specs/messengers.md) and [here for the bridge specs](https://github.com/ethereum-optimism/optimism/blob/develop/specs/bridges.md).



### Deposits (from Ethereum to Optimism)

Deposits are implemented using [a new transaction type](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md#the-deposited-transaction-type), 0x7E.

To create a deposit you can either the old API or [`OptimismPortal`](https://github.com/ethereum-optimism/optimism/blob/develop/contracts-bedrock/contracts/L1/OptimismPortal.sol).

[You can read the full deposit specifications here](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md#the-deposited-transaction-type).


### Withdrawals (from Optimism to Ethereum)

- Address aliasing is now applied to withdrawal transactions as well as deposit ones.
- There is a separate withdrawal root which allows withdrawal merkle proofs to be 60% cheaper (in L1 gas).

TO initiate withdrawals you still use the same API, [`L2CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/contracts-bedrock/contracts/L2/L2CrossDomainMessenger.sol), but internally it uses [`L2ToL1MessagePasser`](https://github.com/ethereum-optimism/optimism/blob/develop/contracts-bedrock/contracts/L2/L2ToL1MessagePasser.sol).

To claim/finalize the message you can still use [`L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/contracts-bedrock/contracts/L1/L1CrossDomainMessenger.sol).
Alternatively, you can use [`OptimismPortal`](https://github.com/ethereum-optimism/optimism/blob/develop/contracts-bedrock/contracts/L1/OptimismPortal.sol).


[You can read the full withdrawal specifications here](https://github.com/ethereum-optimism/optimism/blob/develop/specs/withdrawals.md)







## Blockchain

In general, the blockchain in bedrock is a lot closer to Ethereum, at least post-merge Ethereum, than the current incarnation.


### Blocks

In bedrock blocks are produced every two seconds, regardless of whether there are transactions to put in them or not. 
This brings us closer to post-merge Ethereum, where [blocks are expected every twelve seconds](https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/).

- The first transaction in a block is an [L1 attributes deposit transaction](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md#l1-attributes-deposited-transaction).
- In the first block of an epoch (the first L2 block produced after an L1 block) there can be [user deposit transactions](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md#user-deposited-transactions).
- Finally there are the normal L2 transactions.

### Transactions

Currently transactions are either accepted immediately or rejected immediately.
In bedrock transactions are placed in a mempool, and the transaction's L2 execution gas price is determined using the same mechanism that is used on Ethereum, [EIP 1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md).

There are two major differences between Ethereum and Optimism in this regard:

- ETH is not burned, but used for things the protocol needs.
  Burning ETH on L2 will only lock it in the bridge forever.
- For now, the mempool with pending transactions is going to be private. 

Note that this change only applies to the L2 execution fee. 

The L1 security fee, which is normally the majority of the transaction cost, uses roughly the same mechanism as before the upgrade.
However, instead of using the latest L1 gas price ([possibly modified to avoid changes of over 25% in a five minute period](https://help.optimism.io/hc/en-us/articles/4416677738907-What-happens-if-the-L1-gas-price-spikes-while-a-transaction-is-in-process-)), bedrock uses a moving average to smooth out peaks in L1 gas price.





## Executables

The information in this section is primarily useful to people who run an Optimism network node, either as a replica or as an independent development node.

In bedrock processing is divided between an rollup node, which replaces some DTL functionality, and an execution engine, which has less of a difference from upstream geth than the current l2geth has.

### Rollup node

The rollup node provides L1 information to the execution engine.
It has these important differences from the existing DTL:

- The DTL synchronizes from both L1 and L2.
  In bedrock the execution engine uses the standard Ethereum mechanism to synchronize with L2, and the rollup node mostly provides information from L1.
  The rollup node can provide unsubmitted L2 blocks to other rollup nodes as a way to reduce latency.
- The DTL is stateful, it keeps a copy of all the L2 transactions.
  The rollup node is stateless, it gets everything it needs from L1 and the execution engine.


### Execution engine

The execution engine runs a slightly modified version of geth.
In terms of EVM equivalence, it is [even closer to upstream geth](https://github.com/ethereum-optimism/reference-optimistic-geth/compare/master...optimism-prototype) than the current version.

This equivalence lets us synchronize a lot faster.
The execution engine *can* synchronize from the rollup node (such synchronization is necessary for censorship resistance), but it can also synchronize from other Optimism execution engines, which is a lot faster.
To trust the synchronization it has to match with the state root that is always provided by the rollup node.


## Behind the scenes

This section discusses some of the changes in Optimism internals. 


### The transaction trail

There is longer a CTC (cannonical transaction chain) contract.
Instead, L2 blocks are saved to the Ethereum blockchain using a non-contract address (``), to minimize the L1 gas expense.

[The block and transaction format is also different](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md#user-deposited-transactions).


### ETH balances

In bedrock ETH is treated *exactly* as it is in Ethereum.
This means that ETH balances are part of the state trie.
The`0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` contract is dead.


