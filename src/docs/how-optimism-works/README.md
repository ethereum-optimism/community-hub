---
title: Optimism 怎么工作
lang: zh-CN
---

## 介绍

Hello!
当您阅读完本页时，您应该对 Optimism 如何使以太坊交易更便宜更快捷、Optimism 用于扩展以太坊和以太坊价值的方法以及为什么 Optimism 是构建您的下一个以太坊原生应用有一个基本理解。

我们努力使本指南尽可能全面，同时仍让大多数读者都能访问内容。
此页面上的一些内容面向具有技术背景的读者，但对于那些对区块链如何工作有基本了解的人仍然应该可以理解。
一般来说，我们在简单性和可接近性方面犯了错误。
有兴趣深入了解 Optimism 的读者应该参考本网站的 [Protocol](../protocol/) 部分。

事不宜迟，让我们来看看 *Optimism 是如何工作的* !

## 设计理念

Optimism 是根据强大的设计理念建立的，该理念基于四大支柱：简单、实用主义、可持续性，当然还有乐观主义。
了解这些支柱很重要，因为它们严重影响了 Optimism 的整体设计。

### 简单

Optimism 旨在使其提供的功能集尽可能简单。
理想情况下，Optimism 应该由安全、可扩展和灵活的 L2 系统所需的最少移动部件组成。
这种简单性使 Optimism 的设计与其他更复杂的 L2 结构相比具有许多显著优势。

简单性降低了工程开销，这反过来意味着我们可以将时间花在新功能上，而不是重新创建现有功能。
Optimism 更喜欢尽可能使用现有的经过实战考验的以太坊代码和基础设施。
这种理念在实践中最明显的例子是选择使用 Geth 作为 Optimism 的客户端软件。

在处理关键基础设施时，简单性也是安全性。
我们编写的每一行代码都是引入无意错误的机会。
一个简单的协议意味着要编写的代码更少，因此潜在错误的表面积也更少。
外部贡献者和审计员也更容易访问干净且最小的代码库。
所有这些都有助于最大限度地提高 Optimism 协议的安全性和正确性。

简单性对于 Optimism 的长期愿景也很重要。
通过限制我们在以太坊工具之上编写的代码量，我们能够将大部分时间用于直接使用现有代码库。
Optimism 的工程努力也可以直接使以太坊受益，反之亦然。
随着 Optimism 协议的巩固和现有资源可以重新定向到核心以太坊基础设施，这只会变得更加明显。

### 实用主义

尽管有理想主义，但 Optimism 背后的设计过程最终是由实用主义驱动的。
Optimism 核心团队有现实世界的限制，建立在 Optimism 之上的项目有现实世界的需求，而参与 Optimism 的用户有现实世界的问题。
Optimism 的设计理念优先考虑用户和开发人员的需求，而不是理论的完美。
有时最好的解决方案并不是最漂亮的。

乐观主义也是在理解任何核心团队的专业领域有限的情况下发展起来的。
Optimism 是迭代开发的，并努力不断地从用户那里获取反馈。
今天的许多核心 Optimism 功能（如 [EVM 等效性](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306)）只有通过这种迭代的协议开发方法才成为可能。

### 可持续性

从长远来看，乐观是存在的。
应用程序开发人员需要确保他们所构建的平台在很长一段时间内不仅可以运行而且具有竞争力。
Optimism 的设计过程是围绕长期可持续性的理念构建的，而不是走捷径来实现可扩展性。
归根结底，如果没有维持它的生态系统，可扩展系统就毫无意义。

可持续性以与我们的简约理念相辅相成的方式积极影响 Optimism 的协议设计。
代码库越复杂，核心开发团队之外的人就越难以积极做出贡献。
通过保持我们的代码库简单，我们能够建立一个更大的贡献者社区，他们可以帮助长期维护协议。

### 乐观

当然，如果没有乐观情绪，这一切都是不可能的。
我们对以太坊愿景的乐观态度使这个项目不断向前发展。
我们相信以太坊有一个乐观的未来，一个我们可以重新设计我们与协调我们生活的机构的关系的未来。

尽管 Optimism 看起来像一个独立的区块链，但它最终被设计为以太坊的扩展。
每当我们创建新功能或尝试简化现有功能时，我们都会牢记这一点。
Optimism 尽可能接近以太坊，不仅是出于务实的原因，还因为 Optimism 的存在使以太坊能够成功。
我们希望您在看 Optimism 的设计时能看到这种理念的影响。

## Rollup 协议

我们已经涵盖了 Optimism 背后的大部分“why”。
现在是时候解释使 Optimism 成为可能的重要思想了：Optimistic Rollup。
我们将简要解释 *how* Optimistic Rollups 在高层次上工作。
然后我们将解释 *why* Optimism 是作为 Optimistic Rollup 构建的，以及为什么我们认为它是解决我们所有设计目标的系统的最佳选择。

### Optimistic Rollups (太长不看)

Optimism 是一种“Optimistic Rollup”，它基本上只是描述区块链的一种奇特方式，它捎带了另一个“父”区块链的安全性。
具体来说，Optimistic Rollups 利用其父链的共识机制（如 PoW 或 PoS），而不是提供自己的。
在 Optimism 的案例中，这个父区块链是以太坊。

<div align="center">
<img width="400" src="../../assets/docs/how-optimism-works/1.png">
</div>

### 块存储

所有 Optimism 区块都存储在以太坊上一个名为 [`CanonicalTransactionChain`]（https://etherscan.io/address/0x5E4e65926BA27467555EB562121fac00D24E9dD2）（或简称 CTC）的特殊智能合约中。
乐观块保存在 CTC 内的仅附加列表中（我们将在下一节中准确解释如何将块添加到此列表中）。
这个仅附加列表形成了 Optimism 区块链。

`CanonicalTransactionChain` 包含保证现有区块列表不能被新的以太坊交易修改的代码。
然而，如果以太坊区块链本身被重组并且过去以太坊交易的顺序被改变，那么这个保证就可能被打破。
Optimism 主网被配置为能够抵抗多达 50 个以太坊区块的区块重组。
如果以太坊经历了比这更大的重组，Optimism 也会重组。

当然，不经历这种重大的区块重组是以太坊的一个关键安全目标。
因此，只要以太坊共识机制也是如此， Optimism 就可以抵御大型区块重组。
正是通过这种关系（至少部分地），Optimism 从以太坊中获得了它的安全属性。

### 块生产

Optimism 区块生产主要由单一方管理，称为“定序器”，它通过提供以下服务来帮助网络：

- 提供即时交易确认和状态更新。
- 构建和执行 L2 块。
- 向 L1 提交用户交易。

定序器没有内存池，交易会按照收到的顺序立即被接受或拒绝。
当用户将他们的交易发送给定序器时，定序器会检查交易是否有效（即支付足够的费用），然后将交易作为待处理块应用到其本地状态。
这些待处理的区块会定期大批量提交给以太坊进行最终确定。
这种批处理过程通过将固定成本分散到给定批次内的所有交易中来显着降低整体交易费用。
定序器还应用了一些基本的压缩技术，以尽量减少发布到以太坊的数据量。

因为定序器被赋予了对 L2 链的优先写访问权限，所以定序器可以提供强有力的保证，一旦它决定一个新的待处理块，它将最终确定什么状态。
换句话说，确切地知道交易的影响是什么。
结果，L2状态可以非常迅速地可靠地更新。
这样做的好处包括快速、即时的用户体验，例如近乎实时的 Uniswap 价格更新。

或者，用户可以完全跳过排序器，并通过以太坊交易直接将他们的交易提交到“CanonicalTransactionChain”。
这通常更昂贵，因为提交此交易的固定成本完全由用户支付，并且不会分摊到许多不同的交易中。
但是，这种替代提交方法的优点是可以抵抗测序仪的审查。
即使定序器正在积极审查用户，用户也始终可以继续在 Optimism 上发送交易。

目前，[OP Labs PBC](https://www.optimism.io/) 运行 Optimism 网络上唯一的区块生产者。
请参阅 [Protocol specs](../protocol/README.md) 部分，了解有关我们计划在未来如何分散 Sequencer 角色的更多信息。

::: 提示 注意
为了让用户能够以抗审查的方式执行 *withdrawals*，rollup 必须允许参与者以不信任的方式将交易 *results* 发布到 Ethereum。
目前，[OP Labs PBC](https://www.optimism.io/) 是唯一能够发布交易结果的实体，同时我们努力去中心化“结果提案”角色。
虽然不是 Optimism 独有的，但在使用系统时了解这些安全属性是值得的。
应该在我们的 [Cannon](https://github.com/ethereum-optimism/cannon/) 故障证明系统的生产版本中引入无许可结果发布。
:::

### 块执行

以太坊节点从以太坊的 p2p 网络下载块。
Optimism 节点直接从“CanonicalTransactionChain”合约中仅附加的块列表中下载块。
有关如何在本合约中存储块的更多信息，请参阅上面关于 [块存储](#block-storage) 的部分。

Optimism 节点由两个主要组件组成，即以太坊数据索引器和 Optimism 客户端软件。
以太坊数据索引器，也称为 [“数据传输层”](https://github.com/ethereum-optimism/optimism/tree/develop/packages/data-transport-layer)（或 DTL），重构了 Optimism 发布到“CanonicalTransactionChain”合约的区块链。
DTL 搜索由“CanonicalTransactionChain”发出的事件，这些事件表明新的 Optimism 块已发布。
然后，它检查发出这些事件的交易，以 [标准以太坊区块格式](https://ethereum.org/en/developers/docs/blocks/#block-anatomy) 重建已发布的区块。

Optimism 节点的第二部分，Optimism 客户端软件，是 [Geth](https://github.com/ethereum/go-ethereum) 的几乎完全原版的版本。
这意味着 Optimism 在本质上与以太坊几乎相同。
特别是，Optimism 共享相同的[以太坊虚拟机]（https://ethereum.org/en/developers/docs/evm/），相同的[帐户和状态结构]（https://ethereum.org/en/ developer/docs/accounts/)，以及相同的 [gas 计量机制和费用表](https://ethereum.org/en/developers/docs/gas/)。
我们将此架构称为 ["EVM Equivalence"](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306)，这意味着大多数以太坊工具（甚至是最复杂的工具）也适用于 Optimism 。

Optimism 客户端软件持续监控新索引块的 DTL。
当一个新块被索引时，客户端软件将下载它并执行其中包含的交易。
在 Optimism 上执行交易的过程与在以太坊上相同：我们加载 Optimism 状态，针对该状态应用交易，然后记录结果状态变化。
然后对 DTL 索引的每个新块重复此过程。

### 在层之间桥接资产

Optimism 旨在让用户可以在 Optimism 和以太坊上的智能合约之间发送任意消息。
这使得在两个网络之间转移资产（包括 ERC20 代币）成为可能。
发生这种通信的确切机制因消息发送的方向而异。

Optimism 在标准桥中使用此功能允许用户将资产（ERC20 和 ETH）从以太坊存入 Optimism，并允许将相同的资产从 Optimism 提取回以太坊。
请参阅 [开发者文档和示例](../developers/bridge/standard-bridge/)，了解有关标准桥的内部工作原理的详细信息。

#### 从以太坊转向 Optimism

要将消息从以太坊发送到 Optimism，用户只需触发以太坊上的“CanonicalTransactionChain”合约，即可在 Optimism 区块上创建一个新区块。
有关其他上下文，请参阅上面关于 [block production](#block-production) 的部分。
用户创建的区块可以包括看似源自生成区块的地址的交易。

#### 从 Optimism 转向以太坊

Optimism 上的合约不可能像以太坊合约可以在 Optimism 上产生交易一样轻松地在以太坊上生成交易。
因此，将数据从 Optimism 发送回以太坊的过程更加复杂。
我们必须能够对以太坊上的合约的乐观状态做出可证明的陈述，而不是自动生成经过身份验证的交易。

对 Optimism 的状态做出可证明的陈述需要以 Optimism 的 [状态树](https://medium.com/@eiki1212/ethereum-state-trie-architecture-explained-a30237009d4e) 根的形式进行[加密承诺](https://en.wikipedia.org/wiki/Commitment_scheme)。
Optimism 的状态在每个区块之后都会更新，因此这个承诺也会在每个区块之后发生变化。
承诺会定期发布（大约每小时一次或两次）到以太坊上称为 [`StateCommitmentChain`](https://etherscan.io/address/0xBe5dAb4A2e9cd0F27300dB4aB94BeE3A233AEB19) 的智能合约。

用户可以使用这些承诺来生成关于 Optimism 状态的 [Merkle 树证明](https://en.wikipedia.org/wiki/Merkle_tree)。
这些证明可以通过以太坊上的智能合约进行验证。
Optimism 维护了一个方便的跨链通信合约，[`L1CrossDomainMessenger`](https://etherscan.io/address/0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1)，它可以代表其他合约验证这些证明。

这些证明可用于对 Optimism 上特定区块高度的任何合约存储中的数据做出可验证的陈述。
然后可以使用此基本功能使 Optimism 上的合约能够向以太坊上的合约发送消息。
Optimism 上的合约可以使用 [`L2ToL1MessagePasser`](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000000) 合约（预部署到 Optimism 网络）将消息存储在 Optimism 状态。
然后，用户可以向以太坊上的合约证明 Optimism 上的给定合约实际上意味着通过显示该消息的哈希已存储在“L2ToL1MessagePasser”合约中来发送某些给定消息。

### 故障证明

在 Optimistic Rollup 中，状态承诺会在没有任何直接证明这些承诺有效性的情况下发布到以太坊。
相反，这些承诺在一段时间内被视为未决（称为“挑战窗口”）。
如果提议的状态承诺在挑战窗口期间（当前设置为 7 天）未受到挑战，则将其视为最终承诺。
一旦一个承诺被认为是最终的，以太坊上的智能合约可以安全地接受基于该承诺的 Optimism 状态的证明。

当状态承诺受到挑战时，可以通过“故障证明”（[以前称为“欺诈证明”]（https://github.com/ethereum-optimism/optimistic-specs/discussions/53））过程使其无效。
如果该承诺被成功挑战，那么它将从“StateCommitmentChain”中删除，最终被另一个提议的承诺所取代。
重要的是要注意，成功的挑战不会回滚 Optimism 本身，只会回滚有关链状态的已发布承诺。
交易的顺序和 Optimism 状态不会因故障证明挑战而改变。

作为 11 月 11 日 [EVM 等效性](https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306) 更新的副作用，故障证明过程目前正在进行重大重新开发。
您可以在本网站的 [协议规范](../protocol/README.md) 部分中阅读有关此过程的更多信息。

## 开始构建

您已经完成了*Optimism 的工作原理*。
我们希望您已经对 Optimism 有所了解。
当然，一段旅程的结束总是另一段旅程的开始。
既然您是 Optimism 方面的专家，是时候开始构建了！

### 立即部署应用程序

在 Optimism 上构建智能合约从未如此简单。
如果您正在寻找入门的地方，我们建议您查看 [我们的开发者文档](../developers)。
在那里，您将找到在 Optimism 上构建和部署您的第一个应用程序所需了解的一切。

### 参与 Optimism

对 Optimism 感到兴奋?
想直接贡献？
前往我们的 [贡献页面](../contribute)，您会在其中找到许多可以积极帮助构建 Optimism 本身的方法的列表。
你也可以尝试加入 [the Optimism discord](https://discord.optimism.io) 来寻找更多的帮助方式。

### 更深了解

*Optimism 工作原理*是Optimism 如何真正运作的高级概述。
如果您有兴趣更深入地研究，您应该查看本网站的 [protocol specs](../protocol) 部分。
