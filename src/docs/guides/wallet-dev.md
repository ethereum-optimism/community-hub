---
title: Supporting Optimism in your wallet
lang: en-US
---

This guide teaches you how to connect your wallet to Optimism. Overall Optimism behaves like any over EVM chain, with the exception of [transaction fees](#transaction-fees). Those are different and you have to write custom code for them.

## Handling multiple chains

There are two ways for a wallet to handle being connected to multiple chains:

1. Connect to one chain at a time, the way MetaMask does it. Let the user switch chains either from your user interface, or through a dapp.

   ![Metamask with the chain menu](../../assets/docs/guides/wallet-dev/chains-metamask.png)

1. Connect to all chains all the time, the way Coinbase Wallet does it. Display ETH and token balances on all chains, and ask which chain to use when connecting to a dapp.

   ![Coinbase Wallet shows all the chains at the same time](../../assets/docs/guides/wallet-dev/chains-coinbase.png)

### Switching chains

A user can add or switch into a chain using either the wallet or a dapp.To enable switching on a dapp, the wallet needs to handle these requests:

- [`wallet_addEthereumChain`](https://eips.ethereum.org/EIPS/eip-3085)
- [`wallet_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-3326)


## Connecting to Optimism

You connect to Optimism the same way you do to Ethereum, by connecting to a JSON RPC endpoint. However, the currently supported fork for Optimism is [Berlin](https://eth.wiki/roadmap/berlin), not [London](https://eth.wiki/roadmap/london), so EIP-1559 transactions are not supported yet.

### Endpoints

[Click here for the Optimism endpoints](../useful-tools/networks.md). You can choose between our public endpoints, which are rate limited, and [endpoints from infrastructure providers](../useful-tools/networks.md#rpc-endpoints).

### Token addresses

The ERC-20 contract address for a token on Optimism may be different from the address for the same token on Ethereum. [The list of tokens and their addresses is here](https://static.optimism.io/optimism.tokenlist.json). You can see the same list with a user interface [here](https://tokenlists.org/token-list?url=https://static.optimism.io/optimism.tokenlist.json).

For example, looking at the **SNX** token, we get these addresses:

| ChainID | Network | Address |
| -: | - | - |
| 1  | Ethereum    | 0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f |
| 10 | Optimism    | 0x8700daec35af8ff88c16bdf0418774cb3d7599b4
| 42 | Kovan (test network) | 0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f
| 69 | Optimistic Kovan (test network) | 0x0064A673267696049938AA47595dD0B3C2e705A1

To get the total SNX balance of a user that uses Optimism you need to:

1. Connect to a standard Ethereum endpoint and send a `balanceOf` query to address `0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f`.
1. Connect to an Optimism endpoint and send a `balanceOf` query to address `0x8700daec35af8ff88c16bdf0418774cb3d7599b4`.

### Transaction status

A transaction in Optimism can be in one of three states:

- **Sequencer Confirmed**: The transaction has been accepted by the Optimism sequencer on L2
- **Confirmed On-Chain**: The transaction has been written to Ethereum (L1). In that case of an L2->L1 transaction, this starts the seven day period until it can be finalized
- **Finalized On-Chain**: This status is only application for L2->L1 transactions, and means that the transaction was finalized on L1 after the seven day verification period has passed.

For now, we recommend wallets consider transactions final after they are Sequencer confirmed as there are no reorgs on the chain and there is currently not standard tooling for tracking when transactions are confirmed on chain. We have a JS SDK coming soon that will contain standard tooling to track these three states of each transaction

## Differences from Ethereum

We aim to be [EVM equivalent](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306), meaning we aim to minimize the differences between Optimism and Ethereum. You can see a summary of the few differences between Optimism and Ethereum [here](../developers/build/differences.md). These are the differences that are most relevant to wallet developers:

### Transaction fees

**Most of the transaction fee of an Optimism transaction is not the gas consumed by the transaction itself (which is priced at 0.001 gwei when the chain is not congested), but the transaction fee writing the transaction in Ethereum. That fee is deducted automatically from the user's ETH balance on Optimism.**

[You can read more about this subject here](../developers/build/transaction-fees.md). The relevant code sample is [here](../developers/build/transaction-fees.md#displaying-fees-to-users). Typically, 95% of the work to integrate Optimism to a wallet is to make sure that users are displayed the correct transaction fee.



### JSON RPC differences

[See here](../developers/build/json-rpc.md).
