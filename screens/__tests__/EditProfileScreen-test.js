import React from "react";
import { shallow } from "enzyme";
import EditProfileScreen from "../EditProfileScreen";

describe("<EditProfileScreen />", () => {
  let wrapper;
  let user = { username: "Test", countries: [{ name: "Test" }] };
  let updatingUser = false;
  const updateUser = jest.fn();
  let props = { user, updatingUser, updateUser };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<EditProfileScreen {...props} />);
  });

  it("renders", () => {
    expect(wrapper.find("View").length).toEqual(0);
  });
});
