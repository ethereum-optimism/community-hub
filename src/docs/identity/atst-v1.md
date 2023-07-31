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

- [EAS scan user interface](https://optimism-goerli.easscan.org/)
- [JavaScript SDK](https://docs.attest.sh/docs/getting--started/javascript)
- [Access directly onchain](https://github.com/ethereum-attestation-service/eas-contracts/blob/master/contracts/EAS.sol) (if you need to attest from a smart contract)

Indexing is available via: 
- [GraphQL endpoint](https://optimism-goerli.easscan.org/graphql)
- [Ponder graph]( https://github.com/ethereum-attestation-service/eas-ponder-graph)
- [Open source indexer]( https://github.com/ethereum-attestation-service/eas-indexing-service)
