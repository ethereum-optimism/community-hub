---
title: Adding OP Mainnet to your centralized exchange
lang: en-US
---

## Connecting to OP Mainnet

You connect to OP Mainnet the same way you do to Ethereum, by connecting to a JSON RPC endpoint.

### Endpoints

[Click here for the OP Mainnet endpoints](../useful-tools/networks.md). You can choose between our public endpoints, which are rate limited, and [endpoints from infrastructure providers](../useful-tools/networks.md). Given rate throughput limits, we recommend using a private rpc provider for both mainnet and testnet use cases. 

### ETH balance

ETH is used precisely the way it is used in L1 Ethereum.

### Token addresses

The ERC-20 contract address for a token on OP Mainnet may be different from the address for the same token on Ethereum. [The list of tokens and their addresses is here](https://static.optimism.io/optimism.tokenlist.json).

For example, looking at the **SNX** token, we get these addresses:

| ChainID | Network | Address |
| -: | - | - |
| 1  | Ethereum    | 0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f |
| 10 | OP Mainnet    | 0x8700daec35af8ff88c16bdf0418774cb3d7599b4
| 5 | Goerli (test network) | 0x51f44ca59b867E005e48FA573Cb8df83FC7f7597
| 420 | OP Goerli (test network) | 0x2E5ED97596a8368EB9E44B1f3F25B2E813845303

To get the total SNX balance of a user that uses OP Mainnet you need to:

1. Connect to a standard Ethereum endpoint and send a `balanceOf` query to address `0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f`.
1. Connect to an OP Mainnet endpoint and send a `balanceOf` query to address `0x8700daec35af8ff88c16bdf0418774cb3d7599b4`.


## Deposits and withdrawals within OP Mainnet

The ERC-20 contracts on OP Mainnet function the same way they do on Ethereum, so you can use your existing code for withdrawals and deposits. Just connect to an OP Mainnet endpoint.


### Transaction fees

Most of the cost of an OP Mainnet transaction is not the gas consumed by the transaction itself (which is rarely above 0.001 gwei per gas), but the cost of writing the transaction in Ethereum. That cost is deducted automatically from the user's balance on OP Mainnet. If you charge your users the cost of withdrawals, you have to account for it.

[You can read more about this subject here](../developers/build/transaction-fees.md).
The relevant code is [here](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/sdk-estimate-gas).


## Deposits and withdrawals across chains

As a centralized exchange, there will be times that withdrawals of ETH or an ERC-20 token on either OP Mainnet or Ethereum exceed deposits and you need to transfer assets. 
To do that you use a bridge or a gateway. 
We have a [standard gateway](https://app.optimism.io/bridge) that receives assets on L1 (Ethereum mainnet), and mints the equivalent asset on OP Mainnet. 
When a user wants to withdraw the assets back to L1, the bridge burns the asset on L2 and releases it to the user on L1. If you want to use this gateway automatically, [follow this tutorial for ETH](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/cross-dom-bridge-eth) or [this one for ERC-20 tokens](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/cross-dom-bridge-erc20).

Note that while L1 to L2 transactions typically take minutes, L2 to L1 transaction on the gateway require [a seven day challenge period](https://help.optimism.io/hc/en-us/articles/4411895558171-Why-do-I-need-to-wait-a-week-when-moving-assets-out-of-Optimism-).

Alternatively, you can use a [third party bridge](https://www.optimism.io/apps/bridges). These bridges usually rely on liquidity pools to allow for faster withdrawals and support multiple L2 chains. However, their token selection might be more limited and they may not be as decentralized as our gateway.

When an ERC-20 token does not have an OP Mainnet equivalent you can create one. 
If there is no need for custom business logic, you can [follow the steps in this tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/standard-bridge-standard-token).
If you need to implement some kind of custom logic, [see this tutorial](https://github.com/ethereum-optimism/optimism-tutorial/tree/main/standard-bridge-custom-token).


## Audit reports

For a full list of audit reports visit [GitHub](https://github.com/ethereum-optimism/optimism/tree/develop/technical-documents/security-reviews). 
