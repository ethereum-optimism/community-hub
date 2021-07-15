---
title: The Standard™ Token Gateway
lang: en-US
---

# {{ $frontmatter.title }}

The easiest way to move assets between Layer 1 and Layer 2 is to use the [Optimism Gateway](https://gateway.optimism.io).
You can make use of this gateway on any of our networks.
[Click here for a list of our networks and connection details](./networks).

### The Standard™ Bridge

The Standard Bridge simplifies the process of moving ETH and ERC20 tokens between Optimistic Ethereum and Ethereum and consists of two contracts: [`OVM_L1StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/tokens/OVM_L1StandardBridge.sol) (for Layer 1) and  [`OVM_L2StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/tokens/OVM_L2StandardBridge.sol) (for Layer 2) where it is also a [predeploy](../protocol/protocol.md#predeployed-contracts).

For an L1/L2 token pair to work on the Standard Bridge the L2 token contract need to implement [`IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/optimistic-ethereum/libraries/standards/IL2StandardERC20.sol). The standard implementation of that is in [`L2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/master/packages/contracts/contracts/optimistic-ethereum/libraries/standards/L2StandardERC20.sol) contract.

Note that deposits and withdrawals are restricted to EOA accounts only. Contracts can still interact with the bridge but using the explicit `depositETHTo`, `depositERC20To`, `withdrawTo` functions.

<!-- TODO: Update this once we have the tutorial ready
If you'd like to see these contracts in action, you should check out the [L1 ⇔ L2 deposit-and-withdraw example](https://github.com/ethereum-optimism/optimism/tree/develop/examples/l1-l2-deposit-withdrawal).
 -->

## Under the Hood

Interested in how the ETH gateway works under the hood?
We've got you.

In a nutshell, the ETH gateway is pretty much just like any other application that [bridges L1 and L2](./bridging).
It's made up of two primary contracts, the [`OVM_L1ETHGateway`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/bridge/tokens/OVM_L1ETHGateway.sol) contract on Layer 1, and the [`OVM_ETH`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/optimistic-ethereum/OVM/predeploys/OVM_ETH.sol) contract on Layer 2.

So how do these contracts work together to move ETH between the two layers?
Great question!
Let's first take a look at how we send ETH from Layer 1 to Layer 2.

Deposits from Layer 1 into Layer 2 start when you **send some ETH to the `OVM_L1ETHGateway` contract**.
This ETH is then _locked_ inside the contract.

<img src="../../assets/docs/developers/gateway/protocol/1.png" alt="step 1: deposit some ETH" width="600"/>

The `OVM_L1ETHGateway` contract then proceeds to **send a message** to the `OVM_ETH` contract on Layer 2.
If you want to know more about how this message actually gets sent, you should check out our page describing the [basics of L1 ⇔ L2 communication](./bridging.html#l1-⇔-l2-communication-basics).

<img src="../../assets/docs/developers/gateway/protocol/2.png" alt="someone did a deposit" width="600"/>

Now we just have to wait a few minutes for the `OVM_ETH` contract on Layer 2 to actually see this message.

<img src="../../assets/docs/developers/gateway/protocol/3.png" alt="l2 eth contract gets the message" width="600"/>

Once the `OVM_ETH` contract gets the message, it _mints_ some ETH (out of thin air) equal to the amount of ETH that was originally deposited on Layer 1.

<img src="../../assets/docs/developers/gateway/protocol/4.png" alt="you get some minted ETH" width="600"/>

Badaboom, it's easy as that.
The process of moving ETH back from Layer 2 to Layer 1 is basically the same thing but in reverse.
I'm too lazy to draw the whole thing (sorry), but I'll give you the basic steps:

1. You send a "withdrawal" transaction to the `OVM_ETH` contract on Layer 2.
2. The `OVM_ETH` contract _burns_ the ETH that you want to withdraw.
3. The `OVM_ETH` contract sends a message to the `OVM_L1ETHGateway` saying that it should unlock some ETH on your behalf.
4. You wait out the [one week challenge period](bridging.html#understanding-the-challenge-period).
5. You send send a second, final "withdrawal" transaction to the `OVM_L1ETHGateway` on Layer 1 and get your funds back!
6. You are happy.
7. We are happy.
8. Ethereum gets way cooler.

::: tip On leaving feedback
I hope this was sufficiently informative.
Sometimes I struggle with trying to strike a balance between "useful" and "entertaining".
If you have opinions on this and would like to leave some feedback, I recommend [creating an issue on GitHub](https://github.com/ethereum-optimism/community-hub/issues).
Otherwise, thank you for reading this page!
:::
