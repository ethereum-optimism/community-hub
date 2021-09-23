---
title: Deploying to Mainnet
lang: en-US
---

# {{ $frontmatter.title }}

::: warning NOTICE
This page refers to the design of the current iteration of the Optimistic Ethereum protocol.
Details here are subject to change as the Optimistic Ethereum protocol evolves.
:::


## Whitelisting

We currently require addresses to be whitelisted before they can deploy onto the Optimistic Ethereum mainnet. To get the full rundown, 
[see our post on Medium](https://medium.com/ethereum-optimism/community-launch-7c9a2a9d3e84). Below is the current list of criteria required to be whitelisted for mainnet deployment.

## Requirements and Key Info

### Requirements

1. Carefully check through [the list of potentially breaking changes of the next upgrade](/docs/developers/l2/changeset.html) and ensure your contracts will not be affected
2. Deploy your contracts to our Optimistic Kovan test network
3. Verify each of these contracts on Optimistic Kovan Etherscan*
4. Fill out [the Whitelist application form](https://docs.google.com/forms/d/e/1FAIpQLSfBGsJN3nZQRLdMjqCS_svfQoPkn35o_cc4HUVnLlXN2BHmPw/viewform)
5. After the next Kovan regenesis, you must confirm that your Kovan deployment has remained fully functional

If you are whitelisted and deploy to Mainnet, you must:

1. Verify your contracts on Optimistic Etherscan - **YOU MUST VERIFY YOUR CONTRACTS ON ETHERSCAN OTHERWISE THEY WILL BE WIPED FROM THE CHAIN DURING THE NEXT UPGRADE.**
2. Share a link to a `deployments` folder or file that shares a mapping of each contract name to address on Optimistic Ethereum Mainnet
3. Alert us if you are looking to deploy contracts that were *not* included in the initial application form

*Note: If your protocol uses contracts that you *cannot* verify on Etherescan, they will be wiped from state in the next upgrade and you would have to re-deploy them.