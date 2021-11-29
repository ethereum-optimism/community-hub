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

| Opcode  | Behavior |
| - | - |
| `L1BLOCKNUMBER` | Returns the block number of the last L1 block known by the L2 system. Typically this block number will lag by up to 15 minutes behind the actual latest L1 block number. See section on [Block Numbers and Timestamps](#block-numbers-and-timestamps) for more information. |

## Block Numbers and Timestamps

### Block production is not constant

On Ethereum, the `NUMBER` opcode (`block.number` in Solidity) corresponds to the current Ethereum block number.
Similarly, in Optimistic Ethereum, `block.number` corresponds to the current L2 block number.
However, as of the OVM 2.0 release of Optimistic Ethereum (Nov. 2021), **each transaction on L2 is placed in a separate block and blocks are NOT produced at a constant rate.**

This is important because it means that `block.number` is currently NOT a reliable source of timing information.
If you want access to the current time, you should use `block.timestamp` (the `TIMESTAMP` opcode) instead.

### Timestamp lags by up to 15 minutes

Note that `block.timestamp` is pulled automatically from the latest L1 block seen by the L2 system.
L2 currently waits for about 15 minutes (~50 confirmations) before the L1 block is accepted.
As a result, the timestamp may lag behind the current time by up to 15 minutes.

### Accessing the latest L1 block number

::: warning NOTICE
The hex value that corresponds to the `L1BLOCKNUMBER` opcode (`0x4B`) may be changed in the future (pending further discussion).
**We strongly discourage direct use of this opcode within your contracts.**
Instead, if you want to access the latest L1 block number, please use the `OVM_L1BlockNumber` contract as described below.
:::

The block number of the latest L1 block seen by the L2 system can be accessed via the `L1BLOCKNUMBER` opcode.
Solidity doesn't make it easy to use non-standard opcodes, so we've created a simple contract located at [`0x4200000000000000000000000000000000000013`](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000013) that will allow you to trigger this opcode.

You can use this contract as follows:

```solidity
import { iOVM_L1BlockNumber } from "@eth-optimism/contracts/L2/predeploys/iOVM_L1BlockNumber.sol";
import { Lib_PredeployAddresses } from "@eth-optimism/contracts/libraries/constants/Lib_PredeployAddresses.sol";

contract MyContract {
   function myFunction() public {
      // ... your code here ...

      uint256 l1BlockNumber = iOVM_L1BlockNumber(
         Lib_PredeployAddresses.L1_BLOCK_NUMBER // located at 0x4200000000000000000000000000000000000013
      ).getL1BlockNumber();

      // ... your code here ...
   }
}
```

## Using ETH in Contracts

As of the OVM 2.0 update (Nov. 2021), **the process of using ETH on L2 is identical to the process of using ETH in Ethereum.**
Please note that ETH was previously accessible as an ERC20 token, but this feature has been removed as part of OVM 2.0.

For tooling developers and infrastructure providers, please note that ETH is still represented internally as an ERC20 token at the address [`0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`](https://optimistic.etherscan.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).
As a result, user balances will always be zero inside the state trie and the user's actual balance will be stored in the aforementioned token's storage.
**It is NOT possible to call this contract directly, it will throw an error.**

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

## JSON-RPC Differences

Optimistic Ethereum uses the same [JSON-RPC API](https://eth.wiki/json-rpc/API) as Ethereum.
Some additional Optimistic Ethereum specific methods have been introduced.
See the full list of [custom JSON-RPC methods](./json-rpc.html) for more information.
