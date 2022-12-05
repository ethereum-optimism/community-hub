---
title: What is the AttestationStation?
lang: en-US
---
The AttestationStation is an **attestation smart contract** deployed on Optimism.  It enables _anyone_ to make arbitrary attestations about other addresses. When multiple entities participate in providing qualitative attestations about actors within a community, an invaluable data library is created for the broader ecosystem. **Ultimately we hope the AttestationStation can serve as an accessible data source for builders creating reputation related apps.**

<!-- TODO: Add source code link when we have an authoritative source -->

#### What can attestations be used for?
Attestations can be used for a wide variety of applications including voting, reputations / credit scores, reviews, and more.

As an example, attestations written to the AttestationStation form the base layer of reputation for the [Optimism Citizen House](https://community.optimism.io/docs/governance/citizens-house/).

#### How do I use the AttestationStation?

See [the tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/ecosystem/attestation-station).


#### What are the contract addresses for the AttestationStation?

| Network | Address |
| - | - |
| Optimism Goerli | [`0x7787194CCA11131C0159c0AcFf7E127CF0B676ed`](https://goerli-optimism.etherscan.io/address/0x7787194cca11131c0159c0acff7e127cf0b676ed)  |
| Optimism mainnet | To be determined |


#### I am building on top of the AttestationStation but have some questions, where can I discuss these?

The best place to ask any dev related questions is the #dev-support channel on the [the Optimism Discord](https://discord-gateway.optimism.io/). If you need additional support check out this [Help Article](https://help.optimism.io/hc/en-us/articles/9762044018843-How-do-I-get-project-support-marketing-integrations-etc-).

#### I want to apply for a grant to build on AttestationStation, how can I do this?

You can learn more about the variety of grants program available at Optimism [here](allocations/#ecosystem-fund). As a reminder, your work should be published to a public GitHub repo.

#### What projects are writing attestations to the AttestationStation?

[Optimism's Citizen house](https://community.optimism.io/docs/governance/citizens-house/), [redacted], and more are all using the AttestationStation! 
If your project is using the AttestationStation make a PR including how you're using it to be added to the list 😊

| Author              | Author Address | Key                                                        | Value | Description                                  |
| ------------------- | ---------------| ---------------------------------------------------------- |------ |--------------------------------------------- |
| Optimism Foundation | tbd            | op.retropgf.szn-2.can-vote:bool                            | true  | People eligible to vote in RetroPGF #2       |
| Optimism Foundation | tbd            | op.pfp.can-mint:bool                                       | true  | People eligible to mint the Optimist PFP     |

#### What naming convention do you recommend when writing attestations?

To make attestations as easy to interpret as possible we recommend making your key descriptive about what the attestation is about and including the data type (bool, string, address, etc.) at the end of the key. 

#### What is on the AttestationStation roadmap?

The first experiment of the AttestationStation is with public attestations. As we iterate towards a reputation system underpinning the Citizen’s house we’re excited to collaborate with other teams in the space to make it easy for anyone to use, read, write, and update attestations across the ecosystem. 

Some things we’re looking forward to:

* Launching an SDK to simplify creating, viewing, and updating attestations and no-code interface used to view, create, explore, and contextualize attestations.
* Exploring a variety of on-chain and off-chain tools including using zero-knowledge proofs to make attestations as private by default
* Aggregating attestations from various communities and using techniques like [EigenTrust](https://en.wikipedia.org/wiki/EigenTrust) to derive reputation

#### What products are built on top of the AttestationStation? 

* [Attestation Station Open Source Interface by sbvegan](https://github.com/sbvegan/attestation-station-interface)

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

