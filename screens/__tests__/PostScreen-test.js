import React from "react";
import { shallow } from "enzyme";
import PostScreen from "../PostScreen";

describe("<PostScreen />", () => {
  let wrapper;
  let tripReport = null;
  const params = { tripReport };
  const state = { params };
  const navigation = { state };
  let props = { navigation };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<PostScreen {...props} />);
  });

  it("renders", () => {
    expect(wrapper.find("View").length).toEqual(0);
  });
});
