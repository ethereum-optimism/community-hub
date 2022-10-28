# Social Contract Technical Spec

The following is the breakdown of Optimism's Social Contract smart contract.

## State

### attestations

The following is the nested mapping that stores all the attestations made.

```
mapping(address => mapping(address => mapping(bytes32 => bytes))) public attestations;
```

The following is a struct that represents a properly formatted attestation.

### AttestationData

```
struct AttestationData {
    address about;
    bytes32 key;
    bytes val;
}
```

## Event

### AttestationCreated

This event is emitted when an attestation is successfully made.

```
event AttestationCreated(
    address indexed creator,
    address indexed about,
    bytes32 indexed key,
    bytes val
);
```

## Function

### attest

```
function attest(AttestationData[] memory _attestations) public
```

Records attestations to the SocialContract's state and emits an `AttestationCreated` event with the address of the message sender, address the attestation is about, the bytes32 key, and bytes value.

Parameters:

| Name           | Type              | Description                         |
| -------------- | ----------------- | ----------------------------------- |
| \_attestations | AttestationData[] | Array of `AttestationData` structs. |
