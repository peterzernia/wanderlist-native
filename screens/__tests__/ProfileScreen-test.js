import React from "react";
import { shallow } from "enzyme";
import { ProfileScreen } from "../ProfileScreen";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";

describe("<ProfileScreen />", () => {
  let wrapper;
  const user = { username: "TestUser" };
  const userTripReports = { results: [], next: null };
  const fetchingUserTripReports = false;
  const navigate = jest.fn();
  const navigation = { navigate };
  const authLogout = jest.fn();
  let fetchingUser = false;
  let fetchingNextUserTripReports = false;
  const fetchNextUserTripReports = jest.fn();
  const toggleFavorite = jest.fn();
  let props = {
    user,
    userTripReports,
    fetchingUserTripReports,
    navigation,
    authLogout,
    fetchingUser,
    fetchingNextUserTripReports,
    fetchNextUserTripReports,
    toggleFavorite
  };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<ProfileScreen {...props} />);
  });

  it("renders ActivityIndicator while fetchingUser", () => {
    expect(wrapper.find(ActivityIndicator).length).toEqual(0);
    expect(wrapper.find(FlatList).length).toEqual(1);

    wrapper.setProps({ ...props, fetchingUser: true });
    expect(wrapper.find(ActivityIndicator).length).toEqual(1);
    expect(wrapper.find(FlatList).length).toEqual(0);
  });

  it("handles Switch", () => {
    expect(wrapper.state("switchValue")).toEqual(true);
    wrapper.instance().handleSwitch(false);
    expect(authLogout).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(wrapper.state("switchValue")).toEqual(false);
  });

  /**
   * handleLoadMore is called 3 times. The first time, fetchNextUserTripReports isn't called
   * because there is no userTripReports.next url. The second time fetchNextUserTripReports IS
   * called because there is a userTripReports.next url and it is different than state.url.
   * After it is called, state.url is set to tripReports.next, so when handleLoadMore
   * is called the last time, fetchUserTripReports is not called since
   * userTripReport.next == state.url
   */
  it("loads more", () => {
    wrapper.instance().handleLoadMore();
    expect(fetchNextUserTripReports).toHaveBeenCalledTimes(0);

    wrapper.setProps({
      ...props,
      userTripReports: { ...userTripReports, next: "http://test.com/?page=2" }
    });
    wrapper.instance().handleLoadMore();
    expect(fetchNextUserTripReports).toHaveBeenCalledTimes(1);
    expect(wrapper.state("url")).toEqual("http://test.com/?page=2");

    wrapper.instance().handleLoadMore();
    expect(fetchNextUserTripReports).toHaveBeenCalledTimes(1);
  });
});
