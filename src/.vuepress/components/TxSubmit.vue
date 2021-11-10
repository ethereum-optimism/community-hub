<template>
  <div v-html="included"></div>
</template>

<script>
export default {
  data: () => {return {"included": `

<!-- HTML to display goes here. I don't know how to do it in Markdown -->
<p>
Transaction submission to Optimistic Ethereum is almost identical to submitting the 
same transactions in L1. There are only two differences you need to remember:
</p>

<ol>
<li> Transaction fees. The <b>L2 execution fee</b>, the <code>gasPrice*gasUsed</code>, 
     represents just a tiny portion of the actual cost. The real cost is the 
     <b>L1 security fee</b>, of which users need to be aware (see below)
<li> Currently Optimistic Ethereum is still on the Berlin fork, and therefore it cannot 
     accept <a href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md" target="_blank">
     EIP-1559</a> transactions.     
</ol>
  `}
  }
}     // export default
</script>
