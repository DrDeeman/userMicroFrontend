const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');
require('dotenv').config();
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = merge(config, {
  mode: 'development',
  devServer: {
    //static:path.join(__dirname,"dist"),
    port: 3001,
    historyApiFallback: true,
    proxy: {
      
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'users',
      filename: 'remoteUsers.js',
      exposes: {
        './Users': './src/App/test_component.js',
      },
      remotes: {
        'app1': 'product_users@http://localhost:3002/remoteProduct.js'
      }
    })
  ],
});
