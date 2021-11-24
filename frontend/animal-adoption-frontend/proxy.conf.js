const PROXY_CONFIG = [
    {
        context: ['/server'],
        target: 'https://adoption-backend.herokuapp.com',
        secure: true,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/server': '' }
    }
];

module.exports = PROXY_CONFIG;
