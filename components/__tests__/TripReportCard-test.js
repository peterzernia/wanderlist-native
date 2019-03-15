import React from "react";
import { shallow } from "enzyme";
import TripReportCard from "../TripReportCard";

describe("<TripReportCard />", () => {
  it("navigaties", () => {
    // Setup props.
    const navigate = jest.fn();
    const navigation = { navigate };
    const tripReport = { title: "Test", content: "Test" };
    const user = { username: "Test" };
    const toggleFavorite = jest.fn();
    const props = { navigation, tripReport, user, toggleFavorite };

    // Test navigate func is called onPress.
    const wrapper = shallow(<TripReportCard {...props} />);
    expect(wrapper.find("TouchableOpacity").length).toEqual(1);
    wrapper.find("TouchableOpacity").simulate("press");
    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
