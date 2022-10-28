# SocialContract

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

`AttestationData` struct:

```
struct AttestationData {
    address about;
    bytes32 key;
    bytes val;
}
```

`AttestationCreated` event:

```
event AttestationCreated(
    address indexed creator,
    address indexed about,
    bytes32 indexed key,
    bytes val
);
```
