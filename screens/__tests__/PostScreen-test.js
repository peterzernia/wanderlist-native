import React from "react";
import { shallow } from "enzyme";
import { PostScreen } from "../PostScreen";
import PostTitleHeader from "../../components/PostTitleHeader";

describe("<PostScreen />", () => {
  let wrapper;
  let user = { username: "TestUser" };
  let globalState = {};
  const setState = jest.fn();
  let tripReport = { title: "Test", content: "Test" };
  const params = { tripReport };
  const state = { params };
  const navigation = { state };
  let props = { user, globalState, setState, navigation };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<PostScreen {...props} />);
  });

  /**
   * Navigation header shows New Trip Report when the navProps doesn't contain
   * params variable and Edit Trip Report when it does.
   */
  it("navigationOptions", () => {
    let navigationOptions = PostScreen.navigationOptions(props);
    expect(navigationOptions).toEqual({
      title: "Edit Trip Report",
      headerTitle: <PostTitleHeader {...params} navigation={navigation} />
    });

    let navProp = { navigation: { state: {} } };
    navigationOptions = PostScreen.navigationOptions({ ...navProp });
    expect(navigationOptions).toEqual({
      title: "New Trip Report",
      headerTitle: <PostTitleHeader navigation={{ state: {} }} />
    });
  });

  /**
   * When a tripReport is passed as a parameter, <PostForm/> has the prop
   * tripReport=tripReport. When there is no tripReport, the prop tripReport=null
   */
  it("post form tripReport prop has tripReport or is null", () => {
    expect(wrapper.find("PostForm").prop("tripReport")).toEqual(tripReport);

    wrapper.setProps({ ...props, navigation: { state: {} } });
    expect(wrapper.find("PostForm").prop("tripReport")).toEqual(undefined);
  });
});
