---
title: Attestations Best Practices
lang: en-US
---

Are you a builder interested in building something with or around attestations for the Collective? Follow these best practices to make sure your work aligns!

The Optimism Collective uses attestations via the Ethereum Attestation Service as the mechanism for capturing important pieces of data as signed statements made by an issuer. For example, the Optimism Foundation is currently the issuer of attestations about who is a Badgeholder.

## When are attestations useful?

* Any time there is need for public/consumable and trusted data that is not available on-chain, an attestation might be useful.
* Attestations are especially valuable in cases where you need an entity to sign a claim.
* If you are generating some data which is valuable to some other person / organization / entity, by making it an attestation you can make it consumable to them and verify that you are the source of the data.
* Attestations / their content can be made private, make sure to consider whether this would be appropriate for your use case.

## When are Attestations not useful?

* If the data in an attestation doesn’t need to be shared / consumed by anyone at all then there is probably no reason to turn it into an attestation.
* Data which can just be derived on-chain, like an account’s balance, transaction histories, etc., doesn’t need to be an attestation.

## Knowing when to generate attestations

We need to grow a rich set of attestations to build out identity in the Collective, but they must also be relevant. It is a delicate balancing act that each attestor will need to decide. Blanket issuing attestations that don’t have much value just means that we’ll have to filter out more noise. Ideally, the fact that you’re issuing an attestation is already one sign that this piece of data is signal rather than noise.
* A good moment to issue an attestation is when there is already a use-case - i.e. the attestation you issue will immediately be consumed for a specific purpose and solves a real need / problem. For example, when you want attestation-gated channels in Discord.
* If there is an attestation you think might be useful to some other or future entity, gather input from that entity (if possible). Validate that this data is indeed valuable / necessary. If we’re talking about future entities, use your best judgment. It’s true that starting to issue certain attestations early (before there is a clear use case) can be valuable later, but only if the future use case manifests.
* If you’re not sure, consider the importance of the piece of information you are attesting in the context of the value chain it is part of. For example, in the context of Retro Funding, the fact a project received funding is closer to the source of value than the fact that it applied.

## Deciding on the issuer

* The issuer is perhaps the most essential component of an attestation. Trust in the issuer is what gives an attestation meaning. Someone can go around signing digital statements that people have Doctorate degrees from Harvard University, but they have no meaning unless people believe that person to be the legitimate source of truth on who has Doctorate degrees from Harvard University.
* When deciding the issuer, think about who or what is the source of truth on a piece of information. Sometimes, this might be code, and a piece of software is the optimal issuer. In this case, transparency / legitimacy of the code can be important factors in people’s trust in the attestation.
* In cases where a person or group of people are the source of truth of a piece of information, a single person’s Ethereum account or a group’s multisig might be the more appropriate issuers of the attestation.
* There may be cases where software is the best issuer, but it is impractical to make this happen. In these cases, it’s reasonable to find an individual or organization that is a legitimate authority on the attestations and is trustworthy to others. For example, for the time being an Optimism Foundation multisig is the issuer of attestations on who is a Badgeholder, but in the future it may be a smart contract that issues these attestations.
* Remember that attestations are context-dependent / intersubjective - what matters most is the long-term credibility of the issuer of an attestation - i.e. how the issuer is perceived by others.

## Creating a useful schema

Schemas exist to make sure that similar attestations are structured in the same way and can be identified as belonging to a set. This is vital for attestation consumers. Before creating a new schema, check to see if a relevant schema already exists. The EAS has recommendations for schema design. Here are some of their tips:
* Keep it Simple: A schema should be concise. Avoid unnecessary complexity. 
* Be Descriptive: Each field should have a clear purpose and name.
* Avoid Redundancy: Ensure each piece of information is captured once.
* Plan for the Future: Design your schema to be extendable without breaking existing attestations.
* Gas Efficiency: Consider the Ethereum gas costs. Using the right data types and thinking modularly will help reduce costs.

## When to make attestations on- vs. off-chain

Some key points to keep in mind (see here for a full rundown):
* On-chain attestations are easier for smart contracts to read and directly verifiable on the blockchain.
* If you need them to be completely private, off-chain attestations give you more options. Sensitive data must be encrypted in on-chain attestations.
* Off-chain attestations can be deleted, but on-chain they are immutable.
* Both kinds can be revoked, but off-chain attestations require their own separate revocation management.
* On-chain attestations are associated with gas fees and transaction times, making them less scalable than off-chain.

For questions about attestations that aren’t answered here, please consult the Ethereum Attestation Service documentation.