<template>
  <div v-html="included"></div>
</template>

<script>
export default {
  data: () => {return {"included": `

<!-- HTML to display goes here. I don't know how to do it in Markdown -->

<p>
Transaction fees in Optimistic Ethereum are 
<a href="/docs/developers/l2/new-fees.html"
              target="_blank">a bit complicated</a>
You can use <a href="/docs/developers/l2/new-fees.html#for-frontend-and-wallet-developers"
              target="_blank">
this code sample</a> to
show users how much a transaction will cost in advance.


  `}
  }
}     // export default
</script>
