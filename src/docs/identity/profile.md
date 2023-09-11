---
title: Optimist Profile
lang: en-US
---
The Optimist Profile allows contributors to share the contributions and impact they've made to the Optimism Collective.

Anyone can create an Optimist Profile and anyone is able to use the Optimist Profile in onchain identity use cases.

## Overview
The Optimist Profile is built using the variety of onchain reputation data on OP Mainnet and has the following elements:

**Profile Schema:** An onchain self-attestation using the profile schema that represents an individual or organization.
**Contributions:** Each Optimist Profile can create onchain attestations about their contributions to the Optimism Collective. Optimist Profiles can also be used to create onchan peer-to-peer (p2p) attestations about the contributions of other contributors. Peer to peer attestations help the Optimism Collective create a contribution web of trust.

## Technical details
The Optimist Profile is built on attestations using the [Ethereum Attestation Service](./atst-v1.md). 

![Logo](../../assets/docs/identity/profile.png)

- **Profile schema UID:**  `​​0xac4c92fc5c7babed88f78a917cdbcdc1c496a8f4ab2d5b2ec29402736b2cf929`
    - name: name of the profile
    - profileMetadataPtrType: used to determine the protocol
    - profileMetadataPtr: can be a URI, ipfs hash, etc. that points to any type of blob storage that stores the metadata of type shown below

- **RetroPGF 3 Application schema UID:** `0x76e98cce95f3ba992c2ee25cef25f756495147608a3da3aa2e5ca43109fe77cc`
    - displayName: name of the application
    - applicationMetadataPtrType: used to determine the protocol 
    - applicationMetadataPtr: can be a URI, ipfs hash, etc. that points to any type of blob storage that stores the metadata of type shown below

## Common questions

**Q: How do I get the addresses for RetroPGF badgeholders?**

**A:** Use the EAS SDK `getAttestation` function to retrieve the onchain attestation where Schema UID: `0xfdcfdad2dbe7489e0ce56b260348b7f14e8365a8a325aef9834818c00d46b31b`.
Remember to verify the attester address is `0x621477dBA416E12df7FF0d48E14c4D20DC85D7D9`. 

**Q: How do I get the addresses for Optimist Profiles?**

**A:** Use the EAS SDK `getAttestation` function to retrieve the onchain attestation where Schema UID: `0xac4c92fc5c7babed88f78a917cdbcdc1c496a8f4ab2d5b2ec29402736b2cf929`.




