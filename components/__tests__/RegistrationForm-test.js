import React from "react";
import { shallow } from "enzyme";
import RegistrationForm from "../RegistrationForm";
import { ActivityIndicator } from "react-native";

describe("<RegistrationForm />", () => {
  const authenticating = false;
  const handleSubmit = jest.fn();
  const navigate = jest.fn();
  const navigation = { navigate };
  const props = { authenticating, handleSubmit, navigation };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<RegistrationForm {...props} />);
  });

  it("shows ActivityIndicator while authenticating", () => {
    expect(wrapper.find("ActivityIndicator").length).toEqual(0);
    const authenticating = true;
    wrapper.setProps({ ...props, authenticating });
    expect(wrapper.find(ActivityIndicator).length).toEqual(1);
  });

  it("handles Submit", () => {
    wrapper
      .find("TouchableOpacity")
      .at(0)
      .simulate("press");
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  /**
   * There are three TouchableOpacity buttons, the second two
   * both call the navigate() func.
   */
  it("navigates", () => {
    wrapper
      .find("TouchableOpacity")
      .at(1)
      .simulate("press");
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it("sets text", () => {
    wrapper
      .find("TextInput")
      .at(0)
      .simulate("changeText", "TestUser");
    expect(wrapper.state("username")).toEqual("TestUser");
    wrapper
      .find("TextInput")
      .at(1)
      .simulate("changeText", "test@test.com");
    expect(wrapper.state("email")).toEqual("test@test.com");
    wrapper
      .find("TextInput")
      .at(2)
      .simulate("changeText", "Password1");
    expect(wrapper.state("password1")).toEqual("Password1");
    wrapper
      .find("TextInput")
      .at(3)
      .simulate("changeText", "Password2");
    expect(wrapper.state("password2")).toEqual("Password2");
    wrapper.find("Picker").simulate("valueChange", 1);
    expect(wrapper.state("home")).toEqual(1);
  });
});
