import React from "react";
import { shallow } from "enzyme";
import ForgotPasswordScreen from "../ForgotPasswordScreen";

describe("<ForgotPasswordScreen />", () => {
  let wrapper;
  const requestPasswordReset = jest.fn();
  const authenticated = false;
  const navigate = jest.fn();
  const navigation = { navigate };
  let props = { requestPasswordReset, navigation, authenticated };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<ForgotPasswordScreen {...props} />);
  });

  it("renders", () => {
    expect(wrapper.find("View").length).toEqual(0);
  });
});
