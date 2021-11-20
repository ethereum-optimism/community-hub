---
标题: 从以太坊 Optimistic 网络提款
语言: CN-中文
---

# {{ $frontmatter.title }}

::: tip 
我的资金在那里？
如果您使用Optimism 网官进行提款并且不确定您的提款发生了什么，请
[在此处搜索交易哈希hx](https://optimistic.etherscan.io/messagerelayer), 
提款可能仍在有效挑战期内（validity challenge period）。
或者，您可能只需要 [申领提款资金](#申领提款资金).
:::

::: warning 
中心化交易所
当您将资产转移到一个中心化交易所时，您会将资金发送到该中心化交易所提供的地址。默认情况下，这是一
个 L1 地址，同时交易所一般 **不会** 在以太坊 Optimistic 网络上查看该地址。这意味着，直接将资金提款到不
支持以太坊 Optimistic 网络的中心化交易所，将导致资金不可挽回地丢失。**千万不要这样做！**

当中心化交易所支持以太坊 Optimistic 网络时，我们将第一时间进行公布。
:::


## 哪些资产可以提现?

### 以太坊

截至目前，有两种方法可以提款以太坊：

1. [Hop 交易所](https://app.hop.exchange/send?token=ETH&sourceNetwork=optimism&destNetwork=ethereum)，通过它提款，速度会很快，同时会预先提示您提款的手续费成本。

2. [ Optimism 网关](https://gateway.optimism.io/)，通过它提款以太坊需要通过挑战验证期（the challenge verification period，为期一周），然后进行[申领提款资金](#claim-the-withdrawal)，这一步需要额外的gas手续费。


### ERC-20 代币

1. [ Optimism 网关](https://gateway.optimism.io/)。我们有一个 [支持的 ERC-20 代币列表](https://static.optimism.io/optimism.tokenlist.json)，同时您不会受限于此， [您可以选择在 L1 和 L2 存在的任何代币](https://optimismpbc.medium.com/arbitrary-token-bridging-d552f6bef694)。

2. [第三方跨链桥](https://www.optimism.io/apps/bridges)。这些跨链桥通常比我们对主网关更快、更便宜，但同时支持的代币会更有限。其工作方式是跨链桥将 L1（主网上）的相关资产先借贷给您。

  当特定资产积累足够时，跨链桥会将所有代币一次性通过网关提现至 L1。通过这种方式：

  * 您不需要通过挑战验证期。跨链桥承担了交易块（或先前的交易块）无效的风险。通常跨链桥会自己运行验证，所以对他们来说风险不大。
  * 将提款交易所需的默克尔证明的成本分散在更大的代币池中，因此提款的相对成本更小了。 



## 通过 Optimism 网关进行提款

通过 Optimism 网关进行提款是一个多步骤过程：

1. 在以太坊 Optimistic 网络上 [发起提款](#发起提款) 。
2. [等待验证挑战期](#等待期)，即从交易在 L1 上发布之日起*7天*。 
   正常情况下交易会很快在 L1 上发布，但在中断对情况下可能需要更长时间。在这种情况下，您可能需要更长时间才能申请提款。
3. [申领提款资金](#申领提款资金)

### 发起提款

1. [浏览网关](https://gateway.optimism.io/).
2. 点击 **CONNECT连接**，选择钱包类别，并在钱包内批准连接请求。
3. 确保下列表格是正确的:

   * 已选择**Withdraw提现** 
    
     <div style="display:inline-block">
     <img src="../../assets/docs/users/withdraw/withdraw-form-a.png" alt="Withdrawal form" width="40%" style="float:left">
     </div>

   * 从 **OPTIMISTIC ETHEREUM即以太坊 OPtimistic 网络**提款

     <div style="display:inline-block">
     <img src="../../assets/docs/users/withdraw/withdraw-form-b.png" alt="Withdrawal form" width="40%" style="float:left">
     </div>

   * 资产选择您可以提现的资产。

     <div style="display:inline-block">
     <img src="../../assets/docs/users/withdraw/withdraw-form-d.png" alt="Withdrawal form" width="40%" style="float:left">
     </div>

   * 设定您账户中可以提现的数额。如果您想提现所有数额，请点击**MAX** 。
   
     <div style="display:inline-block">
     <img src="../../assets/docs/users/withdraw/withdraw-form-c.png" alt="Withdrawal form" width="40%" style="float:left">
     </div>


4. 点击 **WITHDRAW提现**。
5. 再次点击 **WITHDRAW提现**。
6. 在钱包中确认交易。

### 等待期

有几种方法可以查看您的提款是否已准备好可以进行领取：

*  [浏览网关](https://gateway.optimism.io/) 并单击您的账号。这会向您显示最近提款的列表及其状态：

  <div style="display:inline-block">
  <img src="../../assets/docs/users/withdraw/withdrawal-gw-1.png" alt="Withdrawal date on the gateway" width="40%" style="float:left">
  </div>

  点击特定的提款明细产看还需要多久可以领取。

  <div style="display:inline-block">
  <img src="../../assets/docs/users/withdraw/withdrawal-gw-2.png" alt="Withdrawal date on the gateway" width="40%" style="float:left">
  </div>

*  [在Optimistic Etherscan 浏览器上](https://optimistic.etherscan.io/messagerelayer)搜索交易哈希。 
  如果提款准备就绪，您就可以点击 **Execute执行**按钮。
  
*  您可以在 [Optimistic Etherscan 浏览器上](https://optimistic.etherscan.io/)搜索交易哈希。点击 L1 State Root Submission Tx。

  <div style="display:inline-block">
  <img src="../../assets/docs/users/withdraw/withdrawal-etherscan-1.png" alt="Withdrawal date on Etherscan" width="40%" style="float:left">
  </div>

  当交易被确认时，验证挑战期就开始了：

  <div style="display:inline-block">
  <img src="../../assets/docs/users/withdraw/withdrawal-etherscan-2.png" alt="Withdrawal date on Etherscan" width="40%" style="float:left">
  </div>

### 申领提现资金

1. 当挑战期结束后，网关中对交易状态将更新为**Ready to claim!可以领取了！**。点击交易条目。

   <div style="display:inline-block">
   <img src="../../assets/docs/users/withdraw/claim-a.png" alt="Claiming" width="40%" style="float:left">
   </div>

2. 点击 **CLAIM WITHDRAWAL申领提现资金**，等待创建交易，并在钱包内批准交易。申领成功！

   <div style="display:inline-block">
   <img src="../../assets/docs/users/withdraw/claim-b.png" alt="Claiming" width="40%" style="float:left">
   </div>
