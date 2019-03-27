import React from "react";
import { shallow } from "enzyme";
import { ForgotPasswordScreen } from "../ForgotPasswordScreen";

describe("<ForgotPasswordScreen />", () => {
  let wrapper;
  const requestPasswordReset = jest.fn();
  const authenticated = false;
  const authenticating = false;
  const navigate = jest.fn();
  const navigation = { navigate };
  let props = {
    requestPasswordReset,
    navigation,
    authenticated,
    authenticating
  };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<ForgotPasswordScreen {...props} />);
  });

  it("component Mounts & navigates", () => {
    wrapper.instance().componentDidUpdate();
    expect(navigate).toHaveBeenCalledTimes(0);

    wrapper.setProps({ ...props, authenticated: true });
    expect(navigate).toHaveBeenCalledTimes(1);
    wrapper.instance().componentDidUpdate();
    expect(navigate).toHaveBeenCalledTimes(2);
  });

  it("handles Submit", () => {
    wrapper.instance().handleSubmit();
    expect(requestPasswordReset).toHaveBeenCalledTimes(1);
  });
});
