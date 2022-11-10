---
title: What is the AttestationStation?
lang: en-US
---

The AttestationStation is an **attestation layer** deployed on Optimism. 
It enables _anyone_ to make arbitrary attestations about other addresses. 
Anyone is able to read, add to, or build on top of this data primitive. When multiple entities participate in providing qualitative attestations about actors within a community, an invaluable data library is created for the broader ecosystem. 

<!-- TODO: Add source code link when we have an authoritative source -->

## How do I use AttestationStation?

See [the tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/ecosystem/attestation-station).


## Contract Addresses

| Network | Address |
| - | - |
| Optimism Goerli | [`0x7787194CCA11131C0159c0AcFf7E127CF0B676ed`](https://goerli-optimism.etherscan.io/address/0x7787194cca11131c0159c0acff7e127cf0b676ed)  |
| Optimism mainnet | To be determined |


## I am building on top of the AttestationStation but have some questions, where can I discuss these?

The best place to ask any dev related questions is the #dev-support channel on the [the Optimism Discord](https://discord-gateway.optimism.io/).

## I want to apply for a grant to build on AttestationStation, how can I do this?

You can learn more about the variety of grants program available on Optimism [here](allocations/#ecosystem-fund).

## What projects are using the AttestationStation?

[Optimism's Citizen house](https://community.optimism.io/docs/governance/citizens-house/), [redacted], and [redacted] are all using the AttestationStation! 
If your project is using the AttestationStation make a PR including how you're using it to be added to the list 😊

## Technical specifications

The following is the breakdown of Optimism's AttestationStation smart contract.

### State

#### attestations

The following is the nested mapping that stores all the attestations made.

```
mapping(address => mapping(address => mapping(bytes32 => bytes))) public attestations;
```

The following is a struct that represents a properly formatted attestation.

#### AttestationData

```
struct AttestationData {
    address about;
    bytes32 key;
    bytes val;
}
```

### Events

#### AttestationCreated

This event is emitted when an attestation is successfully made.

```
event AttestationCreated(
    address indexed creator,
    address indexed about,
    bytes32 indexed key,
    bytes val
);
```

### Functions

#### attest

```
function attest(AttestationData[] memory _attestations) public
```

Records attestations to the AttestationStation's state and emits an `AttestationCreated` event with the address of the message sender, address the attestation is about, the bytes32 key, and bytes value.

Parameters:

| Name           | Type              | Description                         |
| -------------- | ----------------- | ----------------------------------- |
| \_attestations | AttestationData[] | Array of `AttestationData` structs. |

