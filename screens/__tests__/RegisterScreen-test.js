import React from "react";
import { shallow } from "enzyme";
import RegisterScreen from "../RegisterScreen";

describe("<RegisterScreen />", () => {
  let wrapper;
  const authRegister = jest.fn();
  const authenticated = false;
  const authenticating = true;
  const navigate = jest.fn();
  const navigation = { navigate };
  let props = { authRegister, authenticated, authenticating, navigation };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<RegisterScreen {...props} />);
  });

  it("renders", () => {
    expect(wrapper.find("View").length).toEqual(0);
  });
});
