const PROXY_CONFIG = [
    {
        context: ['/server'],
        target: 'http://0.0.0.0:8000',
        secure: false,
        // changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/server': '' }
    }
];

module.exports = PROXY_CONFIG;