// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.GENERATE_SOURCEMAP = false;

const configFactory = require('./webpack.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = configFactory('production')
config.plugins.unshift(
  new CleanWebpackPlugin()
)

export default config