---
title: Privileged Roles in Bedrock
lang: en-US
---

In our current state of decentralization, there are still some privileged roles in Bedrock. This document explains what they are, and why they exist.

## Hot wallets

These are addresses that *need* to have their private key online somewhere for a component of the system to work.

### Batcher
  
This is the component that submits new transaction batches.

- **Mainnet address**: [`0x6887246668a3b87F54DeB3b94Ba47a6f63F32985`](https://etherscan.io/address/0x6887246668a3b87F54DeB3b94Ba47a6f63F32985)
- **Goerli address**: [`0x7431310e026B69BFC676C0013E12A1A11411EEc9`](https://etherscan.io/address/0x7431310e026B69BFC676C0013E12A1A11411EEc9)


If this account is compromised, that would enable denial of service attacks against the rollup.


### Proposer
  
This is the component that submits new state roots for the L2 output. 

- **Mainnet address**: [`0x473300df21D047806A082244b417f96b32f13A33`](https://etherscan.io/address/0x473300df21D047806A082244b417f96b32f13A33)
- **Goerli address**: [`0x02b1786A85Ec3f71fBbBa46507780dB7cF9014f6`](https://goerli.etherscan.io/address/0x02b1786A85Ec3f71fBbBa46507780dB7cF9014f6)

If this account is compromised then we might have invalid output proposals that we need the [challenger](#challenger) to cancel. 
As long as we do it within seven days, the risk is minimalized.


## Cold wallets

These addresses are *cold*, meaning the private key is not on any device connected to the network, and cannot be used without human intervention.
On the Optimism mainnet these are usually multisig contracts, controlled by groups of community members.
On [OP Stack](https://stack.optimism.io) these wallets are set by default to the `ADMIN` account.
When you create a new OP Stack blockchain you specify them in [the deployment configuration JSON file](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/deploy-config/getting-started.json).


### MintManager Owner

On Optimism mainnet this account controls the [`MintManager`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/governance/MintManager.sol) that can mint new OP tokens.
On OP Stack it is usually meaningless.


| Address of | Goerli | Mainnet |
| - | - | - |
| Contract | [`0x038a8825A3C3B0c08d52Cc76E5E361953Cf6Dc76`](https://goerli.etherscan.io/address/0x038a8825A3C3B0c08d52Cc76E5E361953Cf6Dc76) | [`0x5c4e7ba1e219e47948e6e3f55019a647ba501005`](https://optimistic.etherscan.io/address/0x5c4e7ba1e219e47948e6e3f55019a647ba501005) 
| Owner | [`0x18394B52d3Cb931dfA76F63251919D051953413d`](https://goerli.etherscan.io/address/0x18394B52d3Cb931dfA76F63251919D051953413d) | [`0x2a82ae142b2e62cb7d10b55e323acb1cab663a26`](https://optimistic.etherscan.io/address/0x2a82ae142b2e62cb7d10b55e323acb1cab663a26) 


If access to this account is lost, there is no more ability to mint new OP tokens.
If access to this account is compromised, attackers can mint an endless supply of OP tokens.

### System Config Owner

This is the address authorized to change the settings in the [`SystemConfig`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/SystemConfig.sol) contract. 

- **Mainnet address**: [`0x9BA6e03D8B90dE867373Db8cF1A58d2F7F006b3A`](https://etherscan.io/address/0x9BA6e03D8B90dE867373Db8cF1A58d2F7F006b3A)
- **Goerli address**: [`0xAe851f927Ee40dE99aaBb7461C00f9622ab91d60`](https://goerli.etherscan.io/address/0xAe851f927Ee40dE99aaBb7461C00f9622ab91d60#readProxyContract)

If access to this account is lost, it would make it more difficult to modify the system configuration (not impossible, because we can upgrade the contract at the proxy). 
If access to this account is compromised, an attack can raise the gas markup and drain users' funds.


### Migration SystemDictator Controller

This is the address authorized to control [`SystemDictator`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/deployment/SystemDictator.sol), used for upgrades.
It can be used to perform an upgrade, and to revert out of one until a certain stage is reached.

- **Mainnet address**: [`0xB4453CEb33d2e67FA244A24acf2E50CEF31F53cB`](https://etherscan.io/address/0xB4453CEb33d2e67FA244A24acf2E50CEF31F53cB)
- **Goerli address**: [`0x1f0613A44c9a8ECE7B3A2e0CdBdF0F5B47A50971`](https://goerli.etherscan.io/address/0x1f0613A44c9a8ECE7B3A2e0CdBdF0F5B47A50971#readProxyContract)


If access to the owner is lost, or compromised, it can prevent upgrades. 


### Challenger

This is the address authorized to call [`deleteL2Outputs()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/L2OutputOracle.sol#L133-L167) to remove a faulty state commitment. 

Currently this is a multisig with trusted community members.
Eventually, once fault proofs are completed, it will be a contract that verifies challenges are correct.

- **Mainnet address**: [`0x9BA6e03D8B90dE867373Db8cF1A58d2F7F006b3A`](https://etherscan.io/address/0x9BA6e03D8B90dE867373Db8cF1A58d2F7F006b3A)
- **Goerli address:** [`0xBc1233d0C3e6B5d53Ab455cF65A6623F6dCd7e4f`](https://goerli.etherscan.io/address/0xBc1233d0C3e6B5d53Ab455cF65A6623F6dCd7e4f#readProxyContract)


If this account is compromised, an attacker could delay finalization by challenging valid states.
If this account is lost, it needs to be upgraded into a new value.
To do anything beyond slow down service, an attack would need to make sure challenger is not operational *and* control the Proposer.

### L1 ProxyAdmin Owner

This is the owner of most of the L1 contracts, which can upgrade them if necessary. 

- **Mainnet address**: [`0x9BA6e03D8B90dE867373Db8cF1A58d2F7F006b3A`](https://etherscan.io/address/0x9BA6e03D8B90dE867373Db8cF1A58d2F7F006b3A)
- **Goerli address:** [`0xBc1233d0C3e6B5d53Ab455cF65A6623F6dCd7e4f`](https://goerli.etherscan.io/address/0xBc1233d0C3e6B5d53Ab455cF65A6623F6dCd7e4f#readProxyContract)

If this account is compromised, there could be a catastrophic loss of funds, because it controls the bridge.
If access to this account is lost, we will not be able to upgrade in an emergency.

### L2 ProxyAdmin Owner

This is the owner of most of the L2 contracts, which can upgrade them if necessary.

- **Optimism address**: [`0x7871d1187a97cbbe40710ac119aa3d412944e4fe`](https://optimistic.etherscan.io/address/0x7871d1187a97cbbe40710ac119aa3d412944e4fe)
- **Optimistic Goerli address:** [`0xe534cca2753acfbcdbceb2291f596fc60495257e`](https://goerli-optimism.etherscan.io/address/0xe534cca2753acfbcdbceb2291f596fc60495257e)

If this account is compromised, there could be a catastrophic loss of funds, because it controls the bridge.
If access to this account is lost, we will not be able to upgrade in an emergency.


### Guardian

The `OptimismPortal` is pausable as a backup safety mechanism that allows a specific `GUARDIAN` address to temporarily halt deposits and withdrawals to mitigate security issues if necessary.

- **Mainnet address**: [`0x9BA6e03D8B90dE867373Db8cF1A58d2F7F006b3A`](https://etherscan.io/address/0x9BA6e03D8B90dE867373Db8cF1A58d2F7F006b3A)
- **Goerli address:** [`0xBc1233d0C3e6B5d53Ab455cF65A6623F6dCd7e4f`](https://goerli.etherscan.io/address/0xBc1233d0C3e6B5d53Ab455cF65A6623F6dCd7e4f#readProxyContract)