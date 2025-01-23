const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  createProxyMiddleware({
    target: 'http://4.236.218.156:8080',  // Your backend HTTP URL
    changeOrigin: true,
    secure: false,  // Disable SSL validation if your backend doesn't have HTTPS
    pathRewrite: {
      '^/api': '/api', // Keep the same API path in the request
    },
  })(req, res);
};
