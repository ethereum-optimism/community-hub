---
title: Porting Existing Apps to OVM 1.0
lang: en-US
---

::: tip OVM 2.0 Release Dates
OVM 2.0 will be released October 14th on the Kovan test network,
and October 28th into the production Optimistic Ethereum network.
:::


# {{ $frontmatter.title }}

::: danger OVM 1.0 Page
This page refers to the **current** state of the Optimistic Ethereum
network. Some of the information may be relevant to OVM 2.0, which will
be deployed in October, but some of it may change.
:::


## Differences from L1 Ethereum

Optimistic Ethereum contracts are (currently) subject to a few limitations that don't exist on Ethereum
These limitations arise because contracts need to be executable under two circumstances:
1. In Optimistic Ethereum itself, for normal operations.
1. Inside a virtualized environment on the main Ethereum network in case of a [transaction result challenge](/docs/protocol/protocol.html#transaction-challenge-contracts).

During a transaction result challenge, a transaction is re-executed on L1 in order to check the result of the transaction on L2.
Certain opcodes like `CHAINID` and `TIMESTAMP` would cause this re-execution to produce completely different results.
This could result in a legitimate transaction result being considered invalid even if the result was completely correct.

Optimistic Ethereum circumvents this problem by using a slightly modified Solidity compiler.
Where the standard compiler produces those opcodes, the Optimistic version produces a call to a special contract (the "Execution Manager") that provides consistent behavior for these opcodes, whether we're running in L1 or L2.
[You can see the list of replaced opcodes here](/docs/protocol/evm-comparison.html#replaced-opcodes). 

As a result of the requirement that we have this modified compiler, there are a few key differences between the process of developing apps for Ethereum and for Optimistic Ethereum.
Here are the most important things to keep in mind.



### Solidity contracts

Contracts **must** currently be written in Solidity.
You must also use a Solidity version that has a corresponding modified compiler.
You can find a full list of supported versions [over on GitHub](https://github.com/ethereum-optimism/solc-bin/tree/gh-pages/bin).

We're actively exploring support for other languages (like Vyper) and alternative protocol designs that may obviate the need for the modified compiler entirely.

### Contract bytecode size

The contract code size limit on Optimistic Ethereum is the same [24 kB](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-170.md) limit as on Ethereum. 
However, the modified Solidity compiler replaces certain [opcodes](/docs/protocol/evm-comparison.html#replaced-opcodes) with contract calls (which take up a few bytes). 
This means that a contract that was close to the limit when compiled with normal Solidity might be over the limit with our version of the compiler. 

If you're finding that your contracts are exceeding the 24 kB limit, you should consider moving some of your code into [external libraries](https://docs.soliditylang.org/en/v0.8.6/contracts.html#libraries).

### Constructor parameters

Contracts must run through a static analysis that guarantees that they do not contain any [banned opcodes](/docs/protocol/evm-comparison.html#replaced-opcodes).
Under a few special circumstances, contract constructors can fail to pass this static analysis even though the rest of the contract is considered "safe".
As a result, users need to be careful when designing contracts with constructors.

Generally speaking, we encourage devs to follow these guidelines:
1. If you're able to change your inputs without breaking the contract, then you're *probably* fine when using constructors. You may have to try different input configurations until you find an input that passes the static analysis. For instance, if you're passing an `address` as an input, you may have to try multiple different addresses until you find one that works.
2. If you are *not* able to change your inputs without breaking the contract, then you should explicitly test the constructor with the inputs that you expect to provide. If you find that you are unable to pass the static analysis, you should consider using the [initializable](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable) pattern linked below.
3. If you're designing a contract *factory* system, you should be very careful about using constructors. You should almost definitely be using the initialaizable pattern instead.

#### Using the initializable pattern

You can sidestep these issues with constructors by using the [initializable](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable) contract pattern.
Instead of putting the initialization code in the constructor, put it in an externally accessible function that can only be called once by the contract's creator.

### Tests need to run on geth

Both Hardhat and Truffle allow you to run contract tests against their own implementations of the EVM.
However, to test contracts that run on Optimistic Ethereum you need to run them on a local copy of Optimistic Ethereum (which is built on top of [geth](https://geth.ethereum.org/)).

There are two issues involved in running your tests against a geth instance, 
rather than an EVM running inside your development environment:

1. Tests will take longer. For development purposes, Geth is quite a bit slower than the [Hardhat](https://hardhat.org) EVM or Truffle's [ganache](https://github.com/trufflesuite/ganache-cli). You will likely have to make more liberal use of [asynchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts) functions within your tests.
2. Both [Truffle](https://github.com/trufflesuite/ganache-cli#custom-methods) and [Hardhat](https://hardhat.org/hardhat-network/#special-testing-debugging-methods) support custom debugging methods such as `evm_snapshot` and `evm_revert`. You cannot use these methods in tests for Optimistic Ethereum contracts because they are not available in geth. Nor can you use [Hardhat's `console.log`](https://hardhat.org/tutorial/debugging-with-hardhat-network.html).


## Workflow

Roughly speaking, these are the steps you need to take to develop for Optimistic
Ethereum:

1. Develop the decentralized application normally, writing the contracts in Solidity
   and the user interface as you normally would.
1. [Create an Optimistic Ethereum development node](/docs/developers/l2/dev-node.html)
1. Compile for Optimistic Ethereum using a supported environment such as 
   [Hardhat](/docs/developers/l2/hardhat.html) or 
   [Truffle](/docs/developers/l2/truffle.html).
1. Run your tests on the Optimistic Ethereum development node you created.
1. Deploy your dapp to the [Optimistic 
   Kovan](/docs/infra/networks.html#optimistic-kovan) network and test it in that
   environment.
1. Upload and verify the contracts' source code on [Optimistic Kovan 
   Etherscan](https://kovan-optimistic.etherscan.io/verifyContract) 
1. [Ask to be added to the Optimistic Ethereum whitelist](https://docs.google.com/forms/d/e/1FAIpQLSfBGsJN3nZQRLdMjqCS_svfQoPkn35o_cc4HUVnLlXN2BHmPw/viewform)    
1. Once added, deploy your contracts to the 
   [Optimistic Ethereum](/docs/infra/networks.html#optimistic-ethereum) network. Then, upload and 
   verify your contracts' source code on [Optimistic Etherscan](https://optimistic.etherscan.io/verifyContract).
