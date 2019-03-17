import React from "react";
import { shallow } from "enzyme";
import TripReportHeader from "../TripReportHeader";
import { Alert } from "react-native";

describe("<TripReportHeader />", () => {
  let wrapper;
  const author = {
    username: "Test",
    pk: 1,
    home: { name: "test", flag: "https://test.com" }
  };
  const tripReport = {
    title: "Test",
    countries: [{ name: "Test", id: 1 }],
    favoriters: [],
    author
  };
  const props = { tripReport };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<TripReportHeader {...props} />);
  });

  it("alerts", () => {
    spy = jest.spyOn(Alert, "alert");
    wrapper
      .find("TouchableOpacity")
      .at(0)
      .simulate("press");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
