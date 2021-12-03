---
title: Known Issues
lang: en-US
---

# {{ $frontmatter.title }}

## Issue #1852: Gas pricing discrepancy

### Issue Tracking

[https://github.com/ethereum-optimism/optimism/issues/1852](https://github.com/ethereum-optimism/optimism/issues/1852)

### Description

We're aware of an issue where certain opcodes are not being priced in the same way that they would be on Ethereum.
Specifically, opcodes that touch state (`SSTORE`, `SLOAD`, etc.) are being charged at the "cold" storage cost, even when the state has already been touched and therefore should be charged at the "warm" storage cost.
This can cause issues with some contracts.

For instance, [this transaction](https://optimistic.etherscan.io/tx/0x78c0f12607654237538599885a0c9c000dddfbacab3357687ccff7c69def1acc) triggers a [TransparentUpgradeableProxy](https://optimistic.etherscan.io/address/0xaf41a65f786339e7911f4acdad6bd49426f2dc6b#code) to make a withdrawal from the [pre-deployed WETH9 contract](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000006#code).
The WETH9 contract attempts to send ETH to the proxy contract with the following function call:

```solidity
msg.sender.transfer(wad);
```

[Solidity passes along a stipend of 2300 gas when you use the `msg.sender.transfer` and `msg.sender.send` functions to transfer someone ETH](https://docs.soliditylang.org/en/v0.8.10/security-considerations.html?highlight=transfer#sending-and-receiving-ether).
This transfer triggers a call to the proxy's fallback function, which then triggers a call to the implementation.
Normally these calls will both fit under the 2300 gas stipend because of the "warm" cost mechanism.
However, because Optimistic Ethereum is charging the "cold" cost in all cases, this call fails and the proxy is unable to withdraw from the WETH contract.

### Impact

Certain contract interactions that work on Ethereum may not work as expected on Optimistic Ethereum until this issue is fixed.
The most common failure case is a `msg.sender.transfer` to a proxy contract, as shown above.
You may find similar failures when making function calls to other contracts with a fixed amount of gas.

For instance, the following call that provides a fixed amount of gas could succeed on Ethereum but fail on Optimistic Ethereum because the target uses slightly more gas than expected:

```solidity
target.call{gas: 5000}("<your input data here>");
```

You should not be impacted if you do not provide a fixed amount of gas, as [Solidity will by default pass all available gas into the function call](https://docs.soliditylang.org/en/v0.8.10/units-and-global-variables.html#members-of-address-types).

You will be able to catch this failure by testing your contracts on Optimistic Kovan.
We highly recommend testing all contracts on Optimistic Kovan before deploying to the Optimistic Ethereum mainnet in order to catch this issue.

### Workarounds

Workarounds usually exist for this issue, but the exact workaround is typically dependent on the specifics of your contract.
Please feel free to hop into the `#dev-support` channel on the [Optimism discord](https://discord.optimism.io) for assistance if you run into this issue.

### Resolution

We're planning to deploy a release a fix for this issue in the near future.
Please keep an eye on the [GitHub issue](https://github.com/ethereum-optimism/optimism/issues/1852) for additional information and status updates.
