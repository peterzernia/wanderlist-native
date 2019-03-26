import React from "react";
import { shallow } from "enzyme";
import FeedScreen from "../FeedScreen";

describe("<FeedScreen />", () => {
  let wrapper;
  const fetchTripReports = jest.fn();
  const navigate = jest.fn();
  const navigation = { navigate };
  let props = { fetchTripReports, navigation };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<FeedScreen {...props} />);
  });

  it("renders", () => {
    expect(wrapper.find("View").length).toEqual(0);
  });
});
