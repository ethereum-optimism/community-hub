---
标题: 充值资金至以太坊 Optimistic 网络
语言: CN-中文
---

# {{ $frontmatter.title }}

::: tip
 OVM 2.0 发布日期
OVM 2.0 已经在 Kovan 测试网络上发布。
我们已于 11 月 11 日将其部署到以太坊 Optimistic 生产环境。
:::

## 哪些资金可以充值至以太坊 Optimistic 网络?

### 以太坊

以太坊 Optimistic 网络上的转账需要有 ETH，就像 L1 以太坊上的转账一样（除了费用低了很多）。
这里有一些方法可以让你的以太坊充值至以太坊 Optimistic 网络。

* [The teleporter传送器](https://portr.xyz/)，这是一个托管网关，可以让您最多传送0.05 ETH。
 由于这是一个便宜的托管网关 (意味着您需要相信运行它对人)。
* [ Optimism 网关](https://gateway.optimism.io/)，成本稍微高一些，但同时允许更大金额的转移，
  并使用和以太坊 Optimistic 网络本身相同的底层信任机制。
* [Hop](https://app.hop.exchange/send?token=ETH&sourceNetwork=ethereum&destNetwork=optimism)也允许大额转账，但汇率可能不同于1:1。


### ERC-20 代币

* [Optimism 网关](https://gateway.optimism.io/)。我们有一个 [受支持的 ERC-20 代币列表](https://static.optimism.io/optimism.tokenlist.json)，同时您也不限于此，
 [您可以转移在 L1 和 L2 网络上同时存在的任何代币。](https://optimismpbc.medium.com/arbitrary-token-bridging-d552f6bef694)。

  ::: tip
   **不要** 试图转移并不存在于用户界面中的代币，除非您确保在以太坊 Optimistic 网络上有相同的 ERC-20 代币。 :::

* [第三方跨链桥](https://www.optimism.io/apps/bridges)。 这些跨链桥通常比我们的网关更便宜、更快，但是支持对代币列表相对有限。


## 通过 Optimism 网关进行资产充值

1. [浏览网关页面](https://gateway.optimism.io/).
2. 点击 **CONNECT连接**，选择您的钱包类型，并在钱包内批准连接。
3. 确保以下表格正确：

   * 已选择**Deposit充值** 
    
     <div style="display:inline-block">
     <img src="../../assets/docs/users/getting-started/deposit-form-a.png" alt="Deposit form" width="40%" style="float:left">
     </div>

   * From **MAINNET** 来自**主网**
     <div style="display:inline-block">
     <img src="../../assets/docs/users/getting-started/deposit-form-b.png" alt="Deposit form" width="40%" style="float:left">
     </div>

   * 该资产是您希望存入以太坊 Optimistic 网络的资产。

     <div style="display:inline-block">
     <img src="../../assets/docs/users/getting-started/deposit-form-c.png" alt="Deposit form" width="40%" style="float:left">
     </div>

   * 设置您账户中希望充值对数额，如果您希望存入全部资金，请点击 **MAX** 。

     <div style="display:inline-block">
     <img src="../../assets/docs/users/getting-started/deposit-form-d.png" alt="Deposit form" width="40%" style="float:left">
     </div>      

4. 点击 **DEPOSIT**。
5. 再次点击 **DEPOSIT** 确认。
6. 在钱包中确认交易，等待交易确认后即可将 ETH 存入 以太坊 Optimistic 网络。
7. [浏览此处](https://chainid.link/?network=optimism) 并点击**connect连接** 将以太坊 Optimistic 网络添加到您的钱包。 
    您需要在钱包中批准添加的动作。 Metamask 小狐狸钱包的网络通知如下图， 其他钱包应该也是类似的。

      <div style="display:inline-block">
      <img src="../../assets/docs/users/getting-started/add-net-metamask.png" alt="MetaMask add network notification" width="40%" style="float:left">
      </div>   