---
title: What is the AttestationStation?
lang: en-US
---
![](../../assets/docs/governance/attestationstation/attestationstation.png)

The AttestationStation is an **attestation smart contract** deployed on Optimism.  

The goal of the AttestationStation is to provide a permissionless, accessible data source for builders creating reputation-based applications. By enabling anyone to make arbitrary attestations about other addresses, we can create a rich library of qualitative and quantitative data that can be used across the ecosystem.

<!-- TODO: Add source code link when we have an authoritative source -->

## General FAQ

#### What can attestations be used for?
As multiple entities participate in providing qualitative attestations about actors within a community to the AttestationStation, an invaluable graph of p2p attestations is created for the broader ecosystem.

![](../../assets/docs/governance/attestationstation/network.png)

We can then take the graph of p2p attestations from the AttestationStation and run computations like EigenTrust over the set of data to derive identity sets on top of a purely subjective web of trust.

![](../../assets/docs/governance/attestationstation/eigan.png)

To build a robust, trustworthy network, these computations will be run iteratively. We can start with a purely subjective web of trust, then pipe that as the starting point to derive a larger web of trust, and so on — we can then begin to establish a credibly neutral reputation that is entirely peer to peer. This open source primitive can be used for a wide variety of applications including voting, reputations / credit scores, reviews, and more.


#### How do I use the AttestationStation?

See [the tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/ecosystem/attestation-station).


#### What are the contract addresses for the AttestationStation?

| Network | Address |
| - | - |
| Optimism Goerli | [`0x7787194CCA11131C0159c0AcFf7E127CF0B676ed`](https://goerli-optimism.etherscan.io/address/0x7787194cca11131c0159c0acff7e127cf0b676ed)  |
| Optimism Mainnet | To be determined |


#### I am building on the AttestationStation but have some questions, where can I discuss these?

The best place to ask any dev related questions is the #dev-support channel on the [the Optimism Discord](https://discord-gateway.optimism.io/). If you need additional support check out this [Help Article](https://help.optimism.io/hc/en-us/articles/9762044018843-How-do-I-get-project-support-marketing-integrations-etc-).

#### I want to apply for a grant to build on the AttestationStation, how can I do this?

You can learn more about the variety of grants program available at Optimism [here](allocations/#ecosystem-fund). As a reminder, your work should be published to a public GitHub repo.

#### What projects are writing attestations to the AttestationStation?
If your project is using the AttestationStation, make a PR including how you're using the relevant attestation(s) to be added to the list 😊

| Author              | Author Address | Key                                                        | Value | Description                                  |
| ------------------- | ---------------| ---------------------------------------------------------- |------ |--------------------------------------------- |
| Optimism Foundation | tbd            | op.retropgf.szn-2.can-vote:bool                            | true  | People eligible to vote in RetroPGF #2       |
| Optimism Foundation | tbd            | op.pfp.can-mint:bool                                       | true  | People eligible to mint the Optimist NFT     |
| Flipside | tbd                       | tbd                                                        | 1 - 5 | People's acitivity score for on-chain activity in the last 180 days  

#### What naming convention do you recommend when writing attestations?

To make attestations as easy to interpret as possible we recommend making your key descriptive about what the attestation is about and including the data type (bool, string, address, etc.) at the end of the key. 

#### What is on the AttestationStation roadmap?

It will take a huge community effort to realize the potential that reputation has to transform web3. That’s why we started small with the AttestationStation and an open invite to come experiment with us. We can already think of a bunch of fun projects to build today like:

* **EiganTrust**: Aggregate attestations from various communities and use techniques like [EigenTrust](https://en.wikipedia.org/wiki/EigenTrust) to derive reputation
* **Data visualization**: Create data visualizations representing the different types of attestations in the AttestationStation
* **Predictive attestations**: Instead of attesting “I trust XYZ”, try fun attestations like, “I believe XYZ will be considered trusted by a majority of node in the future”. Plus, what if we add a slashing condition to the predictive attestation?
* **Attestation delegation**: Build a system which manages attestations automatically for users. This system should enable users to delegate some of their attestation assignment to a third party.
* **Attestation import**: Write proxy contracts which import attestations of various formats into the standardized AttestationStation format so that they can be consumed by the standard AttestationStation tooling.
* **Viral attestations**: Create systems which make it fun and easy for users to attest useful information about each other.

#### What products are built on the AttestationStation? 
* [Attestation Station Open Source Interface by sbvegan](https://github.com/sbvegan/attestation-station-interface)
* [redacted]

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

