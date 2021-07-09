---
title: Bridging L1 and L2
lang: en-US
---

# {{ $frontmatter.title }}

::: tip Work in Progress™
Our documentation is a rapidly improving work in progress. If you have questions or feel like something is missing feel free to ask in our [Discord server](https://discord.optimism.io) where we (and our awesome community) are actively responding, or [open an issue](https://github.com/ethereum-optimism/community-hub/issues) in the GitHub repo for this site.
:::

Apps on Optimistic Ethereum can be made to interact with apps on Ethereum via a process called "bridging".
In a nutshell, **contracts on Optimistic Ethereum can send messages to contracts on Ethereum, and vice versa**.
With just a little bit of elbow grease, you too can create contracts that bridge the gap between Layer 1 and Layer 2!

## Understanding Contract Calls

In order to understand the process of creating bridges between contracts on Layer 1 and Layer 2, you should first have a basic understanding of the way contracts on *Ethereum* communicate with one another.
If you're a smart contract developer, you might be familiar with stuff like this:

```solidity
contract MyContract {
    doSomething(uint256 myFunctionParam) public {
        // ... some sort of code goes here
    }
}

contract MyOtherContract {
    function doTheThing(address myContractAddress, uint256 myFunctionParam) public {
        MyContract(myContractAddress).doSomething(myFunctionParam);
    }
}
```

Here, `MyOtherContract.doTheThing` triggers a "call" to `MyContract.toSomething`.
A "call" is defined by a few key input parameters, mainly a `target address` and some `calldata`.
In this specific example, the `target address` is going to be the address of our instance of `MyContract`.
The `calldata`, on the other hand, depends on the function we're trying to call.
Solidity uses an encoding scheme called [Contract ABI](https://docs.soliditylang.org/en/v0.8.4/abi-spec.html) to both [select which function to call](https://docs.soliditylang.org/en/v0.8.4/abi-spec.html#function-selector) and to [encode function input arguments](https://docs.soliditylang.org/en/v0.8.4/abi-spec.html#argument-encoding).

Solidity gives us some useful tools to perform this same encoding manually.
For the sake of learning, let's take a look at how we can duplicate the same code with a manual encoding:

```solidity
contract MyContract {
    doSomething() public {
        // ... some sort of code goes here
    }
}

contract MyOtherContract {
    function doTheThing(address myContractAddress, uint256 myFunctionParam) public {
        myContractAddress.call(
            abi.encodeWithSignature(
                "doSomething(uint256)",
                myFunctionParam
            )
        );
    }
}
```

Here we're using the [low-level "call" function](https://docs.soliditylang.org/en/v0.8.4/units-and-global-variables.html#members-of-address-types) and one of the [ABI encoding functions built into Solidity](https://docs.soliditylang.org/en/v0.8.4/units-and-global-variables.html#abi-encoding-and-decoding-functions).
Although these two code snippets look a bit different, they're actually functionally identical.

## L1 ⇔ L2 Communication Basics

Cool!
Now that you have a general idea of how contracts on Ethereum interact with one another, let's take a look at how we do the same thing *between* Optimistic Ethereum and Ethereum.

At a high level, this process is pretty similar to the same process for two contracts on Ethereum (with a few caveats).
**Communication between L1 and L2 is enabled by two special smart contracts called the "messengers"**.
Each layer has its own messenger contract which serves to abstract away some lower-level communication details, a lot like how HTTP libraries abstract away physical network connections.

We won't get into *too* much detail about these contracts here — the only thing you really need to know about is the `sendMessage` function attached to each messenger:

```solidity
function sendMessage(
    address _target,
    bytes memory _message,
    uint32 _gasLimit
) public;
```

Look familiar?
It's the same as that `call` function we used earlier.
We have an extra `_gasLimit` field here, but `call` has that too.
This is basically equivalent to:

```solidity
address(_target).call{gas: _gasLimit}(_message);
```

Except, of course, that we're calling a contract on a completely different network!

We're glossing over a lot of the technical details that make this whole thing work under the hood but whatever.
Point is, it works!
Want to call a contract on Optimistic Ethereum from a contract on Ethereum?
It's dead simple:

```solidity
// Pretend this is on L2
contract MyOptimisticContract {
    doSomething() public {
        // ... some sort of code goes here
    }
}

// And pretend this is on L1
contract MyOtherContract {
    function doTheThing(address myOptimisticContractAddress, uint256 myFunctionParam) public {
        ovmL1CrossDomainMessenger.sendMessage(
            myOptimisticContractAddress,
            abi.encodeWithSignature(
                "doSomething(uint256)",
                myFunctionParam
            ),
            1000000 // use whatever gas limit you want
        )
    }
}
```

::: tip Using the messenger contracts
These messenger contracts, the [`OVM_L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/messaging/OVM_L1CrossDomainMessenger.sol) and [`OVM_L2CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/messaging/OVM_L2CrossDomainMessenger.sol), always come pre-deployed to each of our networks.
You can find the exact addresses of these contracts on our various deployments [inside of the Optimism monorepo](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/deployments/README.md).
:::

<!-- TODO: add this page to our docs too -->

### Caveats

Of course, all the best things in life come with asterisks.
Let's take a look at the things you should keep in mind when you use these contracts.

#### Communication is *not* instantaneous

Calls between two contracts on Ethereum happen synchronously and atomically within the same transaction.
That is, you'll be told about the result of the call right away.
Calls between contracts on Optimistic Ethereum and Ethereum happen *asynchronously*.
If you want to know about the result of the call, you'll have to wait for the other contract send a message back to you.

<!-- TODO: do we need an example here? -->

#### Accessing `msg.sender`

Contracts frequently make use of `msg.sender` to make decisions based on the calling account.
For example, many contracts will use the [Ownable](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol) pattern to selectively restrict access to certain functions.
Because messages are essentially shuttled between L1 and L2 by the messenger contracts, **the `msg.sender` you'll see when receiving one of these messages will be the messenger contract** corresponding to the layer you're on.

In order to get around this, we added a `xDomainMessageSender` function to each messenger:

```solidity
function xDomainMessageSender() public returns (address);
```

If your contract has been called by one of the messenger contracts, you can use this function to see who's *actually* sending this message.
Here's how you might implement an `onlyOwner` modifier on L2:

```solidity
modifier onlyOwner() {
    require(
        msg.sender == address(ovmL2CrossDomainMessenger)
        && ovmL2CrossDomainMessenger.xDomainMessageSender() == owner
    );
    _;
}
```

## Understanding the Fraud Proof Window

One of the most important things to understand about L1 ⇔ L2 interaction is that **messages sent from Layer 2 to Layer 1 cannot be relayed for at least one week**.
This means that any messages you send from Layer 2 will only be received on Layer 1 after this one week period has elapsed.
We call this period of time the "fraud proof window" because it's a result of one of the core security mechanisms of the Optimistic Rollup: the fraud proof.

<!-- TODO: full page on fraud proofs? -->

Optimistic Rollups are "optimistic" because they're based around the idea of publishing the *result* of a transaction to Ethereum without actually executing the transaction on Ethereum.
In the "optimistic" case, this transaction result is correct and we can completely avoid the need to perform complicated (and expensive) logic on Ethereum.
Cheap transactions, yay!

However, we still need some way to prevent incorrect transaction results from being published in place of correct ones.
Here's where the "fraud proof" comes into play.
Whenever a transaction result is published, it's considered "pending" for a period of time known as the fraud proof window.
During this period of time, anyone may re-execute the transaction *on Ethereum* in an attempt to demonstrate that the published result was incorrect.

If someone performs this fraud proof, then the result is scrubbed from existence and anyone can publish another result in its place (hopefully the correct one this time, financial punishments make incorrect results *very* costly for their publishers).
Once the window for a given transaction result has fully passed without a challenge the result can be considered fully valid (or else someone would've challenged it).

Anyway, the point here is that **you don't want to be making decisions about Layer 2 transaction results from inside a smart contract on Layer 1 until this fraud proof window has elapsed**.
Otherwise you might be making decisions based on an invalid transaction result.
As a result, L2 ⇒ L1 messages sent using the standard messenger contracts cannot be relayed until they've waited out the full fraud proof window.

::: tip On the length of the fraud proof window
We've set the fraud proof window to be exactly seven days on the `optimistic-ethereum` mainnet.
We believe this is a reasonable balance between security and usability, with an emphasis on increased security to start.
We're open to changing the length of the window as long as we feel this can be done without significantly reducing the security of the system.
If you're strongly opinionated about this, we recommend [opening an issue on GitHub](https://github.com/ethereum-optimism/optimism/issues) explaining your position.
We *will* hear you out!
:::

## Token Bridges

Certain interactions, like transferring ETH and ERC20 tokens between the two networks, are common enough that we've built some standard bridge contracts you can make use of.

### The Standard™ Bridge

The Standard Bridge simplifies the process of moving ETH and ERC20 tokens between Optimistic Ethereum and Ethereum and consists of two contracts: [`OVM_L1StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/tokens/OVM_L1StandardBridge.sol) (for Layer 1) and  [`OVM_L2StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/tokens/OVM_L2StandardBridge.sol) (for Layer 2) where it is also a [predeploy](../protocol/protocol.md#predeployed-contracts).

For an L1/L2 token pair to work on the Standard Bridge the L2 token contract need to implement [`IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/optimistic-ethereum/libraries/standards/IL2StandardERC20.sol). The standard implementation of that is in [`L2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/optimistic-ethereum/libraries/standards/L2StandardERC20.sol) contract.

Note that deposits and withdrawals are restricted to EOA accounts only. Contracts can still interact with the bridge but using the explicit `depositETHTo`, `depositERC20To`, `withdrawTo` functions.

<!-- TODO: Update this once we have the tutorial ready
If you'd like to see these contracts in action, you should check out the [L1 ⇔ L2 deposit-and-withdraw example](https://github.com/ethereum-optimism/optimism/tree/develop/examples/l1-l2-deposit-withdrawal).
 -->

## By Example: Synthetix

If you find examples useful, you might be interested in taking a look at the bridge contracts that [Synthetix](https://synthetix.io/) wrote for their [L2 mainnet launch](https://blog.synthetix.io/l2-mainnet-launch/).
These contracts are pretty slick and make heavy use of our L1 ⇔ L2 messaging infrastructure.
Here's a quick play-by-play:

1. Depositing SNX into L2
    - [Initiating a deposit on L1](https://github.com/Synthetixio/synthetix/blob/master/contracts/SynthetixBridgeToOptimism.sol#L190-L205)
    - [Which leads to receiving a balance on L2](https://github.com/Synthetixio/synthetix/blob/master/contracts/SynthetixBridgeToBase.sol#L111-L115)
2. Migrate SNX Escrow entries to L2 (transferring large amounts of state from L1->L2):
    - [Initiating a migration on L1](https://github.com/Synthetixio/synthetix/blob/master/contracts/SynthetixBridgeToOptimism.sol#L207-L236)
    - [Which leads to receiving escrow entries on L2](https://github.com/Synthetixio/synthetix/blob/master/contracts/SynthetixBridgeToBase.sol#L98-L108)
3. Withdrawing SNX to L1:
    - [Burning L2 SNX and initiating the withdrawal on L2](https://github.com/Synthetixio/synthetix/blob/master/contracts/SynthetixBridgeToBase.sol#L76-L94)
    - [Completing the withdrawal and receiving a balance on L1](https://github.com/Synthetixio/synthetix/blob/master/contracts/SynthetixBridgeToOptimism.sol#L126-L136)
