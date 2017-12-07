import React     from 'react'
import { shallow } from 'enzyme'

import { expect } from 'chai'

import Home from '../../../app/shared/components/pages/home'

describe('<Home />', () => {
  it('renders Home text', () => {
    const wrapper = shallow(<Home/>)
    expect(wrapper.contains('React! Yay!')).to.equal(true)
  })
})