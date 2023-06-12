---
title: Withdrawal Flow
lang: en-US
---


In Optimism terminology, a *withdrawal* is a transaction sent from L2 (Optimism) to L1 (Ethereum mainnet).
This withdrawal may or may not have assets attached to it.

Withdrawals require the user to submit three transactions:

1. **Withdrawal initiating transaction**, which the user submits on L2.
1. **Withdrawal proving transaction**, which the user submits on L1 to prove that the withdrawal is legitimate (based on a merkle patricia trie root that commits to the state of the `L2ToL1MessagePasser`'s storage on L2)
1. **Withdrawal finalizing transaction**, which the user submits on L1 after the fault challenge period has passed, to actually run the transaction on L1, claim any assets attached, etc.

You can see an example of how to do this [in the tutorials](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/cross-dom-comm#optimism-message-to-ethereum-withdrawal).


## Withdrawal initiating transaction

1. On L2 somebody (either an externally owned account (EOA) directly or a contract acting on behalf of an EOA) calls the [`sendMessage`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/universal/CrossDomainMessenger.sol#L249-L289) function of [`L2CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/universal/CrossDomainMessenger.sol). 

   This function accepts three parameters:

   - `_target`, target address on L1.
   - `_message`, the L1 transaction's calldata, formatted as per the [ABI](https://docs.soliditylang.org/en/v0.8.19/abi-spec.html) of the target account.
   - `_minGasLimit`, The minimum amount of gas that the withdrawal finalizing transaction can provide to the withdrawal transaction. This is enforced by the `SafeCall` library, and if the minimum amount of gas cannot be met at the time of the external call from the `OptimismPortal` -> `L1CrossDomainMessenger`, the finalization transaction will revert to allow for re-attempting with a higher gas limit. In order to account for the gas consumed in the `L1CrossDomainMessenger.relayMessage` function's execution, extra gas will be added on top of the `_minGasLimit` value by the `CrossDomainMessenger.baseGas` function when `sendMessage` is called on L2.

1. `sendMessage` is a generic function that is used in both cross domain messengers. 
   It calls [`_sendMessage`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L2/L2CrossDomainMessenger.sol#L48-L60), which is specific to [`L2CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L2/L2CrossDomainMessenger.sol).

1. `_sendMessage` calls [`initiateWithdrawal`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L2/L2ToL1MessagePasser.sol#L91-L129) on [`L2ToL1MessagePasser`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L2/L2ToL1MessagePasser.sol).
   This function calculates the hash of the raw withdrawal fields.
   It then [marks that hash as a sent message in `sentMessages`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L2/L2ToL1MessagePasser.sol#L114) and [emits the fields with the hash in a `MessagePassed` event](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L2/L2ToL1MessagePasser.sol#L116-L124).

   The raw withdrawal fields are:

   - `nonce` - A single use value to prevent two otherwise identical withdrawals from hashing to the same value
   - `sender` - The L2 address that initiated the transfer, typically [`L2CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L2/L2CrossDomainMessenger.sol)
   - `target` - The L1 target address
   - `value` - The amount of WEI transferred by this transaction
   - `gasLimit` - Gas limit for the transaction, the system guarantees that at least this amount of gas will be available to the transaction on L1.
     Note that if the gas limit is not enough, or if the L1 finalizing transaction does not have enough gas to provide that gas limit, the finalizing transaction returns a failure, it does not revert.
   - `data` - The calldata for the withdrawal transaction

1. When `op-proposer` [proposes a new output](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/op-proposer/proposer/l2_output_submitter.go#L312-L320), the output proposal includes [the output root](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/op-proposer/proposer/l2_output_submitter.go#L316), provided as part of the block by `op-node`. 
   This new output root commits to the state of the `sentMessages` mapping in the `L2ToL1MessagePasser` contract's storage on L2, and it can be used to prove the presence of a pending withdrawal within it.




## Withdrawal proving transaction

Once an output root that includes the `MessagePassed` event is published to L1, the next step is to prove that the message hash really is in L2.
Typically this is done [by the SDK](https://sdk.optimism.io/classes/crosschainmessenger#proveMessage-2).

### Offchain processing

1. A user calls the SDK's [`CrossDomainMessenger.proveMessage()`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/sdk/src/cross-chain-messenger.ts#L1452-L1471) with the hash of the L1 message.
   This function calls [`CrossDomainMessenger.populateTransaction.proveMessage()`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/sdk/src/cross-chain-messenger.ts#L1746-L1798).

1. To get from the L2 transaction hash to the raw withdrawal fields, the SDK uses [`toLowLevelMessage`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/sdk/src/cross-chain-messenger.ts#L368-L450).
      It gets them from the `MessagePassed` event in the receipt.

1. To get the proof, the SDK uses [`getBedrockMessageProof`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/sdk/src/cross-chain-messenger.ts#L1348-L1395).

1. Finally, the SDK calls [`OptimismPortal.proveWithdrawalTransaction()`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L234-L318) on L1.



### Onchain processing

[`OptimismPortal.proveWithdrawalTransaction()`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L234-L318) runs a few sanity checks.
Then it verifies that in `L2ToL1MessagePasser.sentMessages` on L2 the hash for the withdrawal is turned on, and that this proof have not been submitted before.
If everything checks out, it writes the output root, the timestamp, and the L2 output index to which it applies in `provenWithdrawals` and emits an event. 

The next step is to wait the fault challenge period, to ensure that the L2 output root used in the proof is legitimate, and that the proof itself is legitimate and not a hack.


## Withdrawal finalizing transaction

Finally, once the fault challenge period passes, the withdrawal can be finalized and executed on L1.

### Offchain processing

1. A user calls the SDK's [`CrossDomainMessenger.finalizeMessage()`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/sdk/src/cross-chain-messenger.ts#L1473-L1493) with the hash of the L1 message.
   This function calls [`CrossDomainMessenger.populateTransaction.finalizeMessage()`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/sdk/src/cross-chain-messenger.ts#L1800-L1853).

1. To get from the L2 transaction hash to the raw withdrawal fields, the SDK uses [`toLowLevelMessage`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/sdk/src/cross-chain-messenger.ts#L368-L450).
      It gets them from the `MessagePassed` event in the receipt.

1. Finally, the SDK calls [`OptimismPortal.finalizeWithdrawalTransaction()`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L320-L420) on L1.

### Onchain processing

1. [`OptimismPortal.finalizeWithdrawalTransaction()`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L320-L420) runs several checks. The interesting ones are:

   - [Verify the proof has already been submitted](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L341-L347).
   - [Verify the proof has been submitted long enough ago that the fault challenge period has already passed](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L357-L364).
   - [Verify that the proof applies to the current output root for that block (the output root for a block can be changed by the fault challenge process)](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L366-L378).
   - [Verify that the current output root for that block was proposed long enough ago that the fault challenge period has passed](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L380-L384).
   - [Verify that the transaction has not been finalized before to prevent replay attacks](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L386-L390).

   If any of these checks fail, the transaction reverts.

1. Mark the withdrawal as finalized in `finalizedWithdrawals`.

1. Run the actual withdrawal transaction (call the `target` contract with the calldata in `data`).

1. Emit a [`WithdrawalFinalized`](https://github.com/ethereum-optimism/optimism/blob/62c7f3b05a70027b30054d4c8974f44000606fb7/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L118) event.