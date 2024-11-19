const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy configuration for API calls
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://newsapi.org', // Target API server
    changeOrigin: true,           // Updates the Host header to match the target
    pathRewrite: {
      '^/api': '', // Remove '/api' from the URL before sending to the target
    },
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
