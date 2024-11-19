// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const app = express();

// // Proxy configuration for API calls
// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'https://newsapi.org', // Target API server
//     changeOrigin: true,           // Updates the Host header to match the target
//     pathRewrite: {
//       '^/api': '', // Remove '/api' from the URL before sending to the target
//     },
//   })
// );

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`Proxy server running at http://localhost:${PORT}`);
// });

// const express = require('express');
// const axios = require('axios');
// require('dotenv').config(); // Make sure dotenv is loaded to get the environment variables

// const app = express();
// const port = process.env.PORT || 4000; // Set a default port if not specified

// // News API key from environment variable
// const NEWS_API_KEY = process.env.NEWS_API_KEY;
// if (!NEWS_API_KEY) {
//     console.error('NEWS_API_KEY is not defined!');
//   }
// // Proxy News API requests
// app.get('/v2/:path*', async (req, res) => {
//   const queryParams = new URLSearchParams({
//     ...req.query,
//     apiKey: NEWS_API_KEY, // Add your API key to the query params
//   }).toString(); // Construct the query params string

//   try {
//     // Construct the full URL with query parameters
//     const url = `https://newsapi.org/v2/${req.params.path}?${queryParams}`;

//     // Log the URL to check if it is correct
//     console.log(`Request URL: ${url}`);
//     console.log(`Request URL: ${NEWS_API_KEY}`);
 
//     // Make the request to the external API
//     const response = await axios.get(url);

//     // Send back the response from News API
//     res.status(response.status).json(response.data);
//   } catch (error) {
//     console.error('Error:', error.message);
//     // Log the URL even if there's an error
//     console.log(`Failed URL: https://newsapi.org/v2/${req.params.path}?${queryParams}`);
//     res.status(500).json({ error: 'Failed to fetch data from News API' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });






const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Make sure dotenv is loaded to get the environment variables

const app = express();
const port = process.env.PORT || 4000; // Set a default port if not specified

// News API key from environment variable
const NEWS_API_KEY = process.env.NEWS_API_KEY;

if (!NEWS_API_KEY) {
  console.error('NEWS_API_KEY is not defined!');
}

// Proxy News API requests
app.get('/v2/:path*', async (req, res) => {
  try {
    // Use URLSearchParams to handle query parameters correctly
    const queryParams = new URLSearchParams({
      ...req.query,  // Preserve any query parameters from the incoming request
      apiKey: NEWS_API_KEY, // Add your API key to the query params
    }).toString();  // Convert the query parameters into a string

    // Construct the full URL correctly, adding /v2 before the endpoint
    const url = `https://newsapi.org/v2/${req.params.path}?${queryParams}`;

    console.log(`Request URL: ${url}`); // Log the constructed URL



    console.log(`Request URL: ${NEWS_API_KEY}`);

    console.log(`Request URL: ${queryParams}`);




    // Make the request to the external API
    const response = await axios.get(url);

    // Send back the response from News API
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from News API' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});