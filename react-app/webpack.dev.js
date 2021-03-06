const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    port: 8082,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        changeOrigin: true
      }
    }
    // proxy: "http://localhost:8090",
    // open: true
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.less'],
    alias: {
      container: path.resolve(__dirname, 'src/container'),
      component: path.resolve(__dirname, 'src/component'),
      public: path.resolve(__dirname, 'src/public'),
      api: path.resolve(__dirname, 'src/api')
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.(less)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader']
      })
    }, {
      test: /\.(css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    }, {
      test: /\.(png|jpe?g|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8196,
          name: 'image/[name].[ext]'
        }
      }]
    }, {
      test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8196,
          name: 'font/[name].[ext]'
        }
      }]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'React-Antd',
      favicon: './src/favicon.ico'
    }),
    new ExtractTextPlugin('style/index.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/[name].js'
    })
  ]
};