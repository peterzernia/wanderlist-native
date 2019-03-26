import React from "react";
import { shallow } from "enzyme";
import TripReportScreen from "../TripReportScreen";

describe("<TripReportScreen />", () => {
  let wrapper;
  const deleteTripReport = jest.fn();
  const tripReports = [{ title: "Test", id: 1 }];
  const tripReport = tripReports[1];
  const params = { tripReport };
  const state = { params };
  const navigation = { state };
  let props = { deleteTripReport, tripReports, navigation };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<TripReportScreen {...props} />);
  });

  it("renders", () => {
    expect(wrapper.find("View").length).toEqual(0);
  });
});
