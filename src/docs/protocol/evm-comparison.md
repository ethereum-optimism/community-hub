---
title: Complete EVM/OVM Comparison
lang: en-US
tags:
    - contracts
    - high-level
---

# {{ $frontmatter.title }}

For the most part, the EVM and the OVM are pretty much identical.
However, the OVM *does* slightly diverge from the EVM in certain ways.
This page acts as a living record of each of these discrepancies and their raison d'être.

## Missing Opcodes

Some EVM opcodes don't exist in the OVM because they make no sense (like `DIFFICULTY`).
Others don't exist because they're more trouble than they're worth (like `SELFDESTRUCT`).
Here's a record of every missing opcode.

| EVM Opcode     | Solidity Usage     | Reason for Absence |
| ----------     | --------------     | ------------------ |
| `COINBASE`     | `block.coinbase`   | No equivalent in the OVM. |
| `DIFFICULTY`   | `block.difficulty` | No equivalent in the OVM. |
| `BLOCKHASH`    | `blockhash`        | No equivalent in the OVM. |
| `GASPRICE`     | `tx.gasprice`      | No equivalent in the OVM. |
| `SELFDESTRUCT` | `selfdestruct`     | It's dumb. |
| `ORIGIN`       | `tx.origin`        | Coming soon™. See [Account Abstraction](#account-abstraction). |

## Replaced Opcodes

Certain opcodes are banned and cannot be used directly.
Instead, they must be translated into calls to the [`OVM_ExecutionManager`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/execution/OVM_ExecutionManager.sol) contract.
**Our fork of the Solidity compiler handles this translation automatically** so you don't need to worry about this in practice.

The following opcodes must be translated into calls to the execution manager:

* `ADDRESS`
* `NUMBER`
* `TIMESTAMP`
* `CHAINID`
* `GASLIMIT`
* `REVERT`
* `SLOAD`
* `SSTORE`
* `CALL`
* `STATICCALL`
* `DELEGATECALL`
* `CREATE`
* `CREATE2`
* `EXTCODECOPY`
* `EXTCODESIZE`
* `EXTCODEHASH`
* `BALANCE`
* `CALLVALUE`

### Behavioral differences of replaced opcodes

#### Differences for `STATICCALL`

Event opcodes (`LOG0`, `LOG1`, `LOG2`, and `LOG3`) normally cause a revert when executed during a `STATICCALL` in the EVM.
However, these opcodes *can* be triggered within a `STATICCALL` within the OVM without causing a revert.

#### Differences for `TIMESTAMP` and `NUMBER`

The behavior of the `TIMESTAMP` (`block.timestamp`) and `NUMBER` (`block.number`) opcodes depends on the manner in which a transaction is added to the [`OVM_CanonicalTransactionChain`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol).

For transactions that are directly added to the chain via the [`enqueue`](https://github.com/ethereum-optimism/optimism/blob/5a7984973622d1d6e610ac98cfc206ab9a3bfe1a/packages/contracts/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol#L257) function, `TIMESTAMP` and `NUMBER` will return the timestamp and block number of the block in which `enqueue` was called.

For transactions added to the chain by the Sequencer, the `TIMESTAMP` and `NUMBER` can be any arbitrary number that satisfies the following conditions:

1. `TIMESTAMP` and `NUMBER` on L2 may not be greater than the timestamp and block number at the time the transaction is bundled and submitted to L1.
2. `TIMESTAMP` and `NUMBER` cannot be more than [`forceInclusionPeriodSeconds`](https://github.com/ethereum-optimism/optimism/blob/5a7984973622d1d6e610ac98cfc206ab9a3bfe1a/packages/contracts/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol#L57) or [`forceInclusionPeriodBlocks`](https://github.com/ethereum-optimism/optimism/blob/5a7984973622d1d6e610ac98cfc206ab9a3bfe1a/packages/contracts/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol#L58) in the past, respectively.
3. `TIMESTAMP` and `NUMBER` must be monotonic: the timestamp of some `transaction N` **must** be greater than or equal to the timestamp of `transaction N-1`.

## Custom Opcodes

The OVM introduces some new "opcodes" which are not present in the EVM but may be accessed via a call to the execution manager.

### `ovmGETNONCE`

```solidity
function ovmGETNONCE() public returns (address);
```

Returns the nonce of the calling contract.

### `ovmINCREMENTNONCE`

```solidity
function ovmINCREMENTNONCE() public;
```

Increments the nonce of the calling contract by 1.
You can call this function as many times as you'd like during a transaction.
As a result, you can increment your nonce as many times as you have gas to do so.
Useful for implementing smart contracts that represent user accounts.
See the [default contract account](https://github.com/ethereum-optimism/optimism/blob/5a7984973622d1d6e610ac98cfc206ab9a3bfe1a/packages/contracts/contracts/optimistic-ethereum/OVM/accounts/OVM_ECDSAContractAccount.sol#L124) for an example of this.

### `ovmCREATEEOA`

```solidity
function ovmCREATEEOA(bytes32 _messageHash, uint8 _v, bytes32 _r, bytes32 _s) public;
```

Deploys the [default contract account](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/accounts/OVM_ECDSAContractAccount.sol) on behalf of a user.
Account address is determined by recovering an ECDSA signature.
If the account already exists, the account will not be overwritten.
See [Account Abstraction](#native-acccount-abstraction) section for additional detail.

### `ovmL1QUEUEORIGIN`

```solidity
function ovmL1QUEUEORIGIN() public returns (uint8);
```

Returns `0` if this transaction was added to the chain by the Sequencer and `1` if the transaction was added to the chain directly by a call to [`OVM_CanonicalTransactionChain.enqueue`](https://github.com/ethereum-optimism/optimism/blob/5a7984973622d1d6e610ac98cfc206ab9a3bfe1a/packages/contracts/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol#L257).

### `ovmL1TXORIGIN`

```solidity
function ovmL1TXORIGIN() public returns (address);
```

If the result of `ovmL1QUEUEORIGIN` is `0` (the transaction came from the Sequencer), then this function returns the zero address (`0x00...00`).
If the result of `ovmL1QUEUEORIGIN` is `1`, then this function returns the address that called [`OVM_CanonicalTransactionChain.enqueue`](https://github.com/ethereum-optimism/optimism/blob/5a7984973622d1d6e610ac98cfc206ab9a3bfe1a/packages/contracts/contracts/optimistic-ethereum/OVM/chain/OVM_CanonicalTransactionChain.sol#L257) and therefore triggered this transaction.

## Native ETH

Because we thought it was cool and because it's quite useful, we turned ETH into an ERC20.
This means you don't need to use something like [wETH](https://weth.io) -- ETH *is* wETH by default.
But it's also ETH.
WooOooooOOOoo spooky.

### Using ETH normally

To use ETH normally, you can just use Solidity built-ins like `msg.value` and `address.transfer(value)`.
It's the exact same thing you'd do on Ethereum.

For example, you can get your balance via:

```solidity
uint256 balance = address(this).balance;
```

### Using ETH as an ERC20 token

To use ETH as an ERC20 token, you can interact with the [`OVM_ETH`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/predeploys/OVM_ETH.sol) contract deployed to Layer 2 at the address `0x4200000000000000000000000000000000000006`.

For example, you can get your balance via:

```solidity
uint256 balance = ERC20(0x4200000000000000000000000000000000000006).balanceOf(address(this));
```

## Account Abstraction

The OVM implements a basic form of [account abstraction](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/account-abstraction/).
In a nutshell, this means that all accounts are smart contracts (there are no "externally owned accounts" like in Ethereum).
**This has no impact on user experience**, it's just an extension to Ethereum that gives developers a new dimension to experiment with.
However, this scheme *does* have a few minor effects on developer experience that you may want to be aware of.

### Compatibility with existing wallets

Our account abstraction scheme is **100% compatible with existing wallets**.
For the most part, developers don't need to understand how the account abstraction scheme works under the hood.
We've implemented a standard [contract account](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/predeploys/OVM_ECDSAContractAccount.sol) which remains backwards compatible with all existing Ethereum wallets out of the box.
Contract accounts are automatically deployed on behalf of a user when that user sends their first transaction.

### No transaction origin

The only major restriction that our account abstraction scheme introduces is that **there is no equivalent to `tx.origin`** (the `ORIGIN` EVM opcode) in the OVM.
Some applications use `tx.origin` to try to block certain transactions from being executed by smart contracts via:

```solidity
require(msg.sender == tx.origin);
```

**This will not work on Optimistic Ethereum**.
You cannot tell the difference between contracts and externally owned accounts (because externally accounts do not exist).

### Upgrading accounts

The default [contract account](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/accounts/OVM_ECDSAContractAccount.sol) sits behind a [proxy](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/accounts/OVM_ProxyEOA.sol) that can be upgraded.
Upgrades can be triggered by having the contract account call the `upgrade(...)` method attached to the proxy.
Only the account itself can trigger this call, so it's not possible for someone else to upgrade your account.

::: tip Upgrades are disabled
Contract account upgrades are currently disabled until future notice.
We're staying on the safe side and making sure that everything is working 100% with the default account before we start allowing users to play with upgrades.
:::

<!--
TODO: clean this up

## Gas and Fee Payments

The OVM mostly, though not entirely, inherits the EVM's gas model.  This section explains the L2-related differences in gas metering and payments.

### Account abstraction and gas

The default `OVM_ECDSAContractAccount` pays `gasPrice * gasLimit` of L2 `wETH` to the `ovmCALLER` (`msg.sender`) of the transaction, where the `msg.sender` is whoever relayed the rollup transaction on L1.  Normally, this will be the sequencer.

Because users can upgrade their contract wallets, in the future the gas payment model can be changed pretty arbitrarily, but for now this is how we do it.

### Rate limiting

The OVM does not have blocks, it just maintains an ordered list of transactions.  Because of this, there is no notion of a block gas limit; instead, the overall gas consumption is "rate limited".  Instead, the OVM state itself includes a special storage slot which is used to track the cumulative gas that has been consumed for all previous transactions ".  If this number grows too much in a single epoch, the OVM treats all transactions as reverting for the remainder of that epoch.  Sequencer transactions are both separately rate limited with this mechanism.

### Sandbox-related overhead

Calling the `ExecutionManager` takes up a bit of extra EVM gas, and is needed on L1 to preserve the transaction result challenge execution sandbox.  However, on `geth-l2`, the sandbox functionality is implemented similarly to a precompile and is much faster.  To account for this, the EM tracks a `gasRefund` which is subtracted from the transaction's gas spent.

### Nuisance gas

There is a separate dimension of gas, called "nuisance gas", which is used to bound the net gas cost of a transaction result challenge.  In particular, witness data for the challenge setup phase is not reflected in the L2 EVM gas cost.  Storage and contract creation `ovmOPCODES` have a separate cost in nuisance gas. If too much nuisance gas is spent in a call, the call's execution fails, like with EVM gas.
-->

## State Structure

### Storage slots are never deleted

In Ethereum, setting the value of a storage slot to zero will delete the key associated with that storage slot from the trie.
Because of the technical difficulty of implementing deletions within our Solidity [Merkle Trie library](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/libraries/trie/Lib_MerkleTrie.sol), we currently **do not** delete keys when values are set to zero.
This discrepancy does not have any significant negative impact on performance.
We may make an update to our Merkle Trie library that resolves this discrepancy at some point in the future.

### Gas metadata account

A special account `0x06a506A506a506A506a506a506A506A506A506A5` is used to store gas-related metadata (cumulative gas spent, gas spent since the last epoch, etc.).
You'll see this account pop up in transaction traces and during transaction result challenges.
