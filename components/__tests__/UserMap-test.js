import React from 'react'
import { shallow } from 'enzyme'
import { Marker } from 'react-native-maps'
import UserMap from '../UserMap'

describe('<UserMap />', () => {
  let wrapper
  const user = {
    countries: [
      { name: 'Test1', id: 1, latlng: [90, 90] },
      { name: 'Test2', id: 2, latlng: [180, 180] },
    ],
  }
  const navigate = jest.fn()
  const navigation = { navigate }
  const props = { user, navigation }

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<UserMap {...props} />)
  })

  it('renders Marker for each country', () => {
    expect(wrapper.find(Marker).length).toEqual(2)

    // Remove countries and test there are no Markers.
    const user = { countries: [] }
    wrapper.setProps({ ...props, user })
    expect(wrapper.find(Marker).length).toEqual(0)
  })

  it('each marker navigates onPress', () => {
    expect(navigate).toHaveBeenCalledTimes(0)
    wrapper
      .find(Marker)
      .at(0)
      .simulate('calloutPress')
    expect(navigate).toHaveBeenCalledTimes(1)
    wrapper
      .find(Marker)
      .at(1)
      .simulate('calloutPress')
    expect(navigate).toHaveBeenCalledTimes(2)
  })
})
