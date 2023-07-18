---
title: Contract Overview
lang: en-US
---

## L1 contracts

### L2OutputOracle

[The `L2OutputOracle` contract](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/L1/L2OutputOracle.sol) contains the state root of the Optimism blockchain (OP Mainnet, OP Goerli, etc.).
Once fault proofs are activated, it will be the one that receives the result of the fault proof process.

This is the contract that replaces the old State Commitment Chain.

### OptimismPortal

[The `OptimismPortal` contract](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol) provides the low-level API for communications between layers. Unless you are trying to send L2 transactions via L1 to bypass the sequencer, we strongly recommend sending messages between L1 and L2 via the L1CrossDomainMessenger and L2CrossDomainMessenger.

### L1CrossDomainMessenger

[The `L1CrossDomainMessenger` contract](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/L1/L1CrossDomainMessenger.sol) is used for sending messages between the underlying L1 (Ethereum, Goerli, etc.) and L2 (OP Mainnet, OP Goerli, etc.). Those messages may or may not have assets attached to them.

### L1StandardBridge

[The `L1StandardBridge` contract](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/L1/L1StandardBridge.sol) uses `L1CrossDomainMessenger` to transfer ETH and ERC-20 tokens between the underlying L1 (Ethereum, Goerli, etc.) and L2 (OP Mainnet, OP Goerli, etc.).


### L1ERC721Bridge

[The `L1ERC721Bridge` contract](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/L1/L1ERC721Bridge.sol) uses `L1CrossDomainMessenger` to transfer NFTs ([ERC-721 tokens](https://eips.ethereum.org/EIPS/eip-721)) between the underlying L1 (Ethereum, Goerli, etc.) and L2 (OP Mainnet, OP Goerli, etc.).

## L2 contracts (predeploys)

### L1Block

[The `L1Block` contract](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/L2/L1Block.sol) sits at address `0x4200000000000000000000000000000000000015`.
You can use [the getter functions](https://docs.soliditylang.org/en/v0.8.12/contracts.html#getter-functions) to get these parameters:

- `number`: The latest L1 block number known to L2 (the `L1BlockNumber` contract is still supported to avoid breaking existing applications)
- `timestamp`: The timestamp of the latest L1 block
- `basefee`: The base fee of the latest L1 block
- `hash`: The hash of the latest L1 block
- `sequenceNumber`: The number of the L2 block within the epoch (the epoch changes when there is a new L1 block)

Currently the L1 information is delayed by two block confirmations (~24 seconds) to minimize the impact of reorgs.

### SequencerFeeVault

[The `SequencerFeeVault` contract](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/L2/SequencerFeeVault.sol) handles funding the sequencer on L1 using the ETH base fee on L2.

The fees are calculated using [EIP 1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md), the same mechanism that Ethereum uses (but with different parameter values).


### L2ToL1MessagePasser

[The `L2ToL1MessagePasser` contract](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/L2/L2ToL1MessagePasser.sol) is used internally by `L2CrossDomainMessenger` to initiate withdrawals.

Note that there are two contracts under this name:

- [The legacy contract](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/legacy/LegacyMessagePasser.sol) at address `0x4200000000000000000000000000000000000000`
- [The new contract](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/L2/L2ToL1MessagePasser.sol) at address `0x4200000000000000000000000000000000000016`


### L2CrossDomainMessenger

[The `L2CrossDomainMessenger` contract](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/L2/L2CrossDomainMessenger.sol) is used to send messages from L2 (OP Mainnet, OP Goerli, etc.) to the underlying L1 (Ethereum, Goerli, etc.).


### L2StandardBridge 

[The `L2StandardBridge` contract](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/L2/L2StandardBridge.sol) is used to "attach" assets (ETH and ERC-20 tokens) to messages that are then sent by `L2CrossDomainMessenger`.

### L2ERC721Bridge

[The `L2ERC721Bridge` contract](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/L2/L2ERC721Bridge.sol) uses `L2CrossDomainMessenger` to transfer NFTs ([ERC-721 tokens](https://eips.ethereum.org/EIPS/eip-721)) between the underlying L1 (Ethereum, Goerli, etc.) and L2 (OP Mainnet, OP Goerli, etc.).

### WETH9

[The WETH9 contract](https://web.archive.org/web/20221022164309/https://weth.io/) is an ERC-20 token that wraps around ETH to provide extra functionality, such as approvals.



### Legacy Contracts

Those are contracts that have been superceded, but are kept in case any deployed contract depends on them.

- [L1BlockNumber](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/legacy/L1BlockNumber.sol): 
  The `L1BlockNumber` contract provides the number of the latest L1 block. 
  In Bedrock it is simply a proxy to [`L1Block`](#l1block). 
- [DeployerWhitelist](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/legacy/DeployerWhitelist.sol):
  The `DeployerWhitelist` contract used to manage the whitelist before [OP Mainnet moved out of beta](https://twitter.com/optimismFND/status/1471571415774023682).

- [OVM_ETH](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/packages/contracts-bedrock/contracts/legacy/LegacyERC20ETH.sol):
  The `OVM_ETH` contract used to manage users ETH balances prior to Bedrock.

