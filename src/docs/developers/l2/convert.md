---
title: Converting Applications to Optimistic Ethereum
lang: en-US
---

# {{ $frontmatter.title }}

Optimistic Ethereum contracts are subject to a few limitations, because they need to
be able to run in two separate environments:

- In Optimistic Ethereum itself, for normal operations.
- Inside a virtualized environment on the main Ethereum network in case of a
  [transaction challenge](/docs/protocol/protocol.html#transaction-challenge-contracts).

The issue is that even if the state of the contract is identical, certain 
opcodes such as `CHAINID` and `TIMESTAMP` produce different results. This could
result in a legitimate transaction result being challenged, and the challenge producing
a different result.

Optimistic Ethereum gets around this problem by using a slightly modified Solidity
compiler. Where the standard compiler produces those opcodes, the Optimistic version
produces a call to a different contract that provides consistent information, whether
we are running in L1 or L2. [You can see the list of replaced opcodes 
here](/docs/protocol/evm-comparison.html#replaced-opcodes). 

Because of this issue, and due to the fact the tests have to run on geth, there are a 
few differences between developing contracts for L1 and developing them of Optimistic Ethereum:


## Solidity Contracts
Contracts have to be written in Solidity, in a version that already has 
a modified compiler ([see the supported versions 
here](https://github.com/ethereum-optimism/solc-bin/tree/gh-pages/bin)).
This lets you use your existing Solidity development skills, and maybe
even the same contracts you use on L1.



## Contract Bytecode Size

The length limit is still 
[24 kB](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-170.md). 
However, we are replacing 
[opcodes](/docs/protocol/evm-comparison.html#replaced-opcodes), which 
are one byte long each, with contract calls which require multiple opcodes. 
This means that a contract that was close to the limit when compiled with
normal Solidity might be over the limit with our version of the compiler. 

To solve this, remember that the 24 kB limit is *per contract*. If you need more you 
can always move some of your code to 
[a library](https://docs.soliditylang.org/en/v0.8.6/contracts.html#libraries),
which means that code would be placed in a different contract. 


## Constructor Parameters

Constructor parameters are discouraged. They are a problem because of the 
interaction of two factors:
- Optimistic Ethereum has to check that code running on the L2 chain
  does not contain any of the problem opcodes. As this is a security check, it
  has to be done by a contract on the blockchain.
- Contracts can have 
  [constructors](https://docs.soliditylang.org/en/v0.8.6/contracts.html). However, as
  there is no other mechanism to provide constructors with parameters, their 
  parameters are provided as part of the constructor code.

The problem is that Optimistic Ethereum has no way to distinguish between code,
where having certain opcodes is a problem, and the constructor parameters where
those same bytes could exist innocently. As a result, if it sees such values it
rejects the constructor.

The solution is to use 
[Initializable](
https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable) contracts.
Instead of putting the initialization code in the constructor, put it in an externally
accessible function that can only be called once by the contract's creator.

## Tests Have to Run on Geth

Both Hardhat and Truffle allow you to run contract tests against their own 
implementations of the EVM. However, to test contracts that run on Optimistic
Ethereum you need to run them on a local copy of Optimistic Ethereum, which uses
[geth](https://geth.ethereum.org/). 
   
There are two issues involved in running your tests against a geth instance, 
rather than an EVM running inside your development environment:

- Calls take longer, because they require inter-process communication (at least) and
  therefore you might get a [`Promise` 
  object](https://www.w3schools.com/js/js_promise.asp) that isn't resolved yet. You
  have to write your tests to be 
  [asynchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts).

  To cause the test to wait until the actual result is attained, put `await` before 
  the call. If you are defining functions, define them with the `async` keyword. [You 
  can read more about this here](https://www.w3schools.com/js/js_async.asp). 

  ::: tip  
  When you send a transaction there are actually two promises involved. The first
  is for the network access to submit the transaction (which could take a non-trivial
  amount of time). The second is for getting the transaction receipt. The proper
  syntax to use to get the receipt of a transaction is:

  ```javascript
  (await  <contract>.<function>(<parameters>)).wait()
  ```
  :::

- Both [Truffle's Ganache](https://github.com/trufflesuite/ganache-cli#custom-methods)
  and [Hardhat](https://hardhat.org/hardhat-network/#special-testing-debugging-methods)
  support custom debugging methods such as `evm_snapshot` and `evm_revert`. You 
  cannot use these methods in tests for Optimistic Ethereum contracts because they 
  are not available in geth. Nor can you use [Hardhat's 
  `console.log`](https://hardhat.org/tutorial/debugging-with-hardhat-network.html).
