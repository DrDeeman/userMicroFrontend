const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = merge(config, {
  mode: 'production',
  output:{
    publicPath:'http://127.0.0.1:8050/users_api/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.I18N_DEBUG': JSON.stringify(false),
    }),
    new ModuleFederationPlugin({
      name: 'product_users',
      filename: 'remoteUsers.js',
      exposes: {
        './Users': './src/App/test_component.js',
      },
      remotes: {
       'app1': 'products@http://127.0.0.1:8050/products_api/remoteProduct.js'
      },
      shared:{
        'react':{singleton: true, strictVersion: false, eager: true, requiredVersion:'^18.0.0'},
        'react-dom':{singleton: true, strictVersion: false, eager: true,requiredVersion:'^18.0.0'},
      }
    })
  ],
});