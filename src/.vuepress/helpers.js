const data = ref(null)
const loading = ref(true)
const error = ref(null)

async function fetchGasPrice () {
  loading.value = true

  try {
    const response = await fetch(
      'https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=' + process.env.ETH_GAS_STATION_API_KEY, {
      method: 'get',
      headers: {
        'content-type': 'application/json'
      }
    })

    if (!response.ok) {
      const error = new Error(response.statusText)
      error.json = response.json()
      throw error
    }

    const json = await response.json()
    data.value = json.data
  } catch (err) {
    error.value = err

    if (err.json) {
      return err.json.then(json_1 => {
        error.value.message = json_1.message
      })
    }
  }

  loading.value = false
}

module.exports = { fetchGasPrice }