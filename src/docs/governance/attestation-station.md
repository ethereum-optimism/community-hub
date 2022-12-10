---
title: What is the AttestationStation?
lang: en-US
---
![](../../assets/docs/governance/attestationstation/attestationstation.png)

The AttestationStation is an **attestation smart contract** deployed on Optimism.  

The goal of the AttestationStation is to provide a permissionless and accessible data source for builders creating reputation-based applications. By enabling anyone to make arbitrary attestations about other addresses, we can create a rich library of qualitative and quantitative data that can be used across the ecosystem.


<!-- TODO: Add source code link when we have an authoritative source -->

## General FAQ

#### What can attestations in the AttestationStation be used for?
Instead of having a single entity owning user data and identity, Optimism's reputation layer is formed by a network of peer-to-peer (p2p) attestations. 

![](../../assets/docs/governance/attestationstation/network.png)

We can then take the graph of p2p attestations from the AttestationStation and run computations like EigenTrust over the set of data to derive identity sets on top of a purely subjective web of trust.

![](../../assets/docs/governance/attestationstation/eigan.png)

To build a robust, trustworthy identity network, these computations will be run iteratively. We can start with a purely subjective web of trust, and use that starting point to derive a larger web of trust, and so on — we can begin to establish a credibly neutral reputation that is entirely peer-to-peer. This open source primitive can be used for a variety of sybil-resistant applications including voting, reputations / credit scores, reviews, and more.

#### How is the AttestationStation different from other attestation products?

The AttestationStation is deliberately dead simple and serves as an open invite to ecosystem contributors to come build an open and permissionless attestation graph together.

Creating this system in a decentralized and open-source manner is important because it allows for greater inclusion and representation of different perspectives. This can help to ensure that the system is fair and accessible to all, and that it accurately reflects the diversity of the communities it serves.


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

| Attester            | Attester Address | Key                                                     | Value | Description                                 |
| ------------------- | ---------------| ---------------------------------------------------------- |------ |---------------------------------------- -- |
| Optimism Foundation | tbd            | retropgf.round-2.can-vote                           | true  | People eligible to vote in RetroPGF #2       |
| Optimism Foundation | tbd            | optimist.can-mint                                       | true  | People eligible to mint the Optimist NFT     |


#### What are some things I should build with the AttestationStation?

It will take a huge community effort to realize the potential that reputation has to transform web3. That’s why we started small with the AttestationStation and an open invite to come experiment with us. We can already think of a bunch of fun projects to build today like:

* **EiganTrust**: Aggregate attestations from various communities and use techniques like [EigenTrust](https://en.wikipedia.org/wiki/EigenTrust) to derive reputation
* **Data visualization**: Create data visualizations representing the different types of attestations in the AttestationStation
* **Predictive attestations**: Instead of attesting “I trust XYZ”, try fun attestations like, “I believe XYZ will be considered trusted by a majority of node in the future”. Plus, what if we add a slashing condition to the predictive attestation?
* **Attestation delegation**: Build a system which manages attestations automatically for users. This system should enable users to delegate some of their attestation assignment to a third party.
* **Attestation import**: Write proxy contracts which import attestations of various formats into the standardized AttestationStation format so that they can be consumed by the standard AttestationStation tooling.
* **Viral attestations**: Create systems which make it fun and easy for users to attest useful information about each other.

#### What products are built on the AttestationStation? 
* [Attestationstation Interface by sbvegan](https://attestationstation.xyz/)
* [Optimist Score by Flipside](https://science.flipsidecrypto.xyz/optimist/)


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

