---
title: Porting Existing Apps to OVM 2.0
lang: en-US
---

# {{ $frontmatter.title }}

::: tip OVM 2.0 Release Dates
OVM 2.0 is already released on the Kovan test network.
We expect to deploy it to the production Optimistic Ethereum network on November 11th.
:::

## Differences from L1 Ethereum

### Opcode differences

::: tip
[See here for the list of opcodes in the OVM](https://github.com/ethereum-optimism/optimism/blob/experimental/l2geth/core/vm/opcodes.go).
:::

The L1 verification challenge mechanism needs to be able to simulate every possible 
opcode that an L2 contract may have. The requires a few minor differences in Opcode 
support between standard EVM and the Optimistic Virtual Machine (OVM)

| EVM Opcode  | Solidity equivalent | OVM Behavior |
| - | - | - |
| COINBASE	 | `block.coinbase`   | Value is set by the sequencer. For the near-term future, it will return the `OVM_SequencerFeeVault` address (currently `0x420...011`) |
| DIFFICULTY | `block.difficulty` | Returns 0 |
| BLOCKHASH	 | `blockhash`        |	The L2 block hash. Note that this value can be manipulated by the sequencer and is **not** a safe source of randomness. |
| GASPRICE   | `tx.gasprice`      | L2 gas price |
| SELFDESTRUCT |                  | No operation |
| BASEFEE    | `block.basefee`    | Not supported for now (Optimistic Ethereum is Berlin, not London, at present) |
| NUMBER     | `block.number`     | L2 block number |
| TIMESTAMP  | `block.timestamp`  | Timestamp of latest verified L1 block |


### L1 -> L2 messages

OVM includes a couple of new opcodes to provide information about L1 -> L2 messages.

| Opcode  | Solidity equivalent | Behavior |
| - | - | - |
| L1MESSAGESENDER | `assembly { solidityVariableName := verbatim_0i_1o("0x4A")}` | The address of the message sender on L1 |
| L1BLOCKNUMBER | `assembly { solidityVariableName := verbatim_0i_1o("0x4B")}` | The L1 block that contains the message |

Additionally, the behavior of `ORIGIN` (`tx.origin` in Solidity) is a bit different.
It depends on the source of the transaction:

* If the source of the transaction is on Optimistic Ethereum, it returns the real origin.
* If the source of the transaction is on L1, the value is 
  `<l1 origin> + 0x1111000000000000000000000000000000001111`. This allows programmers
  to distinguish between a contract on L1 and a contract on the same address on L2
  (for security reasons, they could be different contracts).


### Tests need to run on geth

Both Hardhat and Truffle allow you to run contract tests against their own implementations of the EVM.
However, to test contracts that run on Optimistic Ethereum you need to run them on a local copy of Optimistic Ethereum (which is built on top of [geth](https://geth.ethereum.org/)).

There are two issues involved in running your tests against a geth instance, 
rather than an EVM running inside your development environment:

1. Tests will take longer. For development purposes, Geth is quite a bit slower 
   than the [Hardhat's](https://hardhat.org) EVM or Truffle's [ganache](https://github.com/trufflesuite/ganache-cli). You will likely have to make more liberal use of
   [asynchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts) functions within your tests.
2. Both [Truffle](https://github.com/trufflesuite/ganache-cli#custom-methods) 
   and [Hardhat](https://hardhat.org/hardhat-network/#special-testing-debugging-methods) 
   support custom debugging methods such as `evm_snapshot` and `evm_revert`. 
   You cannot use these methods in tests for Optimistic Ethereum contracts 
   because they are not available in geth. Nor can you use 
   [Hardhat's `console.log`](https://hardhat.org/tutorial/debugging-with-hardhat-network.html).

## Connect user's wallet to Optimistic Ethereum

Your user interface can ask the user's wallet to connect to a new chain using
the [`wallet_addEthereumChain`](https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods) command:

```javascript
window.ethereum.sendAsync({
   id: 1,
   jsonrpc: "2.0",
   method: "wallet_addEthereumChain",
   params: [
      {
         chainId: "0xa", // 10
         chainName: "Optimistic Ethereum",
         rpcUrls: ["https://mainnet.optimism.io"],
         blockExplorerUrls: ["https://optimistic.etherscan.io/"]
      }
   ]
})
```

## Workflow

Roughly speaking, these are the steps you need to take to develop for Optimistic
Ethereum:

1. Develop the decentralized application normally.
1. [Create an Optimistic Ethereum development node](dev-node.md)
   to be able to test locally.
1. Run your tests on the Optimistic Ethereum development node you created.
1. Deploy your dapp to the [Optimistic 
   Kovan](../../infra/networks.md#optimistic-kovan) network and test it in that
   environment.
1. [Ask to be added to the Optimistic Ethereum whitelist](https://docs.google.com/forms/d/e/1FAIpQLSfBGsJN3nZQRLdMjqCS_svfQoPkn35o_cc4HUVnLlXN2BHmPw/viewform)    
1. Once added, deploy your contracts to the 
   [Optimistic Ethereum](../../infra/networks.md#optimistic-ethereum) network. 
   - Ideally, you should also upload and 
   verify your contracts' source code on [Optimistic Etherscan](https://optimistic.etherscan.io/verifyContract).
