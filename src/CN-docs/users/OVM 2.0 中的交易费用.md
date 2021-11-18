---
标题: OVM 2.0 中的交易费用
语言: CN-中文
---

::: 提示 OVM 2.0 发布日期
OVM 2.0 is already released on the Kovan test network.
OVM 2.0 已经在 Kovan 测试网络上发布。我们预计将在 11 月 11 日将其部署到以太坊 Optimistic 网络。:::


# {{ $frontmatter.title }}

::: 提示OVM 2.0 页面 此页面指的是OVM 2.0 更新后以太坊 Optimistic 网络的**最新**状态。:::

## 费用简述

在大多数情况下，以太坊 Optimistic 网络上的转账手续费要明显低于以太坊主网上的费用。
每一笔以太坊 Optimistic 网络手续费都包含两个成本:

您支付两项费用的总和：您的 L2（执行）费用和您的 L1 （安全）费用。在较高级别上，
L2 费用是在 L2 中执行您的交易的成本，而 L1 费用是将您的交易提交至 L1 （在汇总批次中） 对预估成本。

1. **L2 执行手续费** 是按照 `tx.gasPrice * l2GasUsed` 
   (最高至 `tx.gasLimit`)收取. [您可以在此处查看当前实时对 L2 gas 即转账手续费](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)。在撰写本文时，
   L2 gas 费用为 0.001 gwei，当然这取决与网络拥堵对情况。
   
2. **L1 安全手续费** 自动按 `l1GasPrice * l1GasUsed`收取。这是将交易数据存储到 L1 上到成本。 

   - `l1GasPrice` 与 L1 以太坊中的正常 gas 费用相同。
   - `l1GasUsed`计算为 `1.5*(2750 gas + calldataGas)`。 因此，您的交易包含的 calldata 越多，您的 L1 费用就越贵。
   例如， ETH 转账没有 calldata，所以它的 L1 费用最便宜，而大型合约部署可能有超过 25kb 的 calldata，
   将导致较高的 L1 费用。 我们目前在 L1 费用中增加了 50% 的管理费用，来确保支付的费用能涵盖实际的 L1 总成本。

要在以太坊 Optimistic 网络上获得 ETH， 您可以通过 [https://gateway.optimism.io/](https://gateway.optimism.io/) 在 Kovan 或 以太坊主网上存入 ETH。
 很快，您还可以通过 [https://hop.exchange/](https://hop.exchange/) 以相对稍微便宜点价格存入ETH。
