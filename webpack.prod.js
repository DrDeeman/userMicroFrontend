const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('webpack');

module.exports = merge(config, {
  mode: 'production',
  output:{
    publicPath:'http://127.0.0.1:8200/users_api/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.I18N_DEBUG': JSON.stringify(false),
    }),
    new ModuleFederationPlugin({
      name: 'user',
      filename: 'remoteUsers.js',
     // remoteType:'var',
      //library:{type:"var",name:"user"},
      exposes: {
        './Users': './src/App/test_component.js',
      },
      remotes: {
       'app1': 'product_users@http://127.0.0.1:8061/products_api/remoteProduct.js'
      //'app1':'products'
      },
      shared:{
        'react':{singleton: true, strictVersion: false, eager: true, requiredVersion:'^18.0.0'},
        'react-dom':{singleton: true, strictVersion: false, eager: true,requiredVersion:'^18.0.0'},
      }
    })
  ],
});