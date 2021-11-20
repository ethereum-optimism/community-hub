---
标题: 以太坊 Optimistic 入门指南
语言: 中文
---

# {{ $frontmatter.title }}

::: tip
 OVM 2.0 发布日期
OVM 2.0 已经在 Kovan 测试网络上发布。
我们预计将在 11 月 11 日将其部署到以太网 Optimistic 生产环境。
:::

## 为什么使用以太坊 Optimistic 网络?

以太坊 Optimistic 网络允许您发送交易，类似于以太坊，但具有两个重要优势：

* **近乎即时的交易结果反馈。** 您几乎可以立即知道您的交易是否完成。
* **更低的交易手续费。** 通常在 L1 成本的 1% 到 10% 之间。
  [关于当前的 gas 费用和一些示例交易的成本，请参见此处。](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)
* **去中心化。** 所有交易都发布到L1 以太坊，继承了以太坊强大的安全保障。

## 存放资产

在 Optimistic 以太坊上使用资产（Eth、ERC-20 代币等）之前，您需要使用 [跨链桥](https://www.optimism.io/apps/dapps)。对于存入 ETH，您可以使用 [我们自己的跨链桥](https://gateway.optimism.io/)。

1. 如果您没有 ETH，可以通过中心化交易所购买一些，例如 
   [Coinbase](https://www.coinbase.com/signup)、 [Gemini](https://exchange.gemini.com/register)
   或者 [Binance](https://accounts.binance.com/en/register)。
2. 设置一个钱包，例如 [Metamask](https://metamask.io/)，然后将 ETH 从中心化交易所提币到您的钱包中。   
3. [进入我们的跨链桥](https://gateway.optimism.io/)。
4. 点击 **CONNECT**, 选择您的钱包类型，并在询问时在钱包内批准连接。
5. 确保选择了正确的选项：

   * 已选定 **Deposit** 

     <div style="display:inline-block">
     <img src="../../assets/docs/users/getting-started/deposit-form-a.png" alt="Deposit form" width="40%" style="float:left">
     </div>

   * 从以太坊 **MAINNET**

     <div style="display:inline-block">
     <img src="../../assets/docs/users/getting-started/deposit-form-b.png" alt="Deposit form" width="40%" style="float:left">
     </div>

   * 选定代币为 **ETH**.

     <div style="display:inline-block">
     <img src="../../assets/docs/users/getting-started/deposit-form-c.png" alt="Deposit form" width="40%" style="float:left">
     </div>

   * 请确保此处输入的ETH数额小于钱包余额，同时您可以点击MAX查看您当前可存入的最大数额（由于考虑转账手续费，所以MAX数额会略小于钱包余额）。

     <div style="display:inline-block">
     <img src="../../assets/docs/users/getting-started/deposit-form-d.png" alt="Deposit form" width="40%" style="float:left">
     </div>

6. 点击 **DEPOSIT**.
7. 再次点击 **DEPOSIT** 进行确认。
8. 在钱包中确认交易，等待交易确认即可将ETH存入以太坊 Optimistic 网络。
9. [浏览此处](https://chainid.link/?network=optimism)点击**connect** 将 Optimistic Ethereum 网络添加到您的钱包。
   您需要在钱包中批准此添加动作。MetaMask 中的网络通知如下图，其他钱包也应该类似

      <div style="display:inline-block">
      <img src="../../assets/docs/users/getting-started/add-net-metamask.png" alt="MetaMask add network notification" width="40%" style="float:left">
      </div>   

## 应用程序

以太坊 Optimistic 网络现已支持 [大量且仍不断增长的应用程序列表](https://www.optimism.io/apps/all). 要想将您的钱包网络更改为 Optimistic Ethereum，
请单击网页中的 **Withdraw** 并在钱包中确认网络切换即可。

### Uniswap <img src="../../assets/docs/users/getting-started/uniswap-logo.png" align="right" width="50px">

Uniswap 允许您在资产之间进行交换。它是目前最常用的开源以太坊应用程序，因此这里添加了步骤说明，让您了解该应用程序的使用方式与它们在以太坊L1上的使用方式相同。

1. 打开 [Uniswap 应用程序](https://app.uniswap.org/#/swap).
2. 点击 **连接钱包** 并在钱包内进行确认. 
   如有必要，将钱包中的网络切换到 **Optimism**.
3. 选择:

   A. 您支付的代币

      <div style="display:inline-block">
      <img src="../../assets/docs/users/getting-started/swap-form-a.png" alt="Swap form" width="40%" style="float:left"> 
      </div>

   B. 您想要交易获得的代币

      <div style="display:inline-block">
      <img src="../../assets/docs/users/getting-started/swap-form-b.png" alt="Swap form" width="40%" style="float:left">
      </div>

   C. 输入您愿意支付的代币数额或者在下行输入希望通过交易获得的代币数额。

      <div style="display:inline-block">
      <img src="../../assets/docs/users/getting-started/swap-form-c.png" alt="Swap form" width="40%" style="float:left">
      </div>

4. 点击 **Swap**.
5. 点击 **Confirm Swap**.
6. 在钱包中确认交易。
7. 交易执行后，浏览 [Optimistic 
   Ethereum 的 Etherscan区块浏览器](https://optimistic.etherscan.io/) 然后输入您的钱包地址. 
   确认您现在拥有正确数量的新代币。   

   <img src="../../assets/docs/users/getting-started/etherscan.png" alt="Etherscan with result" width="50%">   


## 提取资产

Optimism 网关需要 7 天时间将资金从Optimism网络提取到以太坊主网，因为它需要支持验证挑战。因此，如果其他跨链桥
 (例如[Hop](https://app.hop.exchange/send?sourceNetwork=optimism&destNetwork=mainnet&token=USDC) 或者
[cBridge](https://cbridge.celer.network/#/))支持您需要提现的资产类型，使用它们会更快，而且通常更便宜。在本教程中，我们使用 Hop 为例。

1. 浏览打开 [Hop.Exchange](https://app.hop.exchange/send?sourceNetwork=optimism&destNetwork=mainnet&token=USDC).
2. 选择:

   A. 资产类型

      <div style="display:inline-block">
      <img src="../../assets/docs/users/getting-started/withdraw-form-a.png" alt="Deposit form" width="40%" style="float:left">
      </div>

   B. 源网络（如果你需要将资产提出，这是 **Optimism**)

      <div style="display:inline-block">
      <img src="../../assets/docs/users/getting-started/withdraw-form-b.png" alt="Deposit form" width="40%" style="float:left">
      </div>   

   C. 提现金额（或**MAX**）

      <div style="display:inline-block">
      <img src="../../assets/docs/users/getting-started/withdraw-form-c.png" alt="Deposit form" width="40%" style="float:left">
      </div>

   D. 目标网络

      <div style="display:inline-block">
      <img src="../../assets/docs/users/getting-started/withdraw-form-d.png" alt="Deposit form" width="40%" style="float:left">
      </div>

3. 向下滚动，接受交易费用并点击**批准**.
4. 清除 **全部批准** 将 Hop 的支出限额限制为您可以提取的金额，然后再次单击 **批准** 进行确认.
5. 在钱包中确认交易。
6. 点击 **Send**，允许钱包中的网络切换，再次点击 **Send** , 在钱包中确认交易。
7. 几分钟后，您将在 L1 中取回资产（已扣除转移的费用）.  