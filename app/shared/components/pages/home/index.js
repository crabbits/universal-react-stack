import React from 'react'

import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      React! Yay!
      <NavLink to='/about'>About</NavLink>
    </div>
  )
}

export default Home