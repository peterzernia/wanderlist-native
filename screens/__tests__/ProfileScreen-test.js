import React from "react";
import { shallow } from "enzyme";
import ProfileScreen from "../ProfileScreen";

describe("<ProfileScreen />", () => {
  let wrapper;
  const user = { username: "TestUser" };
  const userTripReports = [];
  const fetchingUserTripReports = false;
  const navigate = jest.fn();
  const navigation = { navigate };
  let props = { user, navigation, userTripReports, fetchingUserTripReports };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<ProfileScreen {...props} />);
  });

  it("renders", () => {
    expect(wrapper.find("View").length).toEqual(0);
  });
});
