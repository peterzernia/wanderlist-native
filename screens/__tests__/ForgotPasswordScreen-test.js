import React from 'react'
import { shallow } from 'enzyme'
import { ForgotPasswordScreen } from '../ForgotPasswordScreen'

describe('<ForgotPasswordScreen />', () => {
  let wrapper
  const requestPasswordReset = jest.fn()
  const authenticated = false
  const authenticating = false
  const navigate = jest.fn()
  const navigation = { navigate }
  const props = {
    requestPasswordReset,
    authenticated,
    authenticating,
    navigation,
  }

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<ForgotPasswordScreen {...props} />)
  })

  it('navigates when authenticated', () => {
    wrapper.instance().componentDidUpdate()
    expect(navigate).toHaveBeenCalledTimes(0)

    wrapper.setProps({ ...props, authenticated: true })
    expect(navigate).toHaveBeenCalledTimes(1)
    wrapper.instance().componentDidUpdate()
    expect(navigate).toHaveBeenCalledTimes(2)
  })

  it('handles Submit', () => {
    wrapper.instance().handleSubmit()
    expect(requestPasswordReset).toHaveBeenCalledTimes(1)
  })
})
