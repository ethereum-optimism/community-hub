<template>
  <div v-html="included"></div>
</template>

<script>
export default {
  data: () => {return {"included": `

<!-- HTML to display goes here. I don't know how to do it in Markdown -->

<p>
Optimistic Ethereum token balances are available through the ERC-20 interface, 
same as on L1. However, note that a token's L2 address may differ from that token's 
L1 address. You can see the known tokens, and their addresses, in 
<a href="https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/optimism.tokenlist.json"
    target="_blank">
this list</a>.
</p>

<p>
For example, to show a user's total DAI (real DAI, not the Kovan testing equivalent), you
need to query:
</p>

<table><tr>
  <th>Chain</th>
  <th>ERC-20 Contract Address</th>
</tr><tr>
  <td>L1</td>
  <td>0x6B175474E89094C44Da98b954EedeAC495271d0F</td>
</tr><tr>
  <td>Optimistic Ethereum</td>
  <td>0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1</td>
</tr></table>

<p>
And possibly additional L2 chains such as Arbitrum or Polygon.
</p>


  `}
  }
}     // export default
</script>
