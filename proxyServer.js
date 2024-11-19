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


const express = require('express');
const axios = require('axios');
const app = express();

// Base URL for News API
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Proxy all routes under /v2
app.get('/v2/:path*', async (req, res) => {
  try {
    // Forward all query parameters and append the API key
    const query = new URLSearchParams({
      ...req.query,
      apiKey: NEWS_API_KEY,
    }).toString();

    // Build the target URL
    const url = `${NEWS_API_BASE_URL}/${req.params.path}?${query}`;
    const response = await axios.get(url);

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error fetching data from News API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
