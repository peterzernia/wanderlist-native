import React from 'react'
import { shallow } from 'enzyme'
import PostForm from '../PostForm'

describe('<PostForm />', () => {
  let wrapper
  let tripReport = null
  const setState = jest.fn()
  let props = { tripReport, setState }

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<PostForm {...props} />)
  })

  it('sets forms', () => {
    wrapper
      .find('TextInput')
      .at(0)
      .simulate('changeText', 'TestTitle')
    expect(wrapper.state('title')).toEqual('TestTitle')
    // expect(setState).toHaveBeenCalledTimes(1);

    wrapper
      .find('MultiSelect')
      .simulate('selectedItemsChange', ['1', '2', '3'])
    expect(wrapper.state('selectedCountries')).toEqual(['1', '2', '3'])
    // expect(setState).toHaveBeenCalledTimes(2);

    wrapper
      .find('TextInput')
      .at(1)
      .simulate('changeText', 'TestContent')
    expect(wrapper.state('content')).toEqual('TestContent')
    // expect(setState).toHaveBeenCalledTimes(3);
  })

  it('fills state with Trip Report if not null', () => {
    expect(wrapper.state('title')).toEqual('')
    expect(wrapper.state('content')).toEqual('')
    expect(wrapper.state('selectedCountries')).toEqual([])

    tripReport = {
      title: 'TestTitle',
      content: 'TestContent',
      countries: [{ name: 'Test1', id: 1 }, { name: 'Test2', id: 2 }],
    }
    props = { tripReport, setState }
    wrapper = shallow(<PostForm {...props} />)
    expect(wrapper.state('title')).toEqual('TestTitle')
    expect(wrapper.state('content')).toEqual('TestContent')
    expect(wrapper.state('selectedCountries')).toEqual(['1', '2'])
  })
})
