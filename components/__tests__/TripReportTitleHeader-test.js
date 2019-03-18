import React from "react";
import { shallow } from "enzyme";
import TripReportTitleHeader from "../TripReportTitleHeader";

describe("<TripReportTitleHeader />", () => {
  let wrapper;
  let user = {
    pk: 1
  };
  let tripReport = {
    author: { pk: 1, home: { flag: "https://test.com/" } }
  };
  const handleDelete = jest.fn();
  const navigate = jest.fn();
  const navigation = { navigate };
  let props = { user, tripReport, handleDelete, navigation };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<TripReportTitleHeader {...props} />);
  });

  it("renders", () => {
    expect(wrapper.find("TouchableOpacity").length).toEqual(4);
  });
});
