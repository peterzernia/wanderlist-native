import React from 'react'
import { shallow } from 'enzyme'
import { ActivityIndicator } from 'react-native'
import EditProfileForm from '../EditProfileForm'

describe('<EditProfileForm />', () => {
  let wrapper
  const updatingUser = false
  const handleSubmit = jest.fn()
  const navigate = jest.fn()
  const navigation = { navigate }
  const user = {
    username: '', email: '', biography: '', home: { id: 0 },
  }
  const props = {
    updatingUser, handleSubmit, navigation, user,
  }

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<EditProfileForm {...props} />)
  })

  it('shows ActivityIndicator while updatingUser', () => {
    expect(wrapper.find('ActivityIndicator').length).toEqual(0)
    const updatingUser = true
    wrapper.setProps({ ...props, updatingUser })
    expect(wrapper.find(ActivityIndicator).length).toEqual(1)
  })

  it('handles Submit & navigates', () => {
    wrapper
      .find('TouchableOpacity')
      .at(0)
      .simulate('press')
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledTimes(1)
  })

  it('sets text', () => {
    wrapper
      .find('TextInput')
      .at(0)
      .simulate('changeText', 'TestUser')
    expect(wrapper.state('username')).toEqual('TestUser')
    wrapper
      .find('TextInput')
      .at(1)
      .simulate('changeText', 'test@test.com')
    expect(wrapper.state('email')).toEqual('test@test.com')
    wrapper
      .find('TextInput')
      .at(2)
      .simulate('changeText', 'TestBiography')
    expect(wrapper.state('biography')).toEqual('TestBiography')
    wrapper.find('Picker').simulate('valueChange', 1)
    expect(wrapper.state('home')).toEqual(1)
  })
})
