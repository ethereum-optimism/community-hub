<template>
  <h1 v-if="fetchGasPrice()">Fetched gas price from <a href="https://ethgasstation.info/">ETHGasStation</a>
  </h1>
</template>

<script>
import { fetchGasPrice } from '../helpers'

export default {
  name: 'GasPriceTicker',
  props: {
  },
  methods: {
    fetchGasPrice
  },
}
</script>