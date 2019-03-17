import React from "react";
import { shallow } from "enzyme";
import SearchBar from "../SearchBar";
import { ActivityIndicator } from "react-native";

describe("<SearchBar />", () => {
  let wrapper;
  let fetchingCountries = false;
  const handleSearch = jest.fn();
  const props = { fetchingCountries, handleSearch };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<SearchBar {...props} />);
  });

  /**
   * When fetchingCountries is true, it renders an
   * ActivityIndicator.
   */
  it("renders ActivityIndicator", () => {
    expect(wrapper.find(ActivityIndicator).length).toEqual(0);
    const fetchingCountries = true;
    wrapper.setProps({ ...props, fetchingCountries });
    expect(wrapper.find(ActivityIndicator).length).toEqual(1);
  });
});
