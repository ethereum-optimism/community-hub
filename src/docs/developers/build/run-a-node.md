---
title: Running a testnet or mainnet node
lang: en-US
---

If you're looking to build an app on Optimism you'll need access to an Optimism node.
Various [infrastructure providers](https://www.optimism.io/apps/tools) exist that can give you access to hosted nodes.
However, you might be interested in running your very own Optimism node.
Here we'll go over the process of running a testnet or mainnet Optimism node for yourself.

## Upgrades

If you run a node you need to subscribe to [an update feed](../releases.md) (either [the mailing list](https://groups.google.com/a/optimism.io/g/optimism-announce) or [the RSS feed](https://changelog.optimism.io/feed.xml)) to know when to upgrade. 
Otherwise, your node will eventually stop working.

## Prerequisites

You'll need to have the following installed:

1. [Docker](https://www.docker.com/)
1. [Docker compose](https://docs.docker.com/compose/install/)

## Configuring and running the node

Simply follow the instructions available at [this repository](https://github.com/optimisticben/op-replica/) to build and run the node.
