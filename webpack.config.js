'use strict'

const path = require('path')

module.exports = {
  entry: './app/client/index.jsx',
  output: {
    path: path.join(__dirname, '/'),
    filename: 'bundle.js',
    publicPath: 'http://127.0.0.1:8080/'
  },
  resolve: {
    modules: ['app', 'app/shared', 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      }
    ]
  },
  devServer: {
    proxy: {
      '*': {
        target: `http://127.0.0.1:${process.env.PORT || 8081}/`
      }
    }
  }
}