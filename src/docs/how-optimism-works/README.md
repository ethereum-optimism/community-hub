---
title: How Optimism Works
lang: en-US
---

# {{ $frontmatter.title }}

## Introduction

Hello!
By the time you're finished reading this page you should have a foundational understanding of how Optimism makes Ethereum transactions cheaper and faster, the approach that Optimism is taking to scaling both Ethereum and Ethereum's values, and why Optimism is the best place to build your next Ethereum-native app.

We've tried to make this guide as comprehensive as possible while still keeping the content accessible to most readers.
Some content on this page is geared towards readers with a technical background but should still be legible to those with a basic understanding of how blockchains work.
Generally speaking, we err on the side of simplicity and approachability.
Readers interested in a low-level look into Optimism under the hood should refer to the [Protocol](http://localhost:8080/docs/protocol/) section of this website.

Without further ado, let's find out *How Optimism Works*!

## Design philosophy

Optimism is built according to a strong design philosophy that stands on four main pillars: simplicity, pragmatism, sustainability, and, of course, optimism.
It's important to understand these pillars as they heavily influences the design of Optimism as a whole.

### Simplicity

Optimism is designed to be as simple as possible for the featureset it provides.
Ideally, Optimism should be composed of the minimum number of moving parts required for a secure, scalable, and flexible L2 system.
This simplicity gives Optimism's design a number of significant advantages over other more complex L2 constructions.

Simplicity reduces engineering overhead, which in turn means we can spend our time working on new features instead of re-creating existing ones.
Optimism prefers to use existing battle-tested Ethereum code and infrastructure where possible.
The most visible example of this philosophy in practice is the choice to use Geth as Optimism's client software.

When dealing with critical infrastructure, simplicity is also security.
Every line of code we write is an opportunity to introduce unintentional bugs.
A simple protocol means there's less code to write and, as a result, less surface area for potential mistakes.
A clean and minimal codebase is also more accessible to external contributors and auditors.
All of this serves to maximize the security and correctness of the Optimism protocol.

Simplicity is also important for the long-term vision of Optimism.
By limiting the amount of code that we write on top of existing Ethereum tooling, we're able to spend most of our time working directly with existing Ethereum codebases.
Engineering effort that goes into Optimism can also directly benefit Ethereum, and vice versa.
This will only become more pronounced as the Optimism protocol solidifies and existing resources can be redirected towards core Ethereum infrastructure.

### Pragmatism

For all its idealism, the design process behind Optimism is ultimately driven by pragmatism.
The core Optimism team has real-world constraints, the projects that build on Optimism have real-world needs, and the users that engage with Optimism have real-world problems.
Optimism's design philosophy prioritizes user and developer needs over theoretical perfection.
Sometimes the best solution isn't the prettiest one.

Optimism is also developed with the understanding that a small core development team will always have limited expertise.
Optimism is developed iteratively and strives to continously pull feedback from Optimism users.
Many core Optimism features today (like EVM equivalence) were only made possible by this iterative approach to protocol development.

### Sustainability

Optimism is in it for the long haul.
Application developers need assurance that the platform they're building on will remain not only operational but competitive over long periods of time.
Optimism's design process is built around the idea of long-term sustainability and not taking shortcuts to scalability.
At the end of the day, a scalable system means nothing without the ecosystem that sustains it.

Sustainability actively influences Optimism's protocol design in ways that go hand-in-hand with our philosophy of simplicity.
The more complex a codebase, the more difficult it is for people outside of the core development team to actively contribute.
By keeping our codebase simple we're able to build a bigger community of contributors who can help maintain the protocol long-term.

### Optimism

Of course, none of this would be possible without a sense of optimism.
Our optimism about the Ethereum vision keeps this project moving forward.
We believe in an optimistic future for Ethereum, a future where we get to redesign our relationships to the institutions that coordinate our lives.

Although Optimism looks like a standalone blockchain, it's ultimately designed as an extension to Ethereum.
We keep this in mind whenever we're creating new features or trying to simplify existing ones.
Optimism is as close to Ethereum as possible not only for pragmatic reasons, but because Optimism exists so that Ethereum can succeed.
We hope that you can see the influence of this philosophy when looking at Optimism's design.

## Optimistic Rollups

We've covered most of the "why" behind Optimism.
Now it's time to explain the big idea that makes Optimism possible: the Optimistic Rollup.
Here we'll explain why Optimism is built as an Optimistic Rollup and why we believe it's the best option for a system that addresses all of our design goals.
We'll also go through a brief explainer of what an Optimistic Rollup is at a high level before diving into how Optimism's specific implementation of this concept actually works.

### Why an Optimistic Rollup?

Before any code was written, Optimism was just a goal: *make Ethereum mainstream*.

We just needed to figure out exactly how to turn that lofty goal into a reality.
Constructing a new L1 system was out of the question.
Optimism was designed to scale Ethereum, not create a new chain that competes with it.
This left only two serious options: Optimistic Rollups or ZK Rollups.

ZK Rollups are extremely cool.
They're also extremely complicated.
The most advanced ZK Rollups are built on top of fields of mathematics still being established at this very moment.
In the pursuit of simplicity and sustainability, Optimistic Rollups really can't be beat.
Perhaps most the most critical advantage is that an Optimistic Rollup can be audited without a PhD.

Optimistic Rollups are also more flexible than their ZK counterparts.
For Optimistic Rollups, EVM compatibility is the expectation rather than a theoretical future outcome.
Existing Ethereum applications can easily be ported to most Optimistic Rollups, a requirement that we felt absolutely necessary for a system designed to scale *Ethereum*.

Furthermore, we know from experience that an initial protocol release is just the beginning.
Optimistic Rollup infrastructure is far more mature than the equivalent ZK Rollup infrastructure.
This is mostly a result of the minimal additional code required to transform an Ethereum node into an Optimistic Rollup node.
The relative simplicity of building and maintaining Optimistic Rollups will only serve to widen this maturity gap as time goes on.

At the end of the day, we feel that there are a number of clear advantages to the Optimistic Rollup design for the particular needs and goals of Optimism.
We hope you'll find these advantages to be just as clear once you start using Optimism!

### Optimistic Rollups 101

That's enough background.
Let's start diving into the technical details.
What exactly *is* an Optimistic Rollup?

The term "Rollup" is basically just a fancy way of saying that the blockchain in question is piggy-backing off of the security of another blockchain.
In particular, a Rollup system does this by publishing all of its blocks and transaction data to the "parent" blockchain.
This makes it possible to avoid the need for a complex consensus mechanism (like PoW or PoS) to determine the canonical ordering of transactions.
In Optimism's case this parent blockchain is Ethereum.

(image)

For most Ethereum-based Rollups, blocks are published when transactions are sent to special smart contracts.
Transactions can be added to the chain in one of two ways, either by sending the transaction to a block producer (or "Sequencer") or by sending transactions directly to Ethereum.
Block producers combine lots of transactions together and publishes them all at once.
This usually saves a lot of money because block producers can spread fixed costs over many transactions and can even apply advanced techniques like calldata compression.
Alternatively, users can skip block producers entirely and send their transaction directly to Ethereum.
This is typically more expensive but has the advantage of being censorship resistant.

(diagram)

The smart contract on Ethereum then holds the list of blocks that make up the L2 blockchain.
This list is usually made immutable within the contract, a property which is guaranteed to hold as long as the parent chain's immutability holds.
It's through this relationship that an L2 derives its security from the parent chain.
Nodes download these blocks from the smart contract and execute them deterministically, just like any other blockchain.
At this point we've got a fully functional blockchain without its own consensus mechanism.

(diagram)

Since the L2 trusts the parent chain by design, it's usually very easy to send data from the parent chain into the L2.
L2s are typically designed so that a contract on L1 can trigger the special smart contract function to create a block on L2.
Contracts on L1 can use this approach to, for example, move some assets from the parent chain into the L2 chain.

(diagram)

Unfortunately this relationship between the L1 and the L2 doesn't hold in reverse.
The parent chain doesn't know anything about the L2, so any communication from the L2 back to the parent chain has to come with some sort of proof that the communication is valid.
After all, the whole point of L2 is that the parent chain isn't actually executing the transactions on L2.

(diagram)

The approach to this proof process is what differentiates an Optimistic Rollup from a ZK Rollup.
In both Rollup models, commitments to the state of the L2 (usually in the form of the root of a Merkle tree) are regularly published to the parent chain.
Applications can then use these commitments to make prove things about the state of L2.
In a ZK Rollup, each commitment comes with a cryptographic proof that the commitment does, in fact, represent the true state of the L2.

(diagram)

In an Optimistic Rollup, commitments are published *without* any direct proof.
Instead, commitments are required to go through a "challenge period" during which other users can "challenge" the commitment and make the assertion that the commitment is not valid.
The original submitter of the commitment and the challenger duke it out in a fancy "fault proof" process which will eventually determine whether or not the commitment was valid.

(diagram)

As long as someone is willing to do these challenges and keep an eye on the system, an Optimistic Rollup is guaranteed to always have the correct commitments on L1 after the challenge period is over.
This means that the major difference between a ZK rollup and an Optimistic Rollup is that there's a waiting period when sending data from the L2 back to the parent chain.

## System overview

Now that we've covered the philosophy behind Optimism, let's take a look at how it currently works at a high level.

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

(insert sequencer diagram)

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

### Fault proofs

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

### Deposits and withdrawals

## Start building on Optimism
- Where to learn more?
  - Contact form if you want to deploy and you want assistance in getting there
  - Docs, help center, discord, github
  - Or just bring your existing Etheruem expertise
  - To Optimism!




<!-- ## Design goals

Before we explore the inner workings of Optimism, it's important to understand the goals that the Optimism system sets out to achieve.
These goals deeply impact the way in which Optimism is built and define how Optimism tackles new problems.
You'll see the effects of these goals in various places throughout the Optimism protocol.
By familiarizing yourself with these goals, you'll have a more intuitive understanding of exactly *why* Optimism is built the way that it is.

### Make Ethereum mainstream

Everything about the Optimism project comes down to one core goal: to make Ethereum mainstream.

We believe that Ethereum (and its ecosystem) has the potential to revolutionize the relationship that the average person has with the institutions that govern their lives.
Ethereum is the only platform with the reach and vision to make this potential future a reality.
We could talk for ages about why we love Ethereum.
At the end of the day, Optimism is built by Ethereans, for Ethereans.
We want the Ethereum vision to succeed.
And, of course, for Ethereum to succeed it has to break into the mainstream.

This commitment to Ethereum and its future has concrete and visible effects on the way Optimism is designed.
Almost every decision that Optimism makes is informed by the way that decision can help the future of Ethereum.
For example, as you'll see later in this page, Optimism is built almost entirely as a minimal wrapper around existing Ethereum code and infrastructure.
This design decision deliberately ties Optimism to Ethereum's roadmap and means concretely that Optimism's engineers can shift towards working on core Ethereum infrastructure once the protocol is fully stable.

### Cut transaction costs

For Ethereum to break into the mainstream it has to become significantly more accessible to the average person.
The most obvious barrier to this accessibility is Ethereum's sky-high transaction fees.
It's exceedingly clear that Ethereum is simply too expensive for most people to use on a daily basis.
It's Optimism's goal to reduce Ethereum's transaction fees without compromising on the security properties that make Ethereum so attractive in the first place.

Optimism is the currently least expensive general-purpose L2 system on average and we intend to keep it that way.
It accomplishes this with various techniques that minimize the most expensive part of any Layer 2 system, the publication of transaction data to Ethereum.
However, there's always room to keep reducing costs on multiple fronts.
The impact that a design decision can have on end-user cost always has to be considered when creating new features for Optimism.

### Improve user experience

Accessibility isn't just about cheaper transactions, it's also about creating a great user experience.
Unfortunately, web2 apps usually outperform web3 apps on this front as a side-effect of centralization.
Optimism has already made significant improvements to the status quo of web3 user experience and each feature we add is carefully designed to always improve the user experience that we have in the face of our constraints.

For example, Optimism was the first L2 system to introduce instant "Sequencer confirmations", a technique where transactions sent on L2 can have strong guarantees about finality in a very short period of time.
As a result, apps deployed natively to Optimism can finally start to compete with the user experience of existing web2 apps.

### Improve developer experience

Alongside an improved user experience comes an improved developer experience.
At the end of the day we need to make it as easy and as safe as possible to build applications for Optimism.

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

### Security through simplicity

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

### Build for the long-term

- Building a project is a serious endeavour. We're not here to leave. We're here to create an ecosystem that'll be around in 20 years. We're more serious about it than anyone else.
- Building a long-term ecosystem is about building sustainably. We spend a lot of time building software, but we also spend a lot of time thinking about how we can create a blockchain ecosystem where projects are supported during every stage of the development process.
- We're not in it to create an entirely separate ecosystem. You're not leaving the Ethereum ecosystem. Everything we do goes back into the Ethereum ecosystem.
- Building with the Ethereum codebase wasn't just a practical decision, it was a philosophical one. We want to work on Ethereum, we want to scale Ethereum. Optimism is jsut a part of scaling Etheruem.

- Why Optimism?
  - First reiterate the previous points of cost and security, of the general-purpose rollups our tech is far ahead and we've got an excellent team pushing the protocol and client software even further. "You can expect to save a sigificant amount of money"
  - We're thinking about the future of blockchains in a way that nobody else is. We want to create a sustainable ecosystem where you'll get rewarded for your contribution to the system. Retroactive public goods funding is a part of this, with Optimism you can expect to get top notch support in getting your application running, funded by protocol revenue. Optimism helps you win, it's not just another platform for you to deploy to. -->
