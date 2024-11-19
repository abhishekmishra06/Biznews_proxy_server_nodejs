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
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();



require('dotenv').config();
 



const NEWS_API_KEY = process.env.NEWS_API_KEY; // Fetch the API key from the environment

// Proxy middleware
app.use(
  '/api', // Proxy only requests starting with '/api'
  createProxyMiddleware({
    target: 'https://newsapi.org', // Forward to the target API
    changeOrigin: true, // Handle CORS issues
    pathRewrite: {
      '^/api': '' // Remove '/api' before forwarding
    },
    onProxyReq: (proxyReq, req) => {
      // Attach the API key to the query string
      const url = new URL(proxyReq.path, 'https://newsapi.org');
      url.searchParams.set('apiKey', NEWS_API_KEY);
      proxyReq.path = url.pathname + url.search;
    }
  })
);

module.exports = app;