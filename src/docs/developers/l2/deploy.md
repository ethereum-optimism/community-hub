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

1. Carefully check through the list of potentially breaking changes of the next upgrade below and ensure your contracts will not be affected
2. Deploy your contracts to our Optimistic Kovan test network
3. Verify each of these contracts on Optimistic Kovan Etherscan*
4. Fill out the Whitelist application form
5. After the next Kovan regenesis, you must confirm that your Kovan deployment has remained fully functional

If you are whitelisted and deploy to Mainnet, you must:

1. Verify your contracts on Optimistic Etherscan - **YOU MUST VERIFY YOUR CONTRACTS ON ETHERSCAN OTHERWISE THEY WILL BE WIPED FROM THE CHAIN DURING THE NEXT UPGRADE.**
2. Share a link to a `deployments` folder or file that shares a mapping of each contract name to address on Optimistic Ethereum Mainnet
3. Alert us if you are looking to deploy contracts that were *not* included in the initial application form

*Note: If your protocol uses contracts that you *cannot* verify on Etherescan, they will be wiped from state in the next upgrade and you would have to re-deploy them.

### Key Info

1. There are multiple  "regenesis" upgrades scheduled over the coming months. You can track their dates and read up more on their implications here:

> During a regenesis, the state of the chain is snapshotted (including all user's nonces, token balances, contract code, and contract storage) and a new chain is spun up from that snapshot. This means that all historical transactions and logs will be inaccessible from the new chain, and the new chain will start from Block #0. The old chain data will not be accessible except under extreme circumstances.

Please ensure that your project can handle the downtime and wiping of chain history that will occur during a Regenesis

1. During the next regenesis (currently targeting October), we will have a series of breaking changes as a part of an upgrade to the OVM. Fundamentally, this will drastically reduce the differences between the OVM and EVM so that developers can implement their contracts with mostly just one target in mind, instead of managing OVM idiosyncrasies with separate contracts. Thus the changes can be viewed as a reversion to most things listed on this page [https://community.optimism.io/docs/protocol/evm-comparison.html](https://community.optimism.io/docs/protocol/evm-comparison.html). Here is the list of key breaking changes to watch for:
    1. ETH will no longer be an ERC20
        - Currently users can send and interact with ETH both as an ERC20 located at `0x4200000000000000000000000000000000000006` and as native ETH. After this upgrade, ETH can only be interacted with as native ETH (e.g. in `msg.value` and `payable` functions)
        - To best handle the upgrade, we recommend that projects do not use the ERC20 version of ETH at `0x4200000000000000000000000000000000000006` and instead interact with it as you would interact with ETH in your L1 Ethereum contracts.
    2. We will be re-compiling every verified contract with a different compiler.
        - This will break any usage of a hardcoded codehash because both the codehash and codesize of every verified contract will change post-upgrade
        - This may have implications for re-computing CREATE2'ed contract addresses.
        - Uniswap pools will be moved to their L1-equivalent addresses corresponding to CREATE2 with the new bytecode.  Do NOT use Uniswap pool addresses in storage; only use the getter from the factory.
    3. EOAs will no longer be contract wallets
        - Currently, every new EOA in Optimistic Ethereum deploys a proxy contract to that address, making every EOA a contract account.
        - After the upgrade, every known contract account will be reverted to an EOA with no code.
        - To best handle the upgrade, we recommend you write your contracts to handle normal EOAs and to make no assumptions around EOAs having code or additional OVM-specific functionality.
    4. Gas usage will decrease
        - The OVM usually results in an increase in gas usage because of compiled OVM opcodes, sometimes inflating gas costs by up to 10x the costs on L1 Ethereum.
        - With this OVM upgrade, gas usage on Optimistic Ethereum should now exactly match the expected gas usage from a deployment to L1 Ethereum in almost all cases.
    5. Know that the "unsupported opcodes in the OVM" will be added, but will return null/zero values
        - Certain opcodes not supported in the OVM such as `DIFFICULTY` `COINBASE` `BLOCKHASH` `GASPRICE` `SELFDESTRUCT` will be added to Optimistic Ethereum, but for now will just return null/zero values.
            - `DIFFICULTY` `COINBASE` and `GASPRICE` will return 0.
            - `BLOCKHASH` will return `0x0000000000000000000000000000000000000000000000000000000000000000`.
            - `SELFDESTRUCT` will do nothing for now.
        - Opcodes like `BASEFEE` will stay unsupported
        - This should not break any contracts deployed to the OVM, but is added functionality to watch for in the upgrade
