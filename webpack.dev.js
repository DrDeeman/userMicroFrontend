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
      '/users_api/*': {
        target: 'http://[::1]:8091/',
        pathRewrite: { '^/users_api': '' },
        changeOrigin: true,
      },
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
        'app1': remoteConfig('product_users','"http://localhost:3002/remoteProduct.js"')
      }
    })
  ],
});


function remoteConfig(name,url){
  return `promise new Promise(resolve => {
        
    const remoteUrlWithVersion = ${url};
    const script = document.createElement('script');
    script.src = remoteUrlWithVersion;

    script.onload = () => {
      
      const proxy = {
        get: (request) => {
         
          return window.${name}.get(request);
        },
        init: (arg) => {
          try {
            
            return window.${name}.init(arg)
          } catch(e) {
            console.log('remote container already initialized')
          }
        }
      }
      resolve(proxy)
    }
    script.onerror = (error) => {
      console.error('error loading remote container')
      const proxy = {
        get: (request) => {
          // If the service is down it will render this content
          return Promise.resolve(() => () => false);
        },
        init: (arg) => {
          return;
        }
      }
      resolve(proxy)
    }
    // inject this script with the src set to the versioned remoteEntry.js
    document.head.appendChild(script);
  })
  `
}
