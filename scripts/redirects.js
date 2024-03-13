const fs = require('fs');

// Define the path to the redirects file and the output file
const redirectsFilePath = 'src/.vuepress/public/_redirects';
const outputFilePath = 'src/.vuepress/redirects.js';

// Read the redirects file and split it into lines
const lines = fs.readFileSync(redirectsFilePath, 'utf-8').split('\n');

// Initialize an empty object to store the routes
const routes = {};

// Iterate over each line, splitting it into source and destination
lines.forEach(line => {
 const [source, destination] = line.split(/\s+/);
 routes[source] = destination;
});

// Write the routes object to the output file in a formatted JSON string
fs.writeFileSync(outputFilePath, `export default ${JSON.stringify(routes, null, 2)}`);
