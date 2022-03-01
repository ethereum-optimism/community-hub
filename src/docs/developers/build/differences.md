---
title: Differences between Ethereum and Optimism
lang: en-US
---

It's important to note that there are various minor discrepancies between the behavior of Optimism and Ethereum.
You should be aware of these descrepancies when building apps on top of Optimism.

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
Similarly, in Optimism, `block.number` corresponds to the current L2 block number.
However, as of the OVM 2.0 release of Optimism (Nov. 2021), **each transaction on L2 is placed in a separate block and blocks are NOT produced at a constant rate.**

This is important because it means that `block.number` is currently NOT a reliable source of timing information.
If you want access to the current time, you should use `block.timestamp` (the `TIMESTAMP` opcode) instead.

### Timestamps

The `TIMESTAMP` opcode uses the timestamp of the transaction itself where `time.Now` is used.

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

Because of the behavior of the `CREATE` opcode, it is possible for a user to create a contract on L1 and on L2 that share the same address but have different bytecode.
This can break trust assumptions, because one contract may be trusted and another be untrusted (see below).
To prevent this problem the behavior of the `ORIGIN` and `CALLER` opcodes (`tx.origin` and `msg.sender`) differs slightly between L1 and L2.

The value of `tx.origin` is determined as follows:


| Call source                        | `tx.origin`                                |
| ---------------------------------- | ------------------------------------------ | 
| L2 user (Externally Owned Account) | The user's address (same as in Ethereum)   |
| L1 user (Externally Owned Account) | The user's address (same as in Ethereum)   |
| L1 contract (using `CanonicalTransactionChain.enqueue`) | `L1_contract_address + 0x1111000000000000000000000000000000001111` |


The value of `msg.sender` at the top-level (the very first contract being called) is always equal to `tx.origin`.
Therefore, if the value of `tx.origin` is affected by the rules defined above, the top-level value of `msg.sender` will also be impacted.

Note that in general, [`tx.origin` should *not* be used for authorization](https://docs.soliditylang.org/en/latest/security-considerations.html#tx-origin). 
However, that is a separate issue from address aliasing because address aliasing also affects `msg.sender`.

### Why is address aliasing an issue?

The problem with two identical source addresses (the L1 contract and the L2 contract) is that we extend trust based on the address.
It is possible that we will want to trust one of the contracts, but not the other.

1. Helena Hacker forks [Uniswap](https://uniswap.org/) to create her own exchange (on L2), called Hackswap.

   **Note:** There are actually multiple contracts in Uniswap, so this explanation is a bit simplified.
   [See here if you want additional details](https://ethereum.org/en/developers/tutorials/uniswap-v2-annotated-code/).

1. Helena Hacker provides Hackswap with liquidity that appears to provide profitable arbitrage opportunities.
   For example, she can make it so that you can spend 1 [DAI](https://www.coindesk.com/price/dai/)to buy 1.1 [USDT](https://www.coindesk.com/price/tether/).
   Both of those coins are supposed to be worth exactly $1. 

1. Nimrod Naive knows that if something looks too good to be true it probably is.
   However, he checks the Hackswap contract's bytecode and verifies it is 100% identical to Uniswap.
   He decides this means the contract can be trusted to behave exactly as Uniswap does.

1. Nimrod approves an allowance of 1000 DAI for the Hackswap contract.
   Nimrod expects to call the swap function on Hackswap and receive back nearly 1100 USDT.

1. Before Nimrod's swap transaction is sent to the blockchain, Helena Hacker sends a transaction from an L1 contract with the same address as Hackswap.
   This transaction transfers 1000 DAI from Nimrod's address to Helena Hacker's address.
   If this transaction were to come from the same address as Hackswap on L2, it would be able to transfer the 1000 DAI because of the allowance Nimrod *had* to give Hackswap in the previous step to swap tokens.
   
   Nimrod, despite his naivete, is protected because Optimism modified the transaction's `tx.origin` (which is also the initial `msg.sender`).
   That transaction comes from a *different* address, one that does not have the allowance.

**Note:** It is simple to create two different contracts on the same address in different chains. 
But it is nearly impossible to create two that are different by a specified amount, so Helena Hacker can't do that.



## JSON-RPC differences

Optimism uses the same [JSON-RPC API](https://eth.wiki/json-rpc/API) as Ethereum.
Some additional Optimism specific methods have been introduced.
See the full list of [custom JSON-RPC methods](./json-rpc.md) for more information.
