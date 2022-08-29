---
title: Node Providers
lang: en-US
---

## Alchemy

::: tip
**Alchemy is our preferred node provider, and is used to power our public endpoint.** In production systems, we _strongly_ recommend the Alchemy private endpoint - it's free, sign up [here](https://www.alchemy.com/layer2/optimism/?a=818c11a8da).
:::

### Alchemy's Description and pricing

[Alchemy](https://docs.alchemy.com/reference/optimism-api-quickstart/?a=818c11a8da) is a comprehensive Optimism development and infrastructure platform. 
It offers free access to (1) enhanced features like SDKs and enhanced APIs, and (2) its hosted Optimism nodes. 

(1) Alchemy's enhanced features

Alchemy's free private RPC endpoint provides a complimentary suite of custom tools. These include a custom-built Ethers.js SDK (which is a superset of the Ethers.js Provider library) and enhanced APIs such as NFT, Transfers, and Notify APIs.


(2) Alchemy's hosted Optimism nodes

Alchemy is industry-leading for its data accuracy, reliability, and scalability. Its large, free tier has a throughput of ~20k CUs / min, which is higher than that our public endpoint. This free tier also allows for 300M CUs per month. These CUs translates to about 12 million requests a month. The higher throughput is why we recommend using Alchemy to set up a private RPC endpoint (sign up [here](https://www.alchemy.com/layer2/optimism/?a=818c11a8da), it's free to use). 


### Alchemy's Supported Networks

- Optimism Ethereum
- Optimism Goerli

## Blast

### Description and pricing

[Blast](https://blastapi.io/) offers access to dedicated Optimism nodes with free data access up to 12M API calls per month and 25 req/s. Paid subscription tiers are available for all development needs.
On the platform, there are also [Public APIs](https://blastapi.io/public-api/optimism) available that can be added easily in Metamask.

### Supported Networks

- Optimism Ethereum

## BlockVision

[BlockVision](https://blockvision.org/) is a one-stop development platform and on-chain data retrieval portal for developers that boasts impressively low-latencies and high availability.

### Supported Networks

- Optimism Ethereum
- Optimism Kovan

## GetBlock

[GetBlock developer](https://getblock.io/en/nodes/optimism/) tools and valuable insights guarantee a simple and reliable API access to multiple blockchains.


### Supported Networks

- Optimism Ethereum
- Optimism Kovan


## Infura

### Description and pricing

[Infura](https://infura.io) offers access to hosted Optimism nodes via addon.
This addon is currently free but Infura seems to intend to charge $200/month for this addon in the future.

### Supported Networks

- Optimism Ethereum
- Optimism Goerli
- Optimism Kovan


## Pocket Network

### Description and pricing

[Pocket](https://www.portal.pokt.network/) offers access to a highly-available dedicated pool of Optimism nodes coordinated autonomously by the Pocket Network protocol. Through the Pocket Portal, developers may mint Optimism RPC endpoints with a generous free tier of 1M requests per day (per endpoint, max 2 per account).

### Supported Networks

- Optimism Ethereum


## QuickNode

### Description and pricing

[QuickNode](https://www.quicknode.com/) offers access to hosted Optimism nodes for $9/month at its cheapest tier.
You can select addons, like "Archive Mode" or "Trace Mode" for an additional cost.

### Supported Networks

- Optimism Ethereum
- Optimism Kovan
- Optimism Goerli



## Don't see your company here?

We try to keep this list up to date as we find out about more infrastructure providers who maintain Optimism nodes.
If you're a node provider and you'd like to be included in this list, please message us in our [Discord](https://discord-gateway.optimism.io) or [make a PR](https://github.com/ethereum-optimism/community-hub/pulls). 
