import React from 'react'
import { shallow } from 'enzyme'
import FeedTitleHeader from '../FeedTitleHeader'

describe('<FeedTitleHeader />', () => {
  let wrapper
  const handleSearch = jest.fn()
  const props = { handleSearch }

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<FeedTitleHeader {...props} />)
  })

  it('sets text onChangeText', () => {
    wrapper.find('TextInput').simulate('changeText', 'test')
    expect(wrapper.state('query')).toEqual('test')
  })

  it('handles Search', () => {
    wrapper.find('TouchableOpacity').simulate('press')
    expect(handleSearch).toHaveBeenCalledTimes(1)
  })
})
