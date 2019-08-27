import React from 'react'
import { shallow } from 'enzyme'
import { SearchScreen } from '../SearchScreen'

describe('<SearchScreen />', () => {
  let wrapper
  const fetchCountries = jest.fn()
  const fetchingCountries = false
  const user = {
    username: 'TestUser',
    email: 'TestEmail',
    countries: [],
    home: { id: 1, name: 'TestHome' },
    biography: 'TestBiography',
  }
  const updateUser = jest.fn()
  const updatingUser = false
  const countries = []
  const props = {
    fetchCountries,
    fetchingCountries,
    user,
    updateUser,
    updatingUser,
    countries,
  }

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<SearchScreen {...props} />)
  })

  it('handles Search', () => {
    wrapper.instance().handleSearch()
    expect(fetchCountries).toHaveBeenCalledTimes(1)
  })

  /**
   * Must await handleUpdate because it calls AsyncStorage.getItem()
   * which returns a promise.
   */
  it('handles Update', async () => {
    /**
     * First time, handleUpdate is called when user has no countries
     * in their list, adding the country to their list.
     */
    await wrapper.instance().handleUpdate({ name: 'TestCountry', id: 2 })
    expect(updateUser).toHaveBeenCalledTimes(1)
    expect(updateUser).toHaveBeenLastCalledWith(
      null, // token
      'TestUser', // username
      'TestEmail', // email
      [2], // user's countries' list ids, contains TestCountry
      1, // user's home country id
      'TestBiography', // user's biography
      'TestCountry has been added to your map.', // success message
    )

    /**
     * Second time, handleUpdate is called when user has TestCountry in
     * their list, so it is removed.
     */
    wrapper.setProps({
      ...props,
      user: { ...user, countries: [{ name: 'TestCountry', id: 2 }] },
    })
    await wrapper.instance().handleUpdate({ name: 'TestCountry', id: 2 })
    expect(updateUser).toHaveBeenCalledTimes(2)
    expect(updateUser).toHaveBeenLastCalledWith(
      null, // token
      'TestUser', // username
      'TestEmail', // email
      [], // user's countries' list ids, does not contait TestCountry
      1, // user's home country id
      'TestBiography', // user's biography
      'TestCountry has been removed to your map.', // success message
    )

    /**
     * Third time, handleUpdate is called when user has a country other
     * than TestCountry in their list, so TestCountry is added.
     */
    wrapper.setProps({
      ...props,
      user: { ...user, countries: [{ name: 'TestCountry2', id: 3 }] },
    })
    await wrapper.instance().handleUpdate({ name: 'TestCountry', id: 2 })
    expect(updateUser).toHaveBeenCalledTimes(3)
    expect(updateUser).toHaveBeenLastCalledWith(
      null, // token
      'TestUser', // username
      'TestEmail', // email
      [3, 2], // user's countries' list ids, does not contait TestCountry
      1, // user's home country id
      'TestBiography', // user's biography
      'TestCountry has been added to your map.', // success message
    )
  })

  it('renders header', () => {
    const header = wrapper.instance().renderHeader()
    expect(header).not.toEqual(null)
  })
})
