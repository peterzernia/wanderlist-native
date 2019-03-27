import React from "react";
import { shallow } from "enzyme";
import { PostTitleHeader } from "../PostTitleHeader";
import { Alert, Text } from "react-native";

describe("<PostTitleHeader />", () => {
  let wrapper;
  let user = {
    pk: 1
  };
  let tripReport = null;
  const globalState = { title: "", content: "", selectedCountries: [] };
  const postTripReport = jest.fn();
  const updateTripReport = jest.fn();
  const goBack = jest.fn();
  const navigation = { goBack };
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

  /**
   * First handlePress is called with an empty array, which throws an error
   * instead of calling update/postTripReprt. Next, it is called with an array
   * while tripReport is null, so postTripReport is called, Lastly, handlePress
   * is called with an array and tripReport is not null, so updateTripReport is
   * called.
   */
  it("handles Press", async () => {
    spy = jest.spyOn(Alert, "alert");
    await wrapper.instance().handlePress("TestTitle", "TestContent", []);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(postTripReport).toHaveBeenCalledTimes(0);
    expect(updateTripReport).toHaveBeenCalledTimes(0);

    await wrapper.instance().handlePress("TestTitle", "TestContent", ["1"]);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(postTripReport).toHaveBeenCalledTimes(1);
    expect(updateTripReport).toHaveBeenCalledTimes(0);

    wrapper.setProps({ ...props, tripReport: { title: "Test" } });
    await wrapper.instance().handlePress("TestTitle", "TestContent", ["1"]);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(postTripReport).toHaveBeenCalledTimes(1);
    expect(updateTripReport).toHaveBeenCalledTimes(1);
  });

  it("navigates onPress", () => {
    wrapper.find("TouchableOpacity").simulate("press");
    expect(goBack).toHaveBeenCalledTimes(1);
  });

  /**
   * Initially, there is no Trip Report, so New Trip Report and Post
   * are rendered. After, Edit Trip Report and Update are rendered.
   */
  it("post/update & new/update text", () => {
    expect(
      wrapper
        .find(Text)
        .at(0)
        .prop("children")
    ).toEqual("New Trip Report");
    expect(
      wrapper
        .find(Text)
        .at(1)
        .prop("children")
    ).toEqual("Post");

    wrapper.setProps({ ...props, tripReport: { title: "Test" } });
    expect(
      wrapper
        .find(Text)
        .at(0)
        .prop("children")
    ).toEqual("Edit Trip Report");
    expect(
      wrapper
        .find(Text)
        .at(1)
        .prop("children")
    ).toEqual("Update");
  });
});
