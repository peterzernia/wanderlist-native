import React from "react";
import { shallow } from "enzyme";
import SearchScreen from "../SearchScreen";

describe("<SearchScreen />", () => {
  let wrapper;
  const fetchCountries = jest.fn();
  const user = { username: "Test" };
  let updateUser = jest.fn();
  let props = { fetchCountries, user, updateUser };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<SearchScreen {...props} />);
  });

  it("renders", () => {
    expect(wrapper.find("View").length).toEqual(0);
  });
});
