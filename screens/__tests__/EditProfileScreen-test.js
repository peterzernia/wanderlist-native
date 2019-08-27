import React from 'react'
import { shallow } from 'enzyme'
import { EditProfileScreen } from '../EditProfileScreen'

describe('<EditProfileScreen />', () => {
  let wrapper
  const user = {
    username: 'Test',
    countries: [{ name: 'Test1', id: 1 }, { name: 'Test2', id: 2 }],
  }
  const updatingUser = false
  const updateUser = jest.fn()
  const props = { user, updatingUser, updateUser }

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<EditProfileScreen {...props} />)
  })

  it('handleSubmit', async () => {
    await wrapper.instance().handleSubmit()
    expect(updateUser).toHaveBeenCalledTimes(1)
  })
})
