import React from "react";
import { shallow } from "enzyme";
import { TripReportScreen } from "../TripReportScreen";
import TripReportTitleHeader from "../../components/TripReportTitleHeader";

describe("<TripReportScreen />", () => {
  let wrapper;
  const user = { username: "TestUser" };
  const toggleFavorite = jest.fn();
  const deleteTripReport = jest.fn();
  const tripReports = { results: [{ title: "Test", id: 1 }] };
  const tripReport = { title: "Test", id: 1 };
  const setParams = jest.fn();
  const getParam = jest.fn();
  const params = { tripReport, user };
  const state = { params };
  const navigation = { state, setParams, getParam };
  let props = {
    user,
    toggleFavorite,
    deleteTripReport,
    tripReports,
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
});
