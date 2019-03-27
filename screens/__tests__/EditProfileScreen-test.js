import React from "react";
import { shallow } from "enzyme";
import { EditProfileScreen } from "../EditProfileScreen";
import { AsyncStorage, View } from "react-native";

describe("<EditProfileScreen />", () => {
  let wrapper;
  let user = {
    username: "Test",
    countries: [{ name: "Test1", id: 1 }, { name: "Test2", id: 2 }]
  };
  let updatingUser = false;
  const updateUser = jest.fn();
  let props = { user, updatingUser, updateUser };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<EditProfileScreen {...props} />);
  });

  it("renders", () => {
    expect(wrapper.find(View).length).toEqual(1);
  });

  it("handleSubmit", () => {
    spy = jest.spyOn(AsyncStorage, "getItem");
    wrapper.instance().handleSubmit();
    expect(spy).toHaveBeenCalledTimes(1);
    //expect(updateUser).toHaveBeenCalledTimes(1);
  });
});
