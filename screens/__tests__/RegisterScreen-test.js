import React from "react";
import { shallow } from "enzyme";
import { RegisterScreen } from "../RegisterScreen";

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
    expect(authRegister).toHaveBeenCalledTimes(1);
  });
});
