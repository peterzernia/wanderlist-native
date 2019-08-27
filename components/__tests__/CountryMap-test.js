import React from 'react'
import { shallow } from 'enzyme'
import CountryMap from '../CountryMap'

describe('<CountryMap />', () => {
  let wrapper
  const country = { latlng: [90, 90] }
  const props = { country }

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<CountryMap {...props} />)
  })

  it('initial region is Country coordinates', () => {
    expect(wrapper.state('region')).toEqual({
      latitude: country.latlng[0],
      longitude: country.latlng[1],
      latitudeDelta: 100,
      longitudeDelta: 50,
    })
  })
})
