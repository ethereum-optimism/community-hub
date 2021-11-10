<template>
  <div v-html="included"></div>
</template>

<script>
export default {
  data: () => {return {"included": `

<!-- HTML to display goes here. I don't know how to do it in Markdown -->
<p>
<a href="/docs/infra/networks.html" target="_blank">You can see the PRC endpoints here</a>. 
You can choose between our own endpoints, which are free but rate limited, 
and commercially available ones.
</p>
  `}
  }
}     // export default
</script>
