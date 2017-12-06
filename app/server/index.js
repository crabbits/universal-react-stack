import express from 'express'

import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'

import { StaticRouter } from 'react-router'

import App from '../shared/components'

const app = express()
const PORT = process.env.PORT || 8081

app.use(express.static('./dist'))

app.use((req, res) => {

  const context = {}

  const html = renderToString(
    <StaticRouter
      location={req.url}
      context={context}>
      <App/>
    </StaticRouter>
  )

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
          <script type='application/javascript' src='http://localhost:8080/bundle.js'></script>
        </body>
      </html>
    `)
    res.end()
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})