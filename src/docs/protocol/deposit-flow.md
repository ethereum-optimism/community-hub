---
title: Deposit Flow
lang: en-US
---

## Introduction

In Optimism terminology *deposit* refers to any transaction that goes from L1 to L2.
A deposit transaction may or may not have assets (ETH, tokens, etc.) attached to it.

The process is somewhat similar to [the way most networking stacks work](https://en.wikipedia.org/wiki/Encapsulation_(networking)).
Information is encapsulated in lower layer packets on the sending side, and then retrieved in those layers on the receiving side before being available 

![Overall process](../../assets/docs/protocol/deposit-flow/overall-process.svg)


## L1 Processing

1. An L1 entity, either a smart contract or an externally owned account (EOA), sends a deposit transaction to [`L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/L1CrossDomainMessenger.sol), using [`sendMessage`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/universal/CrossDomainMessenger.sol#L259). 
  This function accepts three parameters:

   - `_target`, target address on L2.
   - `_message`, the L2 transaction's calldata, [formatted as per the ABI](https://docs.soliditylang.org/en/v0.8.19/abi-spec.html).
   - `_minGasLimit`, the gas limit required for the transaction on L2. 
     Note that the actual amount will be higher, because the portal contract on L2 needs to do some processing before submitting the call to `_target`.

   You can see code that implements this call [in the tutorial](https://github.com/ethereum-optimism/optimism-tutorial/blob/main/cross-dom-comm/hardhat/contracts/FromL1_ControlL2Greeter.sol#L16).

1. The L1 cross domain messenger calls [its own `_send` function](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/L1CrossDomainMessenger.sol#L45-L52).
   It uses these parameters:

   - `_to`, the destination address, is the messenger on the other side. 
     In the case of deposits, this is always [`0x4200000000000000000000000000000000000007`](https://goerli-optimism.etherscan.io/address/0x4200000000000000000000000000000000000007).
   - `_gasLimit`, the gas limit. 
     This value is calculated using [the `baseGas` function](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/universal/CrossDomainMessenger.sol).
   - `_value`, the ETH that is sent with the message.
     This amount is taken from the transaction value.
   - `_data`, the calldata for the call on L2 that is needed to relay the message.
     This is an [ABI encoded](https://docs.soliditylang.org/en/v0.8.19/abi-spec.html) call to [`relayMessage`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/universal/CrossDomainMessenger.sol#L303).

1. [`_sendMessage`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/L1CrossDomainMessenger.sol#L45-L52) calls the portal's [`depositTransaction` function](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L434).

1. [The `depositTransaction` function](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L434) runs a few sanity checks, and then emits a [`TransactionDeposited`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L85-L99) event. 


## L2 Processing

1. The `op-node` component [looks for `TransactionDeposited` events on L1](https://github.com/ethereum-optimism/optimism/blob/develop/op-node/rollup/derive/deposits.go#L14-L33).
   If it sees any such events, it [parses](https://github.com/ethereum-optimism/optimism/blob/develop/op-node/rollup/derive/deposit_log.go) them.

1. Next, `op-node` [converts](https://github.com/ethereum-optimism/optimism/blob/develop/op-node/rollup/derive/deposits.go#L35-L51) those `TransactionDeposited` events into [deposit transactions](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md#user-deposited-transactions).

1. In most cases user deposit transactions call the [`relayMessage`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/universal/CrossDomainMessenger.sol#L303-L413) function of [`L2CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L2/L2CrossDomainMessenger.sol).

1. `relayMessage` runs a few sanity checks and then, if everything is good, [calls the real target contract with the relayed calldata](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/universal/CrossDomainMessenger.sol#L394).

## Denial of service (DoS) prevention

As with all other L1 transactions, the L1 costs of a deposit are borne by the transaction's originator.
However, the L2 processing of the transaction is performed by the Optimism nodes.
If there were no cost attached, an attacker could be able to submit a transaction that had high costs of run on L2, and that way perform a denial of service attack.

To avoid this DoS vector, [`depositTransaction`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L434), and the functions that call it, require a gas limit parameter.
[This gas limit is encoded into the `TransactionDeposited`(https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L472-L482) event], and used as the gas limit for the user deposit transaction on L2.

This L2 gas is paid for by burning L1 gas [here](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/ResourceMetering.sol#L162). 

## Replaying messages

Deposits are transactions, and as such can fail due to several reasons:

- Not enough gas provided.
- The state on L2 does not allow the transaction to be successful.

It is possible to replay a failed deposit, possibly with more gas, 


### Replays in action

To see how replays work, you can use [this contract on Optimism Goerli](https://goerli-optimism.etherscan.io/address/0x26A145eccDf258688C763726a8Ab2aced898ADe1#code). 

1. Call `stopChanges`. 
   You can do that either [from Etherscan](https://goerli-optimism.etherscan.io/address/0x26A145eccDf258688C763726a8Ab2aced898ADe1#writeContract#F3), or using this Foundry command (after you set `$PRIV_KEY` to your private key, and `$ETH_RPC_URL` to a URL to Optimism Goerli):

   ```sh
   PRIV_KEY=<your private key here>
   export ETH_RPC_URL=<url to Optimism Goerli>
   GREETER=0x26A145eccDf258688C763726a8Ab2aced898ADe1
   cast send --private-key $PRIV_KEY $GREETER "stopChanges()"
   ```

1. Verify that `getStatus()` returns `False`, meaning changes are not allowed, and see the value of `greet()`.
   Again, you can do this from [Etherscan](https://goerli-optimism.etherscan.io/address/0x26A145eccDf258688C763726a8Ab2aced898ADe1#readContract), or use Foundry (where `False` is returned as zero):

   ```sh
   cast call $GREETER "greet()" | cast --to-ascii ; cast call $GREETER "getStatus()"
   ```

1. Get the calldata.
   You can use [an online calculator](https://abi.hashex.org/) with these parameters:

   | Field         | Type | Value
   | - | - | - |
   | Function | your function | `setGreeting(string)`
   | Argument | String | `testing`

   Alternatively, you can use this Foundry command:

   ```sh
   cast calldata "setGreeting(string)" "testing"
   ```

   Or just use this value: 
   
   ```
   0xa41368620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000774657374696e6700000000000000000000000000000000000000000000000000
   ```

1. Send a greeting change as a deposit.

   - To do this using [Etherscan](https://goerli.etherscan.io/address/0x5086d1eEF304eb5284A0f6720f79403b4e9bE294#writeProxyContract#F5), use these parameters:

     | Parameter | Value |
     | - | - 
     | payableAmount | 0 
     | _target       | 0x26A145eccDf258688C763726a8Ab2aced898ADe1
     | _message      | The calldata you created in the previous step
     | _minGasLimit  | 100000

   - To send the greeting change as a deposit using Foundry, use these commands:

     ```sh
     L1_RPC=<URL to Goerli>
     L1_CROSS_DOM_COMM=0x5086d1eef304eb5284a0f6720f79403b4e9be294
     FUNC="sendMessage(address,bytes,uint32)"
     CALLDATA=`cast calldata "setGreeting(string)" "testing"`
     cast send --rpc-url $L1_RPC --private-key $PRIV_KEY $L1_CROSS_DOM_COMM $FUNC $GREETER $CALLDATA 100000
     ```

   <!--
   Either way, the transaction will be successful on L1, and then fail on L2. It is a good idea to keep the transaction hash of this transaction to facilitate future debugging. Store it in `L1_TX_HASH`.
   -->

1. Call `startChanges()` to allow changes.
   You can do that either [from Etherscan](https://goerli-optimism.etherscan.io/address/0x26A145eccDf258688C763726a8Ab2aced898ADe1#writeContract#F2), or using this Foundry command:

   ```sh
   cast send --private-key $PRIV_KEY $GREETER "startChanges()"
   ```

1. Verify that `getStatus()` returns `True`, meaning changes are not allowed, and see the value of `greet()`.
   Again, you can do this from [Etherscan](https://goerli-optimism.etherscan.io/address/0x26A145eccDf258688C763726a8Ab2aced898ADe1#readContract), or use Foundry (where it returns one):

   ```sh
   cast call $GREETER "greet()" | cast --to-ascii ; cast call $GREETER "getStatus()"
   ```

1. The next step is to find the hash of the failed relay.
   The easiest way to do this is to look in [the internal transactions of the destination contract](https://goerli-optimism.etherscan.io/address/0x26A145eccDf258688C763726a8Ab2aced898ADe1#internaltx), and select the latest one that appears as a failure.
   It should be a call to L2CrossDomainMessenger at address `0x420...007`. This is the call you need to replay.

1. Get the transaction information using Foundry.

   ```sh
   TX_HASH=<transaction hash from Etherscan>
   L2_CROSS_DOM_COMM=0x4200000000000000000000000000000000000007
   REPLAY_DATA=`cast tx $TX_HASH input`
   cast send --private-key $PRIV_KEY $L2_CROSS_DOM_COMM $REPLAY_DATA 
   ```

   Note: For debugging you can ask the L2 cross domain messenger the state of the transaction. 
    
   1. Look in Etherscan to see the `FailedRelayedMessage` event. Set `MSG_HASH` to that value.

   1. To check if the message is listed as failed, run this:

      ```sh
      cast call $L2_CROSS_DOM_COMM "failedMessages(bytes32)" $MSG_HASH
      ```

      To check if it is listed as successful, run this:

      ```sh
      cast call $L2_CROSS_DOM_COMM "successfulMessages(bytes32)" $MSG_HASH
      ```


<!-- 
1. You can replay the message [from Etherscan](https://goerli-optimism.etherscan.io/address/0x4200000000000000000000000000000000000007#writeProxyContract) using the same parameters with a payable amount of zero.
   Make sure to add `0x` in front of the values you got from Etherscan in the previous step, and to remove the zeros in front of the addresses (`_sender` and `_target`).   
   Note that all the values after the gas limit are a single value parameter, the message - you need to write them together, with a single `0x` in front.


Function: relayMessage(uint256 _nonce,address _sender,address _target,uint256 _value,uint256 _minGasLimit,bytes _message)

MethodID: 0xd764ad0b
[0]:  000100000000000000000000000000000000000000000000000000000000a25a
[1]:  0000000000000000000000008225d72f2c39f3729d7f3fc03c6aa8731eaeef48
[2]:  00000000000000000000000026a145eccdf258688c763726a8ab2aced898ade1
[3]:  0000000000000000000000000000000000000000000000000000000000000000
[4]:  000000000000000000000000000000000000000000000000000000000000c350
[5]:  00000000000000000000000000000000000000000000000000000000000000c0
[6]:  0000000000000000000000000000000000000000000000000000000000000064
[7]:  a413686200000000000000000000000000000000000000000000000000000000
[8]:  0000002000000000000000000000000000000000000000000000000000000000
[9]:  0000000774657374696e67000000000000000000000000000000000000000000
[10]: 0000000000000000000000000000000000000000000000000000000000000000

-->