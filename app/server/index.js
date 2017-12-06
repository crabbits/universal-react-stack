import express from 'express'

import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'

import App from '../shared/components'

const app = express()
const PORT = process.env.PORT || 8081

app.use(express.static('./dist'))

app.get('/', (req, res) => {

  const html = renderToString(
    <App/>
  )

  res.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Universal React Stack</title>
      </head>
      <body>
        <div id='main'>${html}</div>
        <script type='application/javascript' src='bundle.js'></script>
      </body>
    </html>
  `)

  res.end()
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})