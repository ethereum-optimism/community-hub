---
title: Converting applications for OE
lang: en-US
tags:
    - contracts
    - high-level
    - building
---

<!--
TODO:
* Figure out where to plug the tutorial
* Figure out where to mention the constructor args thing
* Should we go over gotchas here?
-->

# {{ $frontmatter.title }}

## Overview

Optimistic Ethereum is designed from the ground up to be (almost) identical to Ethereum (but cheaper).
If you've built an app on Ethereum before then you're more than equipped to deploy to OP.

## Writing Contracts

For various technical reasons that I've been too lazy to properly document, users can currently only (realistically) deploy applications to Optimistic Ethereum if they're written in Solidity.
This is because certain EVM opcodes are banned because they can be used to cause non-determinism during a transaction result challenge.
What's a transaction result challenge?
Great question, we really should be documenting these things.
In short, it's the mechanism by which we make sure that L2 smart contracts are as secure as L1 smart contracts.

Anyway, the point is: **certain opcodes can't be used** (for security reasons), so **we transform them into contract calls** to a special smart contract (the ["Execution Manager"](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/execution/OVM_ExecutionManager.sol)) that provides the functionality of those opcodes instead.
If you're interested, you can find a full list of the opcodes that we transform over on the [EVM/OVM comparison guide](../protocol/evm-comparison#replaced-opcodes).

We had a few options for how to tackle this transformation problem, but we stuck with one of the easiest: we built a *slight* [fork of the Solidity compiler](https://github.com/ethereum-optimism/solidity) that automatically handles these transformations when you're compiling your contracts.
As a result, the easiest (and pretty much the only) way to write contracts for OP right now is to use this modified version of the Solidity compiler.
Which means contracts have to be written in Solidity.

::: tip On support for different languages
Unless...

In theory, we can make the same modifications to the compilers for other langauges.
We haven't been able to do this yet because we're a relatively small team with a lot on our plates.
If this is something you'd like to help out with, please reach out to us on [discord](https://discord.optimism.io) and tell us!
Seriously, I'm not just shilling the discord again, we'd love to help make that a reality and discord is the best way to get in touch with us.
:::

We know this is kind of annoying (we're sorry Vyper devs 😞) but at least Solidity is pretty awesome.

Anyway, for now you'll have to make sure to use this fork of the compiler when you're compiling your contracts.
We've built some simple tools to try to make this process as painless as possible.
We'll go over the details of using these tools in the next few sections.
It sounds harder than it actually is.

::: tip On the compiler
Optimism's philosophy has always been to try to "minimize our diff" — to build the features we want with the least amount of code.
Less code means a smaller surface for potential issues, and L2 systems are the last place you want to have issues.
We had a few options for how to approach this problem but changing a few lines of code in the Solidity compiler really was one of the simplest.
We're actively working on ways to safely toss out the fork of the compiler.
We know it's a little annoying and we're thankful you're sticking it out with us.
:::

### Stuff you should know

#### Constructor arguments might be "unsafe"

Whenever a contract is deployed to an Optimistic Ethereum node it undergoes a process called "safety checking".
This step guarantees that all those blocked opcodes we talked about earlier were correctly transformed into calls to the "Execution Manager".
Unfortunately, there's no clear way to distinguish "data" from "code" inside of contract bytecode.
Under certain circumstances, **constructor arguments can actually be executable code**.

If your constructor arguments happen to be executable code and that executable code happens to contain invalid opcodes, you'll get an error that looks something like this:

```text
Contract creation code contains unsafe opcodes. Did you use the right compiler or pass an unsafe constructor argument?
```

<!-- TODO: explain what makes a constructor argument executable -->

This sort of error is most common when using constructor arguments that contain a lot of "random" bytes (like contract addresses).
**We recommend using a separate initialization function if you're running into this problem.**

::: tip EIP-2327: BEGINDATA
Please consider voicing your support for [EIP-2327](https://eips.ethereum.org/EIPS/eip-2327).
This EIP would introduce a new opcode (`BEGINDATA`) that would make it possible for us to tell the difference between code and constructor arguments.
You can view a longer-form discussion of the EIP on the [Fellowship of Ethereum Magicians forum](https://ethereum-magicians.org/t/new-opcode-begindata/3727).
:::

#### Compiler increases bytecode size by about 25%

Because of the way we transform certain opcodes into contract calls, **our fork of the Solidity compiler will produce larger bytecode than the standard compiler.**
This is important because Optimistic Ethereum (just like Ethereum) caps contracts at 24kb [because of EIP-170](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-170.md#specification).
**Contracts that originally compile under the limit may be larger than 24kb when compiled using our fork of the Solidity compiler.**
As a result, you may have to break existing contracts out into slightly smaller pieces.

Although the exact size increase depends on the contents of the contract, we've found that, **on average, the compiler increases bytecode size by about 25%**.
This means that if your contract is smaller than ~20kb when compiled with the standard Solidity compiler it *should* be ok when compiled with our fork.

## Compiling Contracts

You need to compile contracts when you deploy them to Ethereum.
And you also need to compile them when you deploy to Optimistic Ethereum.
Ez.

Because of the custom compiler, this step of the development process is the biggest departure from the standard Ethereum development flow.
Depending on your development environment, you're probably going to have to make a few tweaks in order to be able to compile contracts with our fork of the compiler.

Lucky for you, we wrote some example projects that explain how to use this custom compiler for some popular Ethereum development frameworks.
We currently maintain example project repositories for:

* [hardhat](https://github.com/ethereum-optimism/optimism/tree/regenesis/0.4.0/examples/hardhat)
* [truffle](https://github.com/ethereum-optimism/optimism/tree/regenesis/0.4.0/examples/truffle)
* [ethers + waffle](https://github.com/ethereum-optimism/optimism/tree/regenesis/0.4.0/examples/waffle)

If you'd like to try to integrate this compiler into other development frameworks, you can [download our emscripten compiler builds](https://github.com/ethereum-optimism/solc-bin) or [build the compiler from source yourself](https://github.com/ethereum-optimism/solidity#build-and-install).

::: tip Other development frameworks
Do you use or maintain a development framework that isn't listed above?
We'd love to hear from you.
We'd be more than happy to help integrate this fork of the compiler into your framework.
Or we could pay someone to integrate it.
Or we could even pay *you* to integrate it.
I don't know.
We'll figure it out.
Point is: ping us on [discord](https://discord.optimism.io) and let us know how we can help.
:::

## Testing Contracts

You should test your contracts before you deploy them.
You don't technically *have* to do this, but you definitely *should* do this.
Luckily, the process of testing contracts on Optimistic Ethereum is identical to the testing process on Ethereum.

Here are the basic steps:

1. [Run a local Optimistic Ethereum node](https://github.com/ethereum-optimism/optimism/#quickstart)
1. [Write some tests in JavaScript or whatever](https://github.com/ethereum-optimism/optimism/blob/regenesis/0.4.0/examples/hardhat/test/erc20.test.js)
1. Run your tests against your local node.

By running your tests against a local version of Optimistic Ethereum, you can be confident that your contracts are going to behave correctly on testnet (and eventually mainnet).
Our local Optimistic Ethereum node setup also spins up an Ethereum node on `localhost:9545` so that you easily [build and test applications that communicate between Layer 1 and Layer 2](https://github.com/ethereum-optimism/optimism/tree/regenesis/0.4.0/examples/l1-l2-deposit-withdrawal).

### Common Gotchas

#### Using the wrong chain ID

If you're getting an error when sending transactions, **please make sure that you're using the right chain ID**.
The chain ID for the local Optimistic Ethereum node is `420`.

#### Need ETH to pay for transactions on your local node

Our local Optimistic Ethereum node setup will try to charge you transaction fees (like you might expect).
**You can bypass the need to pay fees locally by attaching `gasPrice: 0` to your transactions.**

Alternatively, you can [take a look at how we fund accounts on L2 in our integration tests](https://github.com/ethereum-optimism/optimism/blob/68871b7a9e0989a7b126e800ab1b6b19edab2293/integration-tests/test/shared/utils.ts#L90-L101) for some inspiration for how to do this in your own tests.
If you want to deploy a contract to testnet, you'll need to use our [ETH Gateway](https://gateway.optimism.io/) to deposit some ETH into the L2 system (more on that in a second).

#### Still seeing the same bug after a patch or new release

**We frequently update our software and corresponding docker images.**
If you reported a bug and we merged a pull request to fix it but you're still seeing the same issue, make sure to update and rebuild your local Optimistic Ethereum setup before opening up another issue:

```sh
cd optimism
git fetch
git checkout develop
git pull origin develop
yarn clean
yarn build
cd ops
docker-compose down -v
docker-compose build --parallel
```

#### Running out of gas but receipt says you didn't use the full gas limit

Because of some technical reasons that are hard to explain here, **the maximum amount of gas you can have available to your transaction is about ~1,000,000 gas *below* the block gas limit**.
If the block gas limit is 9,000,000 and you try to send a transaction with 9,000,000 gas, you'll actually only get to use about ~8,000,000 gas.
The exact amount that you'll be able to use depends on the amount of data that you send along with your transaction (more data means slightly less gas available).
