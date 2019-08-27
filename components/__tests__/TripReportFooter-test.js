import React from 'react'
import { shallow } from 'enzyme'
import TripReportFooter from '../TripReportFooter'

describe('<TripReportFooter />', () => {
  // Setup props
  let wrapper
  const navigate = jest.fn()
  const navigation = { navigate }
  const tripReport = {
    title: 'Test',
    countries: [{ name: 'Test', id: 1 }],
    favoriters: [],
  }
  const user = { username: 'Test', pk: 1 }
  const handleShare = jest.fn()
  const handleFavorite = jest.fn()
  const props = {
    navigation, tripReport, user, handleShare, handleFavorite,
  }

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<TripReportFooter {...props} />)
  })

  /**
   * Note: there must be a country in the countries array for the
   * TouchableOpacity to render.
   */
  it('navigates', () => {
    wrapper
      .find('TouchableOpacity')
      .at(0)
      .simulate('press')
    expect(navigate).toHaveBeenCalledTimes(1)
  })

  it('calls handleFavorite onPress', () => {
    wrapper
      .find('TouchableOpacity')
      .at(1)
      .simulate('press')
    expect(handleFavorite).toHaveBeenCalledTimes(1)
  })

  it('calls handleShare onPress', () => {
    wrapper
      .find('TouchableOpacity')
      .at(2)
      .simulate('press')
    expect(handleShare).toHaveBeenCalledTimes(1)
  })

  /**
   * Two TouchableOpacities are always rendered, and the component
   * should update with more TouchableOpacities for each country
   * in the Trip Report.
   */
  it('renders TouchableOpacity for each country in TripReport', () => {
    expect(wrapper.find('TouchableOpacity').length).toEqual(3)
    const tripReport = {
      title: 'Test',
      countries: [{ name: 'Test', id: 1 }, { name: 'Test2', id: 2 }],
      favoriters: [],
    }
    wrapper.setProps({ ...props, tripReport })
    expect(wrapper.find('TouchableOpacity').length).toEqual(4)
  })

  /**
   * The first time around the user with pk=1 is not in the Trip Report
   * favoriters array, and the Icon has name=favorite-border. After the
   * favoriters array contains pk=1, the Icon has name=favorite.
   */
  it('changes favorite icon when user likes Trip Report', () => {
    expect(
      wrapper
        .find('Icon')
        .at(0)
        .prop('name'),
    ).toEqual('favorite-border')

    const tripReport = { title: 'Test', countries: [], favoriters: [1] }
    wrapper.setProps({ ...props, tripReport })

    expect(
      wrapper
        .find('Icon')
        .at(0)
        .prop('name'),
    ).toEqual('favorite')
  })
})
