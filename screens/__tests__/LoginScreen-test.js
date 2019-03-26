import React from "react";
import { shallow } from "enzyme";
import LoginScreen from "../LoginScreen";

describe("<LoginScreen />", () => {
  let wrapper;
  const authLogin = jest.fn();
  const authenticated = false;
  const navigate = jest.fn();
  const navigation = { navigate };
  let props = { authLogin, authenticated, navigation };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<LoginScreen {...props} />);
  });

  it("renders", () => {
    expect(wrapper.find("View").length).toEqual(0);
  });
});
