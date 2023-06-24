---
title: AttestationStation v1 
lang: en-US
---

The AttestationStation v1 uses [the Ethereum Attestation service standard](https://docs.attest.sh/docs/welcome) deployed on these addresses:

| Network         | Attestation Contract | Schema Registry Contract |
| --------------- | - | - |
| OP Goerli | [0x1a5650d0ecbca349dd84bafa85790e3e6955eb84](https://goerli-optimism.etherscan.io/address/0x1a5650d0ecbca349dd84bafa85790e3e6955eb84) | [0x7b24c7f8af365b4e308b6acb0a7dfc85d034cb3f](https://goerli-optimism.etherscan.io/address/0x7b24c7f8af365b4e308b6acb0a7dfc85d034cb3f)
| OP Mainnet | To be announced | To be announced |

You can read and write attestations in several ways:

- [EAS scan user interface](https://optimism-goerli.easscan.org/)
- [JavaScript SDK](https://docs.attest.sh/docs/getting--started/javascript)
- [Access directly onchain](https://github.com/ethereum-attestation-service/eas-contracts/blob/master/contracts/EAS.sol) (if you need to attest from a smart contract)

Indexing is available via: 
- [GraphQL endpoint](https://optimism-goerli.easscan.org/graphql)
- [Ponder graph]( https://github.com/ethereum-attestation-service/eas-ponder-graph)
- [Open source indexer]( https://github.com/ethereum-attestation-service/eas-indexing-service)
