---
title: Data Transport Layer configuration
lang: en-US
---


::: tip OVM 2.0 Release Dates
OVM 2.0 is already released on the Kovan test network.
We expect to deploy it to the production Optimistic Ethereum network on November 11th.
:::

# {{ $frontmatter.title }}

## What is this?

The Data Transport Layer container reads blocks from an Ethereum
network (L1 or L2) and indexes them. 




In a [development node](../developers/l2/dev-node.md) 
it is used in several places:

- The `dtl` docker container, which copies data from L1 to L2
- 