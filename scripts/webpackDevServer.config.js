import path from 'path'

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '127.0.0.1';

module.exports = function(proxy, allowedHost) {
  return {
    port:4001,
    hotOnly: true,
    compress: true,
    clientLogLevel: 'none',
    contentBase: path.join(__dirname, '../../public'),
    publicPath: '/',
    public: allowedHost,
    watchContentBase: true,
    hot: true,
    proxy,
    open: true,
    host,
    https: protocol === 'https',
  };
};
