---
title: AttestationStation v1 
lang: en-US
---

The AttestationStation v1 uses [the Ethereum Attestation service standard](https://docs.attest.sh/docs/welcome) deployed on these addresses:

| Network         | Attestation Contract | Schema Registry Contract |
| --------------- | - | - |
| OP Goerli | [0x4200000000000000000000000000000000000021](https://goerli-optimism.etherscan.io/address/0x4200000000000000000000000000000000000021) | [0x4200000000000000000000000000000000000020](https://goerli-optimism.etherscan.io/address/0x4200000000000000000000000000000000000020)
| OP Mainnet | [0x4200000000000000000000000000000000000021](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000021) | [0x4200000000000000000000000000000000000020](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000020) |

You can read and write attestations in several ways:

- [EAS scan user interface (OP Mainnet)](https://optimism.easscan.org/)
- [EAS scan user interface (OP Goerli)](https://optimism-goerli-bedrock.easscan.org/)
- [JavaScript SDK](https://docs.attest.sh/docs/getting--started/javascript)
- [Access directly onchain](https://github.com/ethereum-attestation-service/eas-contracts/blob/master/contracts/EAS.sol) (if you need to attest from a smart contract)

Indexing is available via: 
- [GraphQL endpoint (OP Mainnet)](https://optimism.easscan.org/graphql)
- [GraphQL endpoint (OP Goerli)](https://optimism-goerli-bedrock.easscan.org/graphql)
- [Ponder graph]( https://github.com/ethereum-attestation-service/eas-ponder-graph)
- [Open source indexer]( https://github.com/ethereum-attestation-service/eas-indexing-service)

Relevant schemas:
- [RetroPGF badgeholders (0xfdcfdad2dbe7489e0ce56b260348b7f14e8365a8a325aef9834818c00d46b31b)](https://optimism.easscan.org/schema/view/0xfdcfdad2dbe7489e0ce56b260348b7f14e8365a8a325aef9834818c00d46b31b)
