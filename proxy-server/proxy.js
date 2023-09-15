const express = require('express');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

// Set up a route to proxy requests to your GitHub-hosted XML file
app.get('/proxy-xml', (req, res) => {
  const githubXmlUrl = 'https://raw.githubusercontent.com/FarahChannir/VASTXML/main/Ad1.xml';

  // Make a request to GitHub to fetch the XML file
  request(githubXmlUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Set the appropriate CORS headers
      res.header('Access-Control-Allow-Origin', '*'); // You can restrict this to specific domains
      res.header('Access-Control-Allow-Methods', 'GET');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

      // Send the XML content in the response
      res.send(body);
    } else {
      // Handle errors
      res.status(500).send('Error fetching XML file from GitHub');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
