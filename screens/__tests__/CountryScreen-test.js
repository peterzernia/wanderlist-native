import React from 'react'
import { shallow } from 'enzyme'
import { Image, Linking, View } from 'react-native'
import CountryScreen from '../CountryScreen'

describe('<CountryScreen />', () => {
  let wrapper
  const country = {
    id: 2,
    currencies: [
      {
        code: 'EUR',
        name: 'European Euro',
        symbol: '€',
      },
    ],
    languages: [
      {
        iso639_1: 'sv',
        name: 'Swedish',
        native_name: 'svenska',
      },
    ],
    regional_blocs: [
      {
        acronym: 'EU',
        name: 'European Union',
        other_acronyms: null,
        other_names: null,
      },
    ],
    name: 'Aland Islands',
    top_level_domain: ['.ax'],
    alpha2code: 'AX',
    alpha3code: 'ALA',
    calling_codes: ['358'],
    capital: 'Mariehamn',
    alt_spellings: ['AX', 'Aaland', 'Åland', 'Ahvenanmaa'],
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 28875,
    latlng: [60.116667, 19.9],
    demonym: 'Ålandish',
    area: 1580.0,
    gini: 1,
    timezones: ['UTC+02:00'],
    borders: [],
    native_name: 'Åland',
    numeric_code: '248',
    flag: 'https://raw.githubusercontent.com/peterzernia/flags/master/ax.png',
    cioc: 'Test',
  }
  const params = { country }
  const state = { params }
  const navigation = { state }
  const props = { navigation }

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<CountryScreen {...props} />)
  })

  it('navigationOptions', () => {
    const navigationOptions = CountryScreen.navigationOptions(props)
    // expect(navigationOptions).toMatchSnapshot();
    expect(navigationOptions).toEqual({ title: 'Aland Islands' })
  })

  it('gets image dimensions', () => {
    spy = jest.spyOn(Image, 'getSize')
    wrapper.instance().componentDidMount()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('opens Link', () => {
    spy = jest.spyOn(Linking, 'openURL')
    wrapper.find('TouchableOpacity').simulate('press')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  // When the country is Nepal, no border is displayed around the flag
  it('displays different style for Nepal', () => {
    expect(
      wrapper
        .find(View)
        .at(1)
        .prop('style'),
    ).toEqual({
      alignSelf: 'center',
      borderWidth: 1,
      margin: 5,
      marginTop: 10,
      width: 712.5,
    })

    const navigation = { state: { params: { country: { name: 'Nepal' } } } }
    wrapper.setProps({ navigation })

    expect(
      wrapper
        .find(View)
        .at(1)
        .prop('style'),
    ).toEqual({
      alignSelf: 'center',
      margin: 5,
      marginTop: 10,
      width: 712.5,
    })
  })
})
