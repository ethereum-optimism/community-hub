---
title: Complete EVM/OVM Comparison 
lang: en-US
tags:
    - contracts
    - high-level
---

# {{ $frontmatter.title }}

This page serves as a reference point for dApp developers who want to build or port their systems to the OVM.  In particular, it highlights the main differences between the L2 OVM and L1 EVM that developers should consider.

## Missing, Replaced, and Custom Opcodes
The OVM's execution sandbox requires that some EVM opcodes are banned from smart contracts.  Whenever a contract deployment is attempted on the OVM, a ["safety check"](https://github.com/ethereum-optimism/contracts-v2/blob/master/contracts/optimistic-ethereum/OVM/execution/OVM_SafetyChecker.sol#L30)) of the contract code is performed, and if any of the banned opcodes are present, deployment is blocked. 
 
 <!-- For a precise specification of what counts as a "safe" contract, see here. [todo] -->

Of these banned opcodes, there are two main categories:
1. Opcodes which are re-implemented as OVM contract functions, so that they "still work" on the OVM, and are just invoked differently.
2. Opcodes which have no L2-equivalent, and thus cannot be used in the OVM.



### Missing Opcodes

| EVM Opcode     | Solidity Usage     | Reason for Absence |
| ----------     | --------------     | ------------------ |
| `COINBASE`     | `block.coinbase`   | No equivalent in the OVM. |
| `DIFFICULTY`   | `block.difficulty` | No equivalent in the OVM. |
| `BLOCKHASH`    | `blockhash`        | No equivalent in the OVM. |
| `GASPRICE`     | `tx.gasprice`      | No equivalent in the OVM. |
| `SELFDESTRUCT` | `selfdestruct`     | Not yet implemented. |
| `BALANCE`      | `balance`          | Unused. See [Native wETH](#native-weth) section below. |
| `CALLVALUE`    | `msg.value`        | Unused. See [Native wETH](#native-weth) section below. |
| `ORIGIN`       | `tx.origin`        | Unused. See [Account Abstraction](#native-acccount-abstraction) section below. |


### Replaced Opcodes

Opcodes which require an OVM-specific implementation are written as `ovmOPCODE(...)` functions in the `OVM_ExecutionManager` contract. (see `iOVM_ExecutionManager` interface for [reference](https://github.com/ethereum-optimism/contracts-v2/blob/master/contracts/optimistic-ethereum/iOVM/execution/iOVM_ExecutionManager.sol).)

Developers using these opcodes need not be concerned with the changes, as the `@eth-optimism/solc` compiler automatically makes sure your contracts correctly invoke the OVM implementations.

| EVM Opcode     | OVM Equivalent    | Notes |
| ----------     | ----------------- | ----- |
| `ADDRESS`      | `ovmADDRESS`      |       |
| `NUMBER`       | `ovmNUMBER`       | See [`block.number`](#behavior-of-blocknumber-and-blocktimestamp) section below for additional detail. |
| `TIMESTAMP`    | `ovmTIMESTAMP`    | See [`block.timestamp`](#behavior-of-blocknumber-and-blocktimestamp) section below for additional detail. |
| `CHAINID`      | `ovmCHAINID`      |       |
| `GASLIMIT`     | `ovmGASLIMIT`     | Returns the **transaction gas limit**, not the block gas limit, as there is no notion of blocks in L2. |
| `REVERT`       | `ovmREVERT`       |       |
| `SLOAD`        | `ovmSLOAD`        |       |
| `SSTORE`       | `ovmSSTORE`       |       |
| `CALL`         | `ovmCALL`         |       |
| `STATICCALL`   | `ovmSTATICCALL`   |       |
| `DELEGATECALL` | `ovmDELEGATECALL` |       |
| `CREATE`       | `ovmCREATE`       |       |
| `CREATE2`      | `ovmCREATE2`      |       | 
| `EXTCODECOPY`  | `ovmEXTCODECOPY`  |       |
| `EXTCODESIZE`  | `ovmEXTCODESIZE`  |       |
| `EXTCODEHASH`  | `ovmEXTCODEHASH`  |       |

### Custom Opcodes
In addition to the above, the OVM introduces some new "opcodes" which are not present in the EVM but may be accessed via a call to the execution manager.

#### Account Related

| Opcode         | Function |
| ------         | -------- |
| `ovmGETNONCE`  | Returns the nonce of the current account. |
| `ovmSETNONCE`  | Sets the nonce of the current account to a given value. |
| `ovmCREATEEOA` | Deploys a smart contract wallet. See [Account Abstraction](#native-acccount-abstraction) section for additional detail. |

#### Cross-chain Related
These opcodes are abstracted away by our standard message-passing contracts, so most developers need not use these directly. However they are technically accessible to any contract.

| Opcode             | Function |
| ------             | -------- |
| `ovmL1QUEUEORIGIN` | Returns `Lib_OVMCodec.QueueOrigin.SEQUENCER_QUEUE` or `Lib_OVMCodec.QueueOrigin.L1TOL2_QUEUE` depending on the queue from which this transaction originated. |
| `ovmL1TXORIGIN`    | Returns the zero address (`0x00...00`) if transaction came from the sequencer queue or the address of the account that called `OVM_CanonicalTransactionChain.enqueue()` and added this transaction to the L2 chain. |

## Behavioral Differences
This section covers some small functional differences in the current OVM behavior, that differs from normal EVM behavior.

### Constructor parameters may be unsafe
In the EVM, as well as the OVM, constructor parameters are technically a part of the code--that is, constructor parameters are implemented by calling `CREATE` with `concat(codeWithoutConstructorArgs, abi.encode(constructorArgs))`.  In the context of the OVM, this means that there is a small chance that the constructor arguments' encoding contain an unsafe EVM opcode, causing deployment to fail.

Only a few opcodes are banned, so this is a relatively unlikely event.  However, if you have a strong requirement that your contract can be successfully deployed multiple times, with *absolutely any* parameters, it is problematic.  In that case, you will need to remove constructor arguments and replace them with an `initialize(...)` method which can only be called once on the deployed code.

### `ovmSTATICCALL` emits events
Usage of the event opcodes (`LOG0, LOG1, LOG2, LOG3`) trigger a violation of the static context in the EVM, but not in the OVM -- that is, contracts within an `ovmSTATICCALL` currently may still emit events.

### `ovmEXTCODECOPY` returns a minimum of 2 bytes
Currently, `ovmEXTCODECOPY` will return a minimum of 2 bytes even if the `length` input is 1.  This limitation will be removed before mainnet release, although the compiler already truncates it to 1 byte on the contract side, so unless you are writing some custom inline assembly, it should not be an issue even now.

### Behavior of `block.number` and `block.timestamp`
The values output by the `ovmNUMBER` and `ovmTIMESTAMP` opcodes are of note, especially when sequencer transactions. If the OVM transaction originated from a non-sequencer via `enqueue(..)`, then the result these opcodes will be the `block.number` and `block.timestamp` at the time they were enqueued.  This ensures that smart contracts which are time-sensitive accurately reflect L1 actions.

The sequencer assigns its transactions' values for these opcodes based on what it decides off chain.  The sequencer's choice is limited in the folowing ways:
1. The sequencer may not assign values in the future in relation to the L1 time.
2. The sequencer may not assign values more than `FORCE_INCLUSION_PERIOD_SECONDS` or `FORCE_INCLUSION_PERIOD_BLOCKS` in the past, respectively.
3. The sequencer may not assign values which violate monotonicity of all transactions -- that is, `ovmTIMESTAMP` and `ovmNUMBER` must strictly increase.


## Native wETH
For the purposes of the OVM, we have removed all notion of native ETH.  OVM contracts do not have a direct `BALANCE`, and the `ovm*CALL` opcodes do not accept a `value` parameter.  Instead, OVM contracts are expected to use a wrapped ETH ERC20 token on L2 instead.  The L2 address will be documented here when Optimistic Ethereum is deployed to mainnet; on testnet, there is no such token and the sequencer allows for a `gasPrice` of 0.

## Native Acccount Abstraction

### Overview
The OVM implements a basic form of [account abstraction](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/account-abstraction/) which is most similar to "lazy full abstraction."  In effect, this means that the only type of account is a smart contract (no EOAs), and all user wallets are in fact smart contract wallets.  This means that, at the most granular level, OVM transactions themselves do not have a `signature` field, and instead simply have a `to` address with a `data` payload.  It is expected that the `signature` field will be included within the `data`.

Because of this, one restriction of the OVM is that there is no `tx.origin` (`ORIGIN` EVM opcode) equivalent in the OVM.

### Backwards Compatibility
Developers need not be concerned with any of this when they start building their applications -- we have gone ahead and implemented a standard [ECDSA Contract Account](https://github.com/ethereum-optimism/contracts-v2/blob/master/contracts/optimistic-ethereum/OVM/accounts/OVM_ECDSAContractAccount.sol) which enables backwards compatibility with all existing Ethereum wallets out of the box. In particular, it contains a method `execute(...)` which behaves exactly like EOAs on L1: it recovers the signature based on standard L1 EIP155 transaction encoding, and increments its own nonce the same way as on L1.

The OVM also implements a new opcode, `ovmCREATEEOA`, which enables anybody to deploy the `OVM_ECDSAContractAccount` to the correct address (i.e. what shows up on metamask and is used on L1).  `ovmCREATEEOA` accepts two inputs, a hash and a signature, and recovers the singer of the hash.  This must be a valid L1 EOA account, so an `OVM_ECDSAContractAccount` is deployed to that address.

This deployment is automatically handled by the sequencer the first time an account sends an OVM transaction, so that users need not think about it at all.  The sequencer also handles wrapping the user transaction with a call to `execute(...)`.

### Compatibility with `eth_sign` 
For wallets which do not support custom chain IDs, the backwards-compatible transactions described above do not work.  To account for this, the `OVM_ECDSAContractAccount` also allows for an alternate signing scheme which can be activated by the `eth_sign` and `eth_signTypedData` endpoints and follows a standard Solidity ABI-encoded [format](https://github.com/ethereum-optimism/contracts-v2/blob/525477144ecc6fc019e0ada225b85f322c6b5fbc/contracts/optimistic-ethereum/libraries/codec/Lib_OVMCodec.sol#L133).  The `@eth-optimism/provider` package implements a web3 provider which will use this encoding format.

### Account Upgradeability
Technically, the `ovmCREATEEOA` opcode deploys a proxy contract which `ovmDELEGATECALL`s to a deployed implementation of `OVM_ECDSAContractAccount`.  This proxy account [can upgrade its implementation](https://github.com/ethereum-optimism/contracts-v2/blob/525477144ecc6fc019e0ada225b85f322c6b5fbc/contracts/optimistic-ethereum/OVM/accounts/OVM_ProxyEOA.sol#L56) by calling its own `upgrade(...)` method.  This means that users can upgrade their smart contract accounts by sending a transaction with a `to` field of *their own address* and a `data` field which calls `upgrade(...)`.

Note that the sequencer does not recognize any wallet contracts other than the default at this time, so users should not upgrade their accounts until future releases.

## Gas and Fee Payments
The OVM mostly, though not entirely, inherits the EVM's gas model.  This section explains the L2-related differences in gas metering and payments.

### Account Abstraction and Gas
The default `OVM_ECDSAContractAccount` pays `gasPrice * gasLimit` of L2 `WETH` to the `ovmCALLER` (`msg.sender`) of the transaction, where the `msg.sender` is whoever relayed the rollup transaction on L1.  Normally, this will be the sequencer.

Because users can upgrade their contract wallets, in the future the gas payment model can be changed pretty arbitrarily, but for now this is how we do it.

#### Paying For Gas on L1
Transactions which do not originate from the sequencer pay for their gas upfront on L1.  The `enqueue` function where transactions are applied:
1. takes in a `_gasLimit` for the L1->L2 transaction, which is the gas limit given to the OVM execution.
2. burns `1/$$L2_GAS_DISCOUNT_DIVISOR$$`th of the `_gasLimit`, in L1 gas, at the time of submission, as an anti-DoS measure.

### Rate Limiting
The OVM does not have blocks, it just maintains an ordered list of transactions.  Because of this, there is no notion of a block gas limit; instead, the overall gas consumption is "rate limited".  Instead, the OVM state itself includes a special storage slot which is used to track the cumulative gas that has been consumed for all previous transactions ".  If this number grows too much in a single epoch, the OVM treats all transactions as reverting for the remainder of that epoch.  Sequencer transactions are both separately rate limited with this mechanism.

#### Sandbox-Related Overhead
Calling the `ExecutionManager` takes up a bit of extra EVM gas, and is needed on L1 to preserve the fraud proof's execution sandbox.  However, on `geth-l2`, the sandbox functionality is implemented similarly to a precompile and is much faster.  To account for this, the EM tracks a `gasRefund` which is subtracted from the transaction's gas spent.

### Nuisance Gas
There is a separate dimension of gas, called "nuisance gas", which is used to bound the net gas cost of fraud proofs.  In particular, witness data for the fraud proof's setup phase is not reflected in the L2 EVM gas cost.  Storage and contract creation `ovmOPCODES` have a separate cost in nuisance gas. If too much nuisance gas is spent in a call, the call's execution fails, like with EVM gas.

## State Trie

The OVM state trie is similar to the EVM state trie, with a few small differences.

- All account `balance` fields are 0 as there is no native ETH.
- `0x06a506A506a506A506a506a506A506A506A506A5` is the account under which gas-related metadata (cumulative gas spent, & gas spent since last epoch) is stored.
- Setting the value of a storage slot to zero (`0x00..00`) does **not** delete the key/value pair from the trie.
