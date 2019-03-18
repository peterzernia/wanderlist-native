import React from "react";
import { shallow } from "enzyme";
import FeedTitleHeader from "../FeedTitleHeader";

describe("<FeedTitleHeader />", () => {
  let wrapper;
  const handleSearch = jest.fn();
  let props = { handleSearch };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<FeedTitleHeader {...props} />);
  });

  it("renders", () => {
    expect(wrapper.find("TouchableOpacity").length).toEqual(1);
  });
});
