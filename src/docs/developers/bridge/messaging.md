---
title: Sending Data Between L1 and L2
lang: en-US
---

# {{ $frontmatter.title }}

Apps on Optimistic Ethereum can be made to interact with apps on Ethereum via a process called "bridging".
In a nutshell, **contracts on Optimistic Ethereum can send messages to contracts on Ethereum, and vice versa**.
With just a little bit of elbow grease, you too can create contracts that bridge the gap between Layer 1 and Layer 2!

## Understanding contract calls

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

Here, `MyOtherContract.doTheThing` triggers a "call" to `MyContract.doSomething`.
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

## L1 ⇔ L2 communication basics

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
These messenger contracts, the [`OVM_L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/messaging/OVM_L1CrossDomainMessenger.sol) and [`OVM_L2CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/messaging/OVM_L2CrossDomainMessenger.sol), always come pre-deployed to each of our networks.
You can find the exact addresses of these contracts on our various deployments [inside of the Optimism monorepo](https://github.com/ethereum-optimism/optimism/blob/ef5343d61708f2d15f51dca981f03ee4ac447c21/packages/contracts/deployments/README.md).
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

## Understanding the challenge period

One of the most important things to understand about L1 ⇔ L2 interaction is that **messages sent from Layer 2 to Layer 1 cannot be relayed for at least one week**.
This means that any messages you send from Layer 2 will only be received on Layer 1 after this one week period has elapsed.
We call this period of time the "challenge period" because it's a result of one of the core security mechanisms of the Optimistic Rollup: the transaction result challenge.

Optimistic Rollups are "optimistic" because they're based around the idea of publishing the *result* of a transaction to Ethereum without actually executing the transaction on Ethereum.
In the "optimistic" case, this transaction result is correct and we can completely avoid the need to perform complicated (and expensive) logic on Ethereum.
Cheap transactions, yay!

However, we still need some way to prevent incorrect transaction results from being published in place of correct ones.
Here's where the "transaction result challenge" comes into play.
Whenever a transaction result is published, it's considered "pending" for a period of time known as the challenge period.
During this period of time, anyone may re-execute the transaction *on Ethereum* in an attempt to demonstrate that the published result was incorrect.

If someone succesfully executes this challenge, then the result is scrubbed from existence and anyone can publish another result in its place (hopefully the correct one this time, financial punishments make incorrect results *very* costly for their publishers).
Once the window for a given transaction result has fully passed without a challenge the result can be considered fully valid (or else someone would've challenged it).

Anyway, the point here is that **you don't want to be making decisions about Layer 2 transaction results from inside a smart contract on Layer 1 until this challenge period has elapsed**.
Otherwise you might be making decisions based on an invalid transaction result.
As a result, L2 ⇒ L1 messages sent using the standard messenger contracts cannot be relayed until they've waited out the full challenge period.

::: tip On the length of the challenge period
We've set the challenge period to be exactly seven days on the Optimistic Ethereum mainnet.
We believe this is a reasonable balance between security and usability, with an emphasis on increased security to start.
We're open to changing the length of the window as long as we feel this can be done without significantly reducing the security of the system.
If you're strongly opinionated about this, we recommend [opening an issue on GitHub](https://github.com/ethereum-optimism/optimism/issues) explaining your position.
We *will* hear you out!
:::
