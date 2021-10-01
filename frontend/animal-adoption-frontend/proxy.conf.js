const PROXY_CONFIG = [
    {
        context: ['/server'],
        target: 'http://localhost:8000',
        secure: false,
        // changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/server': '' }
    }
];

module.exports = PROXY_CONFIG;