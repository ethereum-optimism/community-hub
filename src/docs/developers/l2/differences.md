---
title: Ethereum Differences
lang: en-US
---

# {{ $frontmatter.title }}

It's important to note that there are various minor discrepancies between the behavior of Optimistic Ethereum and Ethereum.
You should be aware of these descrepancies when building apps on top of Optimistic Ethereum.

## Opcode Differences

### Modified Opcodes

| Opcode  | Solidity equivalent | Behavior |
| - | - | - |
| `COINBASE`	| `block.coinbase`   | Value is set by the sequencer. Currently returns the `OVM_SequencerFeeVault` address (`0x420...011`). |
| `DIFFICULTY` | `block.difficulty` | Always returns zero. |
| `BASEFEE`    | `block.basefee`    | Currently unsupported. |
| `ORIGIN`     | `tx.origin`        | If the transaction is an L1 ⇒ L2 transaction, then `tx.origin` is set to the [aliased address](#address-aliasing) of the address that triggered the L1 ⇒ L2 transaction. Otherwise, this opcode behaves normally. |

### Added Opcodes

| Opcode  | Hex | Behavior |
| - | - | - |
| `L1BLOCKNUMBER` | 0x4B | Returns the block number of the last L1 block known by the L2 system. Typically this block number will lag by up to 15 minutes behind the actual latest L1 block number. |

## Address Aliasing

Because of the behavior of the `CREATE` opcode, it's possible for a user to create a contract on L1 and L2 that share the same address but have different bytecode.
We need to be able to distinguish between these two contracts.
As a result, the behavior of the `ORIGIN` and `CALLER` opcodes (`tx.origin` and `msg.sender`) differs slightly between L1 and L2.

The value of `tx.origin` is determined as follows:

- If the transaction is a standard L2 transaction (sent via the Sequencer), then `tx.origin` is the real transaction origin and there is no difference in behavior from Ethereum.
- If the transaction is an L1 ⇒ L2 transaction (sent via the `CanonicalTransactionChain.enqueue` function), then:
   - If the `enqueue` function was triggered by an Externally Owned Account, `tx.origin` is set to the address of the Externally Owned Account. There is also no difference in the behavior of `tx.origin` in this case.
   - **If the `enqueue` function was triggered by a Contract Account, `tx.origin` is set to `contract_account_address + 0x1111000000000000000000000000000000001111`.**

The value of `msg.sender` at the top-level (the very first contract being called) is always equal to `tx.origin`.
Therefore, if the value of `tx.origin` is impacted by the rules defined above, the top-level value of `msg.sender` will also be impacted.
