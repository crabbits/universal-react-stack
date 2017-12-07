import express from 'express'
import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'

import { StaticRouter } from 'react-router'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import App from '../shared/components'

import reducers from '../shared/reducers'

const app = express()
const PORT = process.env.PORT || 8080

if(process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../../webpack.config.js')

  const compiler = webpack(webpackConfig)

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      assets: false,
      colors: true,
      chunks: false,
      'errors-only': true
    }
  }))

  app.use(webpackHotMiddleware(compiler))
  app.use(express.static(path.resolve(__dirname, 'app')))
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')))
}

app.use((req, res) => {

  const context = {}
  const store = createStore(reducers)

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  )

  const preloadedState = store.getState()

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Universal React Stack</title>
        </head>
        <body>
          <div id='main'>${html}</div>
          <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <script type='application/javascript' src='/bundle.js'></script>
        </body>
      </html>
    `)
    res.end()
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`)
})