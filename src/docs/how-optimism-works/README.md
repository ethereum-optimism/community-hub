---
title: How Optimism Works
lang: en-US
---

# {{ $frontmatter.title }}

Audience:
- CEO/BizDev-types
- Plain English, but assuming some technical understanding

Goals:
- Explain how it will scale long term
- Explain the security assumptions, benefits, tradeoffs, and goals of Optimism

## Introduction

Welcome to *How Optimism Works*.

By the time you're finished reading this page you should have a foundational understanding of how Optimism makes Ethereum transactions cheaper and faster, the approach that Optimism is taking to scaling both Ethereum and Ethereum's values, and why Optimism is the best place to build your next Ethereum-native app.

We'll be covering some technical material on this page.
We've tried to make this guide as comprehensive as possible while still keeping the content accessible to most readers.
As a result, we will *not* be diving deeply into the minutiae of the Optimism protocol.
Readers interested in a low-level look into Optimism under the hood should refer to the [Protocol](http://localhost:8080/docs/protocol/) section of this website.

Without further ado, let's learn *How Optimism Works*!

## Rollups 101

Optimism is a blockchain system that's almost identical to Ethereum under the hood.
However, Optimism doesn't use a separate consensus mechanism like Proof-of-Work or Proof-of-Stake to maintain its security.
Instead, Optimism piggy-backs off of the security of Ethereum using the Optimistic Rollup design mechanism.
Here we'll briefly explain what an Optimistic Rollup is and how it works.
If you're looking for a more detailed explanation you can refer to [this explainer for rollups](https://www.paradigm.xyz/2021/01/almost-everything-you-need-to-know-about-optimistic-rollup/).

Here's what you need to know.
In an Optimistic Rollup, blocks of transactions are published to Ethereum and stored in a smart contract.
Blocks can be published in one of two ways, either by going through a block producer who will combine lots of transactions together and publish them all at once or by directly submitting by yourself.
If you directly submit, then you pay more in money but you get around a situation where a block producer is potentially censoring you.

This smart contract holds the "chain" of blocks that make up the blockchain on L2.
The smart contract is designed never to revert blocks, but of course this reversion property is dependent on the ability for the L1 not to revert blocks, which depends on its security properties.
This is how L2s derive their security from L1.
Nodes download these blocks and execute them, creating a deterministic result, just like on Ethereum.

Only step left now is to tell Ethereum about the result of executing these blocks (the state of L2) so that apps on ethereum can make decisions based on these results.
The way this works is that any user can publish the "state root" (link to Etheruem docs) of the block to Ethereum and then a challenge period opens up.
We need the challenge period because Ethereum hasn't actually executed the block and the user is just making a claim as to what the state of the L2 system is, unsubstantiated.
Other L2 nodes are also running the blocks and since the result is deterministic, they know right away whether the result published is correct or not.

If the result is not correct, then they can start a challenge.
In a basic sense this is like re-executing the transaction on Ethereum so that Etheruem can be 100% sure about the result.
When proprely incentivized this has the effect that the correct reuslt will ALWAYS be published to Ethereum eventually.

So there you have it, that's how Optimistic Rollups work.

- Blocks are published to Ethereum by a block producer (called the Sequencer)
- Other nodes get these blocks from Ethereum and execute them, deterministically
- Nodes can publish "transaction results" to Ethereum
  - Ethereum doesn't execute, that's how it gets cheaper
- Other nodes can then challenge the results, then there's a challenge process
  - Constructed so that *eventually* the correct result will reach Ethereum
- Use this section to point out the key components (indexer/l1 node, client software, fraud proof)

## Design philosophy

Optimism has a very strong opinion on the design philosophy required to bring L2s securely to the mainstream.
This philosophy is built on four main pillars:

1. Simplicity
2. Pragmatism
3. Sustainability
4. Optimism

### Simplicity

Optimism is designed to be as simple as possible at its core.
It's aimed to be composed of the minimum number of pieces required to make a secure L2 system possible.
This simplicity and minimalism is important for a number of significant reasons to Optimism.
First, a minimal protocol will come with the least amount of overhead.
We've designed our protocol to have the smallest possible diff from existing software.
This way we don't need an entire team of people to maintain a highly custom codebase.

Simplicity also means that we're writing fewer lines of code, which means there's less room to make mistakes.
Simplicity is security.
Particularly when it comes to complex things like a Layer 2 rollup system, it should be as simple as possible so there's little room for error and so that it's as easy as possible for outside people to audit the codebase.
If a codebase can't be easily audited, it can't be trusted.

Finally, simplicity is also important for our vision.
By limiting the amount of code that we write on top of existing Ethereum tooling, we're able to position ourselves to dedicate most of the Optimism engineering effort to improving that existing tooling.
Since it will mostly be the same codebase, it will literally be a direct improvement to Optimism to be working on code like Geth.
Once the core Optimism code is done, there won't be a lot else for the Optimism team to work on!

### Pragmatism

The Optimism team is pragmatic.
We do our work with real-world constraints in mind.
The Layer 2 space is still relatively new and we need to approach the space like a novel engineering problem.
We spend a significant amount of time on things like developer experience and user experience.
We build our protocol with a preferance towards pragmatic benefit over perfectionism.

We believe that a fast and iterated development process, unlike the process taken by many other blockchain systems, is the best way to make sure that the core Optimism product is able to adapt to the L2 environment at the same time that we're building that environment.
This iteration is what let us do the OVM 2.0 upgrade in a period of only a few months which vastly improved the experience of using Optimism and put us in the forefront of our field.

We continue to reassess the protocol and make tweaks that improve the experience and efficiency of using the system without sacrifice.

### Sustainability

When deciding to build on a blockchain system, you need an assurance that the system is here to stay.
Moving assets around is expensive and establishing yourself within a financial ecosystem takes time.
Users don't want to commit this sort of effort to chains that aren't going to see long-term growth.

Optimism's entire design process is focused around the idea that we need to build a system that can sustainably advance itself for extremely long periods of time (decades).
We are interested in taking the risks required to make this a reality.
Retroactive public goods funding is an example of this.
But basically security isn't the only thing that protocol revenue needs to go to, if the protocol wants to sustain itself long term then it also needs to be able to fund the applications that get other people to use the protocol, which gives more funding to the protocol and etc etc.

Basically, Optimism isn't just a piece of software, it's an ecosystem.
And we're constantly prioritizing things that are good for the ecosystem.
We're coming up with ways in which protocol revenue can be used to fund future development of the protocol but that's not where it ends.
We're also coming up with ways for protocol revenue will go to apps and tools that maintain the ecosystem on a regular and ongoing basis.
Without this funding, we're sitting on a house of cards.

### Optimism

None of this would be possible without optimism.
At the end of the day, the core tenet of optimism is what keeps Optimism going.
We believe in an optimistic future for Ethereum, one where the technology radically changes the world by challenging the existing thought on how things can be incentivized.
We believe in a future where Ethereum is accessible.
We believe in a future where our financial systems are transparent.

That's our philosophy, and Optimism is how we believe we can make that a reality.
We do everything with a long-term vision for what crypto could be.
We wake up excited for the work that we're doing because of 

## System overview

Now that we've covered the philosophy behind Optimism, let's take a look at how it currently works at a high level.

(insert sequencer diagram)
### Node software

Optimism, like Ethereum, is a network of nodes.
Every node has two primary component.
Firt there's the L2 client software which in Optimism's case is literally an almost-vanilla Geth node.
This is what executes blocks, just like how Geth executes blocks for Ethereum.
But in order to get these blocks, we have to look at an Ethereum node.
We use a piece of software called the indexer to read data from the Ethereum node and deterministically construct the Layer 2 chain.

(insert node diagram)
- Optimism node software
  - Node software is the core of Optimism
  - We use Geth with only minor modifications - the main modification is the introduction of a new transaction type for "deposits".
  - Use this section to really hammer home the fact that this is JUST GETH and it doesn't get any simpler than that, it's the same battle-tested software that gets used for Ethereum
  - We use JUST GETH for multiple reasons, but mainly it's for the stability and because we believe in the future of Etheruem and we want to put ourselves in a position where we can actively contribute back to the Geth codebase and contribute back to Ethereum.
  - Nodes get their data from the indexer, which uses an L1 node and a connection to the Sequencer to get the blocks.

### Block production

There's a special node call the Sequencer which can create blocks and publish them to Ethereum.
Users can send transactions to a node, which will then forward the transactions to teh Sequencer.
The sequencer combines these transactions into batches and then publishes all the transactions/blocks at the same time.


Users can also create blocks without going through a Sequencer by publishing them directly to Ethereum.
This is more costly, but is censorship resistant.

(insert bypass diagram)

Transaction results are published (by any node) to another contract on L1.
This ties Optimism back into Ethereum and allows apps on L1 to make decisions based on L2.
For example, this is how a withdrawal contract can give users withdrawals if they want to leave L2.

(insert diagram)

- How blocks get made
  - Users can send transactions either to an L2 node or post them directly to L1 themselves
  - When sent to an L2 node, the transaction gets sent to the Sequencer to be bundled into a block
  - When sent to L1 directly, a block is created on L1 and pushed into the chain
  - Combination of blocks created on L1 and blocks published by Sequencer creates some canonical list of blocks
  - And this list of blocks is what verifier nodes pull down to execute

### Maintaining integrity

Since Ethereum doesn't execute the L2 transactions, transaction results published to Ethereum could be incorrect.
This doesn't impact the validity of the chain itself, just what smart contracts on Ethereum think the state of Optimism is.
The worst case scenario here would be that a contract for example allows a user to withdraw funds when the user didn't actuaLly have the right to withdraw funds.
Optimism is designed to prevent this with cryptoeconomic security.

(insert diagram)

In the Optimism system, users publish results for a given block.
Then other users can challenge that result and say they think the result is wrong.
There's always only one correct answer, and it's an answer that any honest node knows.
So if there's something wrong with the result, all honest nodes will immediately know and be able to challenge the block.
One honest node then needs to start the challenge, which begins a back-and-forth process between the challenger and the publisher to determine who was correct.
The process is designed so that it will always find the correct party programmatically.

We have a one-honest node assumption for security on Optimism, that is to say that there only needs to be one node willing to participate in the security process for the system to be secure.
Because of the way the security system is set up, this one node can keep the system secure by doing the challenge process and they get paid for the cost of the challenge, so it's mostly costless.
The party with the correct answer (which will be the honest node) will always win, so you can see why you only need that one party.
The process is relatively cheap and you only need one of them, and the one party can do this sustainably.


- Transaction results
  (NOTE: Currently trusted)
  - Transaction results are published to Ethereum, with one result per transaction currently
  - Transactions can be published by any node that puts up a bond
  - Transaction results are unchecked, they could be correct or they could be bogus (this is "optimistic")
  - Transaction results can be challenged by any other party
  - Can be detected immediately by any honest node because we have 
  - This kicks off a challenge process
- Challenge process TL;DR
  (NOTE: Currently disabled until further notice)
  - Multi-round process a lot like TrueBit
  - We compile Geth down into MIPS and turn the transaction execution into a series of states
  - We go over each state and find the first place where users agree on the input but disagree on the output
  - Then we execute that one step and figure out who's correct
  - If the result is challenged, then we delete that result and all results that were published after it
  - this does NOT mean that transactions are reverted, transactions are never reverted, it's just that a bad result may be removed.
    - Important to drive home

## Why Optimism?
### Lower transaction costs

Optimism is the least expensive general-purpose L2 system out there.
It accomplishes this by being extremely lean and using a multitude of techniques to minimize the most expensive part of any Layer 2, the publication of data to the corresponding Layer 1.
This is a direct impact of the simplicity of our design, which uses only the amount of computation on L1 as absolutely required.
All this combines to give you the least expensive transactions of any general-purpose L2 today.

Lower transaction costs are critical to our mission of bringing Ethereum to the mainstream.
Users of Optimism today only have to pay $1-2 for a basic transaction which can cost upwards of $100 on the main Ethereum chain.
Optimism makes your project significantly more accessible and widens your potential audience while maintaining the guarantees that you expect from production blockchains like Ethereum.
You can scale your app without compromising on your commitment to Ethereum.

- Cost
  - Highlight the simplicity aspect again
  - What is gives you: significantly cheaper transactions
  - Critical to our mission of bringing Ethereum "to the masses"
  - You pay only a few dollars per transaction, currently Optimism is the cheapest and simplest general-purpose L2 on average.

### Better user experience

Optimism is able to use some clever tricks to vastly improve the developer experience.
Optimism was the first Layer 2 system to introduce instant confirmations, a technique where transactions sent on Layer 2 can have strong guarantees about finality in a very short period of time.
This means that Optimism feels lightning fast for users and brings the web2 user experience to web3.

- Simplicity
  - It's EVM equivalent, which goes further than API-level compatibility.
  - It's literally just Geth under the hood, which means any tooling you can image will "just work" with Optimism
  - Easiest L2 to deploy to, by a longshot. Your devs will appreciate it, and you won't be locked into the ecosystem.
  - We believe in compatibility with other L2s and actively take feedback so you aren't locked in.

### Better developer experience

Optimism also pioneered EVM equivalence, a Layer 2 design pattern where the client software is an almost completely vanilla version of an existing Ethereum node.
This means more than just API-level compatibility.
Tools that expect the underlying blockchain to work a certain way or tools that are designed to hook directly into an Ethereum node will "just work", no fiddling required.

All this sounds fancy, but it ultimately just means that Optimism is the easiest L2 to deploy to by a longshot.
We think you'll have a lot of fun working on Optimism.
And because of Optimism's tight compatibility with Ethereum, you're never locked into the ecosystem.
You can always take your code and deploy it to other Ethereum-based chains with little effort.

We never think we're finished, we always have more work to do.
We also believe in compatibility with other L2s and actively work to integrate the design patters that they use.
In the spirit of pragmatism and collaboration, we try to maintain compatiblity with other L2s to minimize lockin as much as possible, we think blockchain apps should be portable.

- Simplicity
  - It's EVM equivalent, which goes further than API-level compatibility.
  - It's literally just Geth under the hood, which means any tooling you can image will "just work" with Optimism
  - Easiest L2 to deploy to, by a longshot. Your devs will appreciate it, and you won't be locked into the ecosystem.
  - We believe in compatibility with other L2s and actively take feedback so you aren't locked in.

### Secure by design
- Approach to security
  - Simplicity also means fewer lines of code that can go wrong and more security in general.
  - L2s naturally have to trade off some cost for security, but that extra cost goes back to keeping your funds safe.
  - Optimism is the place to go if you're dedicated to Ethereum and you want to scale
  - Incremental approach, being pragamatic rather than perfectionist.
    - We iterate quickly and have spent the last year coming up with a design we're happy with
    - We currently have trusted guardrails in place
    - Rails are being removed as we build more confidence in the system
  - Bug bounty program

### Ethereum native at heart

### Built to last

- Building a project is a serious endeavour. We're not here to leave. We're here to create an ecosystem that'll be around in 20 years. We're more serious about it than anyone else.
- Building a long-term ecosystem is about building sustainably. We spend a lot of time building software, but we also spend a lot of time thinking about how we can create a blockchain ecosystem where projects are supported during every stage of the development process.
- We're not in it to create an entirely separate ecosystem. You're not leaving the Ethereum ecosystem. Everything we do goes back into the Ethereum ecosystem.
- Building with the Ethereum codebase wasn't just a practical decision, it was a philosophical one. We want to work on Ethereum, we want to scale Ethereum. Optimism is jsut a part of scaling Etheruem.

- Why Optimism?
  - First reiterate the previous points of cost and security, of the general-purpose rollups our tech is far ahead and we've got an excellent team pushing the protocol and client software even further. "You can expect to save a sigificant amount of money"
  - We're thinking about the future of blockchains in a way that nobody else is. We want to create a sustainable ecosystem where you'll get rewarded for your contribution to the system. Retroactive public goods funding is a part of this, with Optimism you can expect to get top notch support in getting your application running, funded by protocol revenue. Optimism helps you win, it's not just another platform for you to deploy to.

## Start building on Optimism
- Where to learn more?
  - Contact form if you want to deploy and you want assistance in getting there
  - Docs, help center, discord, github
  - Or just bring your existing Etheruem expertise
  - To Optimism!