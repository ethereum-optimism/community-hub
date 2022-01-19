---
title: Protocol specs
lang: en-US
---

# {{ $frontmatter.title }}

With the OVM 2.0 upgrade, which happened on November 11th, 2021, the Optimism protocol went through its biggest upgrade to date. The primary focus of this upgrade was [EVM Equivalence](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306), a new design for Optimism that brought it close to 1:1 parity with Ethereum.

::: tip NOTICE
As part of the OVM 2.0 upgrade, the Optimism fault proof mechanism had to be temporarily disabled. This means that users of the Optimism network currently need to trust the Sequencer node (run by Optimism PBC) to publish valid state roots to Ethereum.
:::

## Ongoing Protocol work
The fault proof mechanism and overall protocol specifications are currently undergoing major developments. You can keep up with the progress in [Cannon repository](https://github.com/ethereum-optimism/cannon/) and [Optimism specs repository](https://github.com/ethereum-optimism/optimistic-specs).

For a high level overview of the current protocol version, see ['How Optimism works'](../how-optimism-works/) section.