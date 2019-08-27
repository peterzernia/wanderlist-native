import React from 'react'
import { shallow } from 'enzyme'
import { ActivityIndicator } from 'react-native'
import LoginForm from '../LoginForm'

describe('<LoginForm />', () => {
  let wrapper
  const authenticating = false
  const handleSubmit = jest.fn()
  const navigate = jest.fn()
  const navigation = { navigate }
  const props = { authenticating, handleSubmit, navigation }

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<LoginForm {...props} />)
  })

  it('shows ActivityIndicator while authenticating', () => {
    expect(wrapper.find('ActivityIndicator').length).toEqual(0)
    const authenticating = true
    wrapper.setProps({ ...props, authenticating })
    expect(wrapper.find(ActivityIndicator).length).toEqual(1)
  })

  it('handles Submit', () => {
    wrapper
      .find('TouchableOpacity')
      .at(0)
      .simulate('press')
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  /**
   * There are three TouchableOpacity buttons, the second two
   * both call the navigate() func.
   */
  it('navigates', () => {
    wrapper
      .find('TouchableOpacity')
      .at(1)
      .simulate('press')
    expect(navigate).toHaveBeenCalledTimes(1)
    wrapper
      .find('TouchableOpacity')
      .at(2)
      .simulate('press')
    expect(navigate).toHaveBeenCalledTimes(2)
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
      .simulate('changeText', 'Password')
    expect(wrapper.state('password')).toEqual('Password')
  })
})
