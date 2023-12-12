const fs = require('fs')

const redirectsFilePath = 'src/.vuepress/public/_redirects'
const outputFilePath = 'src/.vuepress/redirects.js'

const lines = fs.readFileSync(redirectsFilePath, 'utf-8').split('\n')
const routes = {}
lines.forEach(line => {
  const [source, destination] = line.split(/\s+/)
  routes[source] = destination
})

fs.writeFileSync(outputFilePath, `export default ${JSON.stringify(routes, null, 2)}`)
