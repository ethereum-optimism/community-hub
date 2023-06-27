---
title: Protocol specs
lang: en-US
---



## Roadmap

Below is a brief summary of some of the planned [Optimism roadmap](https://www.optimism.io/about) releases.

## Next gen fault proofs

As part of the OVM 2.0 upgrade, the **Optimism fault proof mechanism had to be temporarily disabled**. This means that users of the OP Mainnet network currently need to trust the Sequencer node (run by Optimism Foundation) to publish valid state roots to Ethereum. **You can read more about our security model [here](../security-model/README.md)**. 

We're making progress on the upgrade fault proof mechanism and we expect to productionize our work in 2023. You can keep up with developments in the [Cannon repository](https://github.com/ethereum-optimism/cannon/).


## Decentralizing the sequencer

Currently, the Optimism Foundation runs the sole sequencer on OP Mainnet. This does not mean that Optimism can censor user transactions. However, it is still desirable to decentralize the sequencer over time, eliminating Optimism's role entirely so that anyone can participate in the network as a block producer.

The first step to decentralizing the sequencer is to still have one sequencer at a time, but rotate that sequencer with some frequency. The precise mechanic for sequencer rotation is not yet finalized, but will involve two components:

- an **economic mechanism** which creates a competitive market for sequencing, and redirects excess sequencer profits [towards protocol development](https://medium.com/ethereum-optimism/retroactive-public-goods-funding-33c9b7d00f0c).
- a **governance mechanism** which prevents sequencers from prioritizing short-term profits over the long-term health of the network.

After this, the next step is to support multiple concurrent sequencers. This can be simply achieved by adopting a standard BFT consensus protocol, as used by other L1 protocols and sidechains like Polygon and Cosmos.


You can keep up with the roadmap progress in [Cannon repository](https://github.com/ethereum-optimism/cannon/) for the fault proofs and [Optimism specs repository](https://github.com/ethereum-optimism/optimism/tree/develop/specs) for the overall protocol work.
