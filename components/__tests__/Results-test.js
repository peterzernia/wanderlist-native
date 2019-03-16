import React from "react";
import { shallow } from "enzyme";
import Results from "../Results";
import { ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

describe("<Results />", () => {
  // Setup props
  let wrapper;
  const country = { name: "TestCountry", flag: "https://test.com/" };
  let user = { username: "Test", countries: [] };
  let updatingUser = false;
  const handleUpdate = jest.fn();
  let pendingCountry = { name: "Other" };
  const navigate = jest.fn();
  const navigation = { navigate };
  const props = {
    country,
    user,
    updatingUser,
    handleUpdate,
    pendingCountry,
    navigation
  };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<Results {...props} />);
  });

  it("navigates", () => {
    wrapper
      .find("TouchableOpacity")
      .at(0)
      .simulate("press");
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it("handles update", () => {
    wrapper
      .find("TouchableOpacity")
      .at(1)
      .simulate("press");
    expect(handleUpdate).toHaveBeenCalledTimes(1);
  });

  // There are 5 different ways the Icon will render.
  it("renders correct icons", () => {
    /**
     * Initially, an add icon will render since the country is
     * not in the user's country list.
     */
    expect(wrapper.find(ActivityIndicator).length).toEqual(0);
    expect(wrapper.find(Icon).prop("name")).toEqual("add-circle");

    /**
     * Next, the remove icon will render render when the country
     * is in the user's country list.
     */
    user = { username: "Test", countries: [{ ...country }] };
    wrapper.setProps({ ...props, user });
    expect(wrapper.find(Icon).prop("name")).toEqual("remove-circle");

    /**
     * Next, while the POST request is made to update the user, i.e.
     * updatingUser is true, the add icon will be displayed as long as
     * the pendingCountry is not the country.
     */
    updatingUser = true;
    wrapper.setProps({ ...props, updatingUser });
    expect(wrapper.find(Icon).prop("name")).toEqual("add-circle");

    /**
     * The remove icon will render again when updatingUser is true,
     * pendingCountry is not the country, and the country is in the
     * user's country list.
     */
    user = { username: "Test", countries: [{ ...country }] };
    wrapper.setProps({ ...props, user, updatingUser });
    expect(wrapper.find(Icon).prop("name")).toEqual("remove-circle");

    /**
     * Lastly, when updatingUser is true, and the pendingCountry is the
     * country, the ActivityIndicator will be displayed.
     */
    pendingCountry = country;
    wrapper.setProps({ ...props, updatingUser, pendingCountry });
    expect(wrapper.find(ActivityIndicator).length).toEqual(1);
    expect(wrapper.find(Icon).length).toEqual(0);
  });
});
