<template>
  <div v-html="included"></div>
</template>

<script>
export default {
  data: () => {return {"included": `

<!-- HTML to display goes here. I don't know how to do it in Markdown -->

There are two places where a user might switch into Optimistic Ethereum:

<ol>
<li>On the wallet. To make this task easy, wallets need to 
    have <a href="/docs/infra/networks.html">connection details</a> 
    for Optimistic Ethereum. Note that you can choose between using 
    our own endpoints, which are rate limited, and using commercial 
    endpoints.

<li> On the front end, using 
   <a href="https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain"
      target="_blank">
   <code>wallet_addEthereumChain</code></a> and 
   <a href="https://docs.metamask.io/guide/rpc-api.html#wallet-switchethereumchain"
      target="_blank">
   <code>wallet_switchEthereumChain</code></a> 
   You can see an example of this code on 
   <a href="https://chainid.link/?network=optimism" target="_blank">chainid.link</a>.
</ol>

<table border><tr><td>
<p>
If you are a wallet developer you **must** ask for user confirmation if you receive these 
two RPC methods. They can be abused by an unscrupulous front end.
</p>
</td></tr></table>


  `}
  }
}     // export default
</script>
