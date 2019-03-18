import React from "react";
import { shallow } from "enzyme";
import SearchBar from "../SearchBar";
import { ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";

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

  it("autocomplete changes query onChangeText", () => {
    wrapper.find("Autocomplete").simulate("changeText", "test");
    expect(wrapper.state("query")).toEqual("test");
    expect(wrapper.state("hide")).toEqual(false);
  });

  it("TouchableOpacity removes query & query renders Icon", () => {
    wrapper.setState({ query: "test" });
    expect(wrapper.state("query")).toEqual("test");
    expect(wrapper.find(Icon).length).toEqual(1);
    wrapper
      .find("TouchableOpacity")
      .at(0)
      .simulate("press");
    expect(wrapper.state("query")).toEqual("");
    expect(wrapper.find(Icon).length).toEqual(0);
  });

  // it("query renders buttons for each country that matches query", () => {
  //   wrapper.setState({ query: "united" });
  //   expect(wrapper.find("Text").length).toEqual(5);
  // });

  it("handles Search", () => {
    wrapper
      .find("TouchableOpacity")
      .at(1)
      .simulate("press");
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
