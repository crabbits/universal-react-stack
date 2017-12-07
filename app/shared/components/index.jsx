import React from 'react'

import { Switch, Route } from 'react-router-dom'

import {
  Home,
  About,
  Team,
  NoMatch
} from './pages'

const App = () => {
  return(
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/about' component={About} />
      <Route path='/team' component={Team} />
      <Route component={NoMatch}/>
    </Switch>
  )
}

export default App