import React from 'react'

import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      React! Yay!
      <NavLink to='/about'>About</NavLink>
      <NavLink to='/team'>Team</NavLink>
    </div>
  )
}

export default Home