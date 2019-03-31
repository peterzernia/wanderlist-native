import React from "react";
import { shallow } from "enzyme";
import { TripReportScreen } from "../TripReportScreen";
import TripReportTitleHeader from "../../components/TripReportTitleHeader";
import { Text } from "react-native";

describe("<TripReportScreen />", () => {
  let wrapper;
  const user = { username: "TestUser" };
  const toggleFavorite = jest.fn();
  const deleteTripReport = jest.fn();
  const tripReports = {
    results: [{ title: "Test", content: "tripReports", id: 1 }]
  };
  const userTripReports = {
    results: [{ title: "UserTest", content: "userTripReports", id: 1 }]
  };
  const tripReport = { title: "Test", id: 1 };
  const setParams = jest.fn();
  const getParam = jest.fn();
  const params = {
    tripReport,
    user,
    navigation: { state: { routeName: "Feed" } }
  };
  const state = { params };
  const navigation = { state, setParams, getParam };
  let props = {
    user,
    toggleFavorite,
    deleteTripReport,
    tripReports,
    userTripReports,
    navigation
  };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<TripReportScreen {...props} />);
  });

  it("navigationOptions", () => {
    const navigationOptions = TripReportScreen.navigationOptions(props);
    expect(navigationOptions).toEqual({
      headerTitle: (
        <TripReportTitleHeader
          {...params}
          handleDelete={navigation.getParam("handleDelete")}
        />
      )
    });
  });

  it("handles Delete", async () => {
    await wrapper.instance().handleDelete();
    expect(deleteTripReport).toHaveBeenCalledTimes(1);
  });

  it("renders tripReports or userTripReports depending on nav param", () => {
    expect(wrapper.find(Text).prop("children")).toEqual("tripReports");

    wrapper.setProps({
      ...props,
      navigation: {
        ...navigation,
        state: {
          ...state,
          params: { ...params, navigation: { state: { routeName: "Profile" } } }
        }
      }
    });
    expect(wrapper.find(Text).prop("children")).toEqual("userTripReports");
  });
});
