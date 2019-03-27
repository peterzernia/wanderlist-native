import React from "react";
import { shallow } from "enzyme";
import { LoginScreen } from "../LoginScreen";

describe("<LoginScreen />", () => {
  let wrapper;
  const authLogin = jest.fn();
  const authenticated = false;
  const authenticating = false;
  const navigate = jest.fn();
  const navigation = { navigate };
  let props = { authLogin, authenticated, authenticating, navigation };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<LoginScreen {...props} />);
  });

  it("navigates when authenticated", () => {
    wrapper.instance().componentDidUpdate();
    expect(navigate).toHaveBeenCalledTimes(0);

    wrapper.setProps({ ...props, authenticated: true });
    expect(navigate).toHaveBeenCalledTimes(1);
    wrapper.instance().componentDidUpdate();
    expect(navigate).toHaveBeenCalledTimes(2);
  });

  it("handles Submit", () => {
    wrapper.instance().handleSubmit();
    expect(authLogin).toHaveBeenCalledTimes(1);
  });
});
