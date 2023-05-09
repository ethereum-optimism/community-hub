---
title: Deposit Flow
lang: en-US
---

## Introduction

In Optimism terminology *deposit* refers to any transaction that goes from L1 to L2.
A deposit transaction may or may not have assets (ETH, tokens, etc.) attached to it.

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