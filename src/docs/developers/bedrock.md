---
title: How is Bedrock Different?
lang: en-US
---

Bedrock is the next major release of the Optimism network, planned for the second half of 2022. 
Here are the major changes:

## Guide by persona

If you want to jump directly to the parts relevant to your job role, here are the parts we think will be most useful

<details>
<summary>Wallet developer</summary>

As a wallet developer you are most likely to interact with the JSON RPC, and your users want to know how much their transactions are going to cost.
Timing may also be relevant.

- [Fees](#transaction-fees)
- [RPC changes](#json-rpc)
- [Block time](#block-timing)

</details>

<details>
<summary>Dapp frontend developer</summary>

As an application developer you are probably interested in the fact bedrock has a mempool and the changes in transaction fees. 
You might also be interested in changes in the RPC interface and block timing.

- [Fees](#transaction-fees)
- [Transactions (we now have a mempool)](#transactions)
- [RPC changes](#json-rpc)
- [Block time](#block-timing)


</details>

<details>
<summary>Dapp backend (protocol) developer</summary>

As an application developer you are probably interested in the fact bedrock has a mempool and the changes in transaction fees. 
You might also be interested in changes in the RPC interface and block timing.

- [Fees](#transaction-fees)
- [Transactions (we now have a mempool)](#transactions)
- [RPC changes](#json-rpc)
- [Block time](#block-timing)

</details>

<details>
<summary>Infrastructure provider (or anybody else running a node)</summary>

To run a node you need to understand the executables required to run it. 
You might also be interested in the existence of the mempool and the changes in block timing, fess, and the JSON RPC.

- [Executables](#executables)
- [Transactions (we now have a mempool)](#transactions)
- [Block time](#block-timing)
- [Fees](#transaction-fees)
- [RPC changes](#json-rpc)

[See here for a more detailed guide](bedrock-temp/infra.md).

</details>

<details>
<summary>Bridge developer</summary>

As a bridge developer you are likely most interested in deposits into Optimism and withdrawals back into Ethereum L1.

- [Deposits](#deposits-from-ethereum-to-optimism)
- [Withdrawals](#withdrawals-from-optimism-to-ethereum)

</details>



## The EVM

- There is no longer an `L1BLOCKNUMBER` opcode. 
- Bedrock includes an upgrade to the London fork, so the `BASEFEE` opcode is now supported.
- `TIMESTAMP` will now be updated every two seconds (every new block).
- `BLOCKNUMBER` will advance every two seconds because we'll create a new block every two seconds, regardless of the amount of transactions.

## Contracts

### L1 contracts

#### L2OutputOracle

[The `L2OutputOracle` contract](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/L2OutputOracle.sol) contains the state root of the Optimism blockchain.
Once fault proofs are activated, it will be the one that receives the result of the fault proof process.

This is the contract that replaces the old State Commitment Chain.

#### OptimismPortal

[The `OptimismPortal` contract](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol) provides [the new API for communications between layers](#deposits-from-ethereum-to-optimism). 


#### Existing interface

These contracts provide the same interface as existed pre-bedrock so dapps don’t have to be modified to run on bedrock.


- [L1CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/L1CrossDomainMessenger.sol):
  The `L1CrossDomainMessenger` contract is used for sending messages between Ethereum and Optimism. Those messages may or may not have assets attached to them.
- [L1StandardBridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/L1StandardBridge.sol):
  The `L1StandardBridge` contract uses `L1CrossDomainMessenger` to transfer ETH and ERC-20 tokens between Ethereum and Optimism.




### L2 contracts (predeploys)


#### L1Block

[The `L1Block` contract](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L2/L1Block.sol) sits at address `0x4200000000000000000000000000000000000015`.
You can use [the getter functions](https://docs.soliditylang.org/en/v0.8.12/contracts.html#getter-functions) to get these parameters:

- `number`: The latest L1 block number known to L2 (the `L1BlockNumber` contract is still supported to avoid breaking existing applications)
- `timestamp`: The timestamp of the latest L1 block
- `basefee`: The base fee of the latest L1 block
- `hash`: The hash of the latest L1 block
- `sequenceNumber`: The number of the L2 block within the epoch (the epoch changes when there is a new L1 block)


Currently the L1 information is delayed by ten block confirmations (~2.5 minutes) to minimize the impact of reorgs. 
This value may be reduced in the future.

#### SequencerFeeVault

[The `SequencerFeeVault` contract](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L2/SequencerFeeVault.sol) handles funding the sequencer on L1 using the ETH base fee on L2.

The fees are calculated using [EIP 1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md), the same mechanism that Ethereum uses (but with different parameter values).


#### L2ToL1MessagePasser

[The `L2ToL1MessagePasser` contract](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L2/L2ToL1MessagePasser.sol) is used internally by `L2CrossDomainMessenger` to initiate withdrawals.


#### Existing interface

These contracts provide the same interface as existed pre-bedrock so dapps don’t have to be modified to run on bedrock.


- [L1BlockNumber](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L2/L1BlockNumber.sol): 
  The `L1BlockNumber` contract provides the number of the latest L1 block. 
  In bedrock it is simply a proxy to [`L1Block`](#l1block). 
- [L2CrossDomainMessenger](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L2/L2CrossDomainMessenger.sol):
  The `L2CrossDomainMessenger` contract is used to send messages from Optimism to Ethereum.
- [L2StandardBridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L2/L2StandardBridge.sol):
  The `L2StandardBridge` contract is used to "attach" assets (ETH and ERC-20 tokens) to messages that are then sent by `L2CrossDomainMessenger`.
- [WETH9](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L2/WETH9.sol): 
  [The WETH9 contract](https://weth.io/) is an ERC-20 token that wraps around ETH to provide extra functionality, such as approvals.


#### Historical contracts

These are contracts that are no longer relevant, but are kept as part of the state in case there is a call in any dapp that uses them.

- [DeployerWhitelist](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L2/DeployerWhitelist.sol):
  The `DeployerWhitelist` contract used to manage the whitelist before [Optimism moved out of beta](https://twitter.com/optimismFND/status/1471571415774023682).

- [OVM_ETH](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L2/OVM_ETH.sol):
  The `OVM_ETH` contract used to manage users ETH balances prior to bedrock.


## JSON RPC 

- Bedrock supports `eth_sendMessage` and `eth_getAccounts`.
- The non standard `eth_getBlockRange` is no longer supported.

## Communication between layers

In Optimism terminology "deposit" refers to any message going from the Ethereum blockchain to Optimism, whether it has any assets attached or not.
Similarly, "withdrawal" refers to any message going from Optimism to Ethereum.

[See here for the messenger specs](https://github.com/ethereum-optimism/optimism/blob/develop/specs/messengers.md) and [here for the bridge specs](https://github.com/ethereum-optimism/optimism/blob/develop/specs/bridges.md).


### Gas cost changes

The gas costs for communication between layers are going to change, they will probably get lower. 
More information will be posted here once we have more exact information after we profile a test network.
We expect that to happen before the end of June.

<!-- GOON get the figures and put them here -->

### Deposits (from Ethereum to Optimism)

To create a deposit we recommend that you use the pre-bedrock contracts [`L1StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/L1StandardBridge.sol) and [`L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/L1CrossDomainMessenger.sol).
[`OptimismPortal`](https://github.com/ethereum-optimism/optimism/blob/develop/contracts-bedrock/contracts/L1/OptimismPortal.sol) also has deposit functionality.

With the portal’s `depositTransaction` function you can do from L1 anything you can do by contacting L2 directly: send transactions, send payments, create contracts, etc.
This provides an uncensorable alternative in case the sequencer is down. 
Even though the sequencer is down, verifiers (nodes that synchronize the Optimism state from L1) are still going to receive such transactions and modify the state accordingly. 
When the sequencer is back up it has to process the transactions in the same order to have a valid state.

Deposits that come from contracts still use [address aliasing](build/differences/#address-aliasing).

<!--
Deposits are implemented using [a new transaction type](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md#the-deposited-transaction-type), 0x7E.
-->

[You can read the full deposit specifications here](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md#the-deposited-transaction-type).


### Withdrawals (from Optimism to Ethereum)

[Address aliasing](build/differences/#address-aliasing) is now applied to withdrawal transactions as well as deposit ones.

There is a separate withdrawal root which allows withdrawal merkle proofs to be 60% cheaper (in L1 gas). 
This happens transparently, you just see less cost.

The withdrawal interface is unchanged.
To initiate withdrawals we recommend you use [`L2CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L2/L2CrossDomainMessenger.sol). 
To claim/finalize the message continue to use [`L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/L1CrossDomainMessenger.sol).

<!-- 
However, each of these contracts will be deployed twice. Once in the old address, where withdrawals use the state root. The other addresses are  where withdrawals use the withdrawals root, and are therefore cheaper.  

# Add addresses here
-->

[You can read the full withdrawal specifications here](https://github.com/ethereum-optimism/optimism/blob/develop/specs/withdrawals.md)



## Blockchain

In general, the blockchain in bedrock is a lot closer to Ethereum, at least post-merge Ethereum, than the current incarnation.

### Blocks

#### Block timing

In bedrock blocks are produced every two seconds, regardless of whether there are transactions to put in them or not. 
This brings us closer to post-merge Ethereum, [where blocks are expected every twelve seconds](https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/).
Before bedrock an Optimism block was produced for every transaction, and if there were no transactions no block was produced.

The period between different Ethereum blocks is called an epoch.
Normally we'd expect to have six Optimism blocks per epoch, but it is expected that in some cases mainnet will miss a block (because the proposer is offline), and in those cases we'll have epochs with twelve Optimism blocks.


#### Data structure

The transactions in a block are divided into either two or three transaction types.

1. The first transaction is an [L1 attributes deposit transaction](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md#l1-attributes-deposited-transaction).
  This transaction sets the parameters of [the `L1Block` contract](#l1block).
  One of the attributes is the sequential number of the block within the epoch.

1. In the first block of an epoch (the first L2 block produced after an L1 block) there can be [user deposit transactions](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits).

1. Finally there are the normal L2 transactions.



### Transactions

Currently transactions are privately forwarded from nodes directly to the sequencer, at which point they are either accepted and processed immediately or rejected (for low gas price, insufficient ETH, etc.).  

In bedrock transactions are still privately forwarded from nodes directly to the sequencer, but now they get placed into a private mempool. 
The private mempool’s operation is similar to the Ethereum L1’s mempool. 
The sequencer will order transactions the way miners do, based on priority fee.


#### Transaction fees

In bedrock the transaction's L2 execution gas price is determined using the same mechanism that is used on Ethereum, [EIP 1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md).

In EIP-1559 the cost of a unit of gas is composed of two components:

* **Base fee**: 
  This fee is the same for all transactions in a block.
  It varies between blocks based on the difference between the actual size of the blocks (which depends on the demand for block space) and the target block size.
  When the block uses more gas than the target block size the base fee goes up to discourage demand.
  When the block uses less gas than the target block size the base fee goes down to encourage demand.

* **Priority fee**:
  This fee is specified in the transaction itself and varies between transactions.
  Miners (and after The Merge, proposers) are expected to select the transactions that offer them the highest priority fees first.

There are some differences between Ethereum and Optimism in this regard:

- ETH is not burned, but used for things the protocol needs.
  Burning ETH on L2 would only lock it in the bridge forever.

- The EIP 1559 parameters have different values.
  Once those values are finalized they will be posted here.

<!-- GOON: Put values here when they are finalized
-->

The L1 security fee, which is normally the majority of the transaction cost, uses roughly the same mechanism as before the upgrade.
However, instead of using the latest L1 gas price ([possibly modified to avoid changes of over 25% in a five minute period](https://help.optimism.io/hc/en-us/articles/4416677738907-What-happens-if-the-L1-gas-price-spikes-while-a-transaction-is-in-process-)), bedrock uses a moving average to smooth out peaks in L1 gas price.


::: tip Estimating L1 gas prices
The `OVM_GasPrice` interface is likely to change, so for estimating transaction prices we recommend [using the SDK](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas).
:::

## Executables

The information in this section is primarily useful to people who run an Optimism network node, either as a replica or as an independent development node.

The rollup node is the component responsible for deriving the L2 chain from L1 blocks (and their associated receipts). 

In bedrock processing is divided between two components:

- **Rollup node**: 
  The component responsible for deriving the L2 chain from L1 blocks.
  It is somewhat similar to the consensus layer client.

- **Execution engine**: 
  The component that actually executes transactions. 
  This is [a slightly modified version of geth](https://github.com/ethereum-optimism/reference-optimistic-geth/compare/master...optimism-prototype).

Note that while the execution engine is similar to the previous version's l2geth, there is no bedrock equivalent to the DTL.

### Rollup node

The rollup node provides the L1 information that the execution engine uses to derive the L2 blocks. 
The rollup node always provides the L2 state root to the execution engine, because that's the root of trust that needs to come from L1. 
It can also provide all the transactions from L1 for synchronization, but that mechanism is slower than snap sync (see next section).

[You can read more about the rollup node here](https://github.com/ethereum-optimism/optimism/blob/develop/specs/rollup-node.md).



### Execution engine

The execution engine runs a slightly modified version of geth.
In terms of EVM equivalence, it is [even closer to upstream geth](https://github.com/ethereum-optimism/reference-optimistic-geth/compare/master...optimism-prototype) than the current version.

One important feature that we inherit from upstream geth is their peer to peer synchronization, which allows for much faster synchronization (from other Optimism execution engines). 
Note that peer to peer synchronization is allowed, not required. 
For censorship resistance, an execution engine can synchronize purely from the rollup node that receives data from L1. 
There are two types of synchronization possible:


1. **Snap sync**, which only synchronizes the state up to the point that has been submitted to L1.

1. **Unsafe block sync**, which includes everything the sequencer created, even if it hasn't been written to L1 yet.


### Legacy requests

We need to provided history from the final regenesis (November 11th) until the introduction of bedrock.
At the same time, we do not want to put anything in our execution engine that doesn't need to be there. 
The closer it is to upstream geth the better.

The solution is to have two additional components:

1. **Daisy chain**, an RPC proxy that routes read requests from before bedrock to the legacy geth, and everything else to the execution engine.
1. **Legacy geth**, a stripped down version of the previous version's `l2geth` with a read only database containing the pre-bedrock history.




## Behind the scenes

This section discusses some of the changes in Optimism internals. 


### The transaction trail

There is no longer a CTC (cannonical transaction chain) contract.
Instead, L2 blocks are saved to the Ethereum blockchain using a non-contract address (`0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0001`), to minimize the L1 gas expense.

[The block and transaction format is also different](https://github.com/ethereum-optimism/optimism/blob/develop/specs/rollup-node.md#l2-chain-derivation).


### ETH balances

In bedrock ETH is treated *exactly* as it is in Ethereum.

In the previous version ETH was stored in a system level contract at 
`0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`.
This is no longer the case.


