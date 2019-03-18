import React from "react";
import { shallow } from "enzyme";
import PostTitleHeader from "../PostTitleHeader";

describe("<PostTitleHeader />", () => {
  let wrapper;
  let user = {
    pk: 1
  };
  let tripReport = null;
  const globalState = { title: "", content: "", selectedCountries: [] };
  const postTripReport = jest.fn();
  const updateTripReport = jest.fn();
  const navigate = jest.fn();
  const navigation = { navigate };
  let props = {
    user,
    tripReport,
    globalState,
    postTripReport,
    updateTripReport,
    navigation
  };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<PostTitleHeader {...props} />);
  });

  it("renders", () => {
    expect(wrapper.find("Text").length).toEqual(0);
  });
});
