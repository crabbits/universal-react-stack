import React from 'react'
import { hydrate } from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { BrowserRouter as Router } from 'react-router-dom'

import App from 'shared/components'

import reducers from 'shared/reducers'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const store = createStore(reducers, preloadedState)

hydrate(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>, 
  document.getElementById('main')
)

if(process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept()
  module.hot.accept('./shared/reducers', () => {
    store.replaceReducer(require('./shared/reducers').default);
  });
}