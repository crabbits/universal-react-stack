import React from 'react'
import { hydrate } from 'react-dom'

import App from 'shared/components'

hydrate(
  <App/>, document.getElementById('main')
)