---
title: AttestationStation v0 
lang: en-US
---

::: warning Deprecated

This contract is not actively being supported, we recommend using [AttestationStation v1](atst-v1).

:::

These attestations have these attributes:

- **Creator**, the address that wrote the attestation.
- **Key**, a 32 byte value that identifies the attestation. 
  This value can be a short ASCII string, it can be the hash value of a longer (>32 characters) string, or it can be anything else. 
  It is possible for different creators to use the same key for different purposes.
- **Value**, a string of bytes that can be interpreted as ASCII, a number, etc.

The interpretation of the attestation is up to the creator, and is not necessarily stored onchain.

You can read and write attestations in several ways:

- [Direct access](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/ecosystem/attestation-station/contract-access)
- Using the SDK: 
  - [Reference](https://github.com/ethereum-optimism/optimism/blob/develop/packages/atst/docs/sdk.md)
  - [Tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/ecosystem/attestation-station/using-sdk)


## Searches

To look for an attestation you have to know the creator, the address it is about, and the key. 
If you want to search for information (for example, “all attestations about address X” or “all attestations created by address Y for key Z”), you need to search offchain.

To optimize for performance, there are several APIs that you can use to search attestations:

- [API endpoints by nxyz](https://docs.n.xyz/reference/attestation-station)
- [GraphQL Indexer by Mason Hall](https://attestation-indexer-production.up.railway.app/graphql)
- [ShroomSDK by Flipside](https://github.com/MSilb7/op_attestationstation_data)
- [Subgraph by wslyvh](https://thegraph.com/hosted-service/subgraph/wslyvh/optimism-atst)

Alternatively, you can look at `AttestationCreated` events on the blockchain. 
This way there is no centralized authority to trust.

- [Read contract events directly](https://github.com/ethereum-optimism/optimism-tutorial/blob/main/ecosystem/attestation-station/contract-access/README.md#read-all-relevant-attestations)
- [Use the SDK](https://github.com/ethereum-optimism/optimism/blob/develop/packages/atst/docs/sdk.md#getevents)



## Smart contracts / technical specifications

The legacy AttestationStation contract is located [in the Optimism monorepo](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-periphery/contracts/universal/op-nft/AttestationStation.sol). It is deployed at address `0xEE36eaaD94d1Cc1d0eccaDb55C38bFfB6Be06C77`, both on [Optimism Mainnet](https://explorer.optimism.io/address/0xEE36eaaD94d1Cc1d0eccaDb55C38bFfB6Be06C77) and [Optimism Goerli](https://goerli-optimism.etherscan.io/address/0xEE36eaaD94d1Cc1d0eccaDb55C38bFfB6Be06C77). The following is the breakdown of this smart contract.

### State

#### attestations

The following is the nested mapping that stores all the attestations made.

```solidity
mapping(address => mapping(address => mapping(bytes32 => bytes))) public attestations;
```


#### AttestationData 

The following is a struct that represents a properly formatted attestation.

```solidity
struct AttestationData {
    address about;
    bytes32 key;
    bytes val;
}
```

### Event: AttestationCreated

This event is emitted when an attestation is successfully made.

```solidity
event AttestationCreated(
    address indexed creator,
    address indexed about,
    bytes32 indexed key,
    bytes val
);
```

### Functions

#### `attest(address _about, bytes32 _key, bytes memory _val)`

Records attestations to the AttestationStation's state and emits an `AttestationCreated` event with the address of the message sender, address the attestation is about, the bytes32 key, and bytes value.

```solidity
function attest(address _about, bytes32 _key, bytes memory _val) public
```

Allows anyone to create an attestation.

| Name     | Type | Description |
| -------- | --- | --- |
| `_about` | `address` | Address that the attestation is about. |
| `_key`   | `bytes32` | A key used to namespace the attestation. |
| `_val`   | `bytes` | An arbitrary value stored as part of the attestation. |


#### `attest(AttestationData[] memory _attestations)`

```solidity
function attest(AttestationData[] memory _attestations) public
```

Allows anyone to create attestations.

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `_attestations` | `AttestationData[]` | An array of attestation data. |


## Attestation hacks

- [Separating creator, signer, and transaction payer](https://github.com/ethereum-optimism/optimism-tutorial/blob/main/ecosystem/attestation-station/contract-access/README.md#separating-creator-signer-and-transaction-payer)
