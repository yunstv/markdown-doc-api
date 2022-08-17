import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import fs from 'fs'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

// 应用文件根路径
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// development production
module.exports = (ENV) => {
  const isProd = ENV === 'production'
  const config = {
    mode: ENV,
    entry: {
      app: {
        import: [resolveApp('./src/web/index.js')]
      },
    },
    output: {
      pathinfo: false,
      path: resolveApp('build'),
      publicPath: process.env.PUBLIC_URL,
      // 按需加载
      chunkFilename: () => {
        return isProd ? 'js/[id].[chunkhash:7].async.js' : '[id].js'
      },
      // 同步加载
      filename: (pathData) => {
        if (isProd) {
          const path = {
            vendors: 'js/vendors.[contenthash:5].js',
            app: 'js/app.[contenthash:5].js'
          }
          return path[pathData.chunk.name] || 'js/[id].[contenthash:12].bundle.js'
        }
        const path = {
          vendors: 'vendors.js',
          app: 'app.js'
        }
        return path[pathData.chunk.name] || '[id].bundle.js'
      }
    },
    resolve: {
      alias: {
        root: resolveApp('src/web/'),
        css: resolveApp('src/web/assets/css/'),
        images: resolveApp('src/web/assets/images/'),
        docs: resolveApp('src/docs/'),
        '@docs': resolveApp('public/docs/'),
        comp: resolveApp('src/web/components/')
      },
      extensions: ['.js', '.jsx', '.sass', '.scss', '.png', '.jpg']
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          include: resolveApp('src'),
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                // `dart-sass` 是首选
                implementation: require('sass'),
                sassOptions: {
                  fiber: require('fibers')
                }
              }
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(png|jpg|gif)$/i,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader'
            },
            {
              loader: 'markdown-loader'
            }
          ]
        }
      ]
    },
    optimization: {
      // 开发环境建议
      /* ...{
        runtimeChunk: true,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      }, */
      // 生产环境配置
      moduleIds: 'hashed',
      runtimeChunk: 'single',
      // 提取公用库
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PUBLIC_URL': encodeURIComponent(process.env.PUBLIC_URL)
      }),
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].[chunkhash:12].css'
      }),
      new HtmlWebpackPlugin({ template: resolveApp('public/index.html') })
    ]
  }
  return config
}