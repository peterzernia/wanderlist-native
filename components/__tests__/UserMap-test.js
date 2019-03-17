import React from "react";
import { shallow } from "enzyme";
import UserMap from "../UserMap";
import { Marker } from "react-native-maps";

describe("<UserMap />", () => {
  let wrapper;
  let user = {
    countries: [
      { name: "Test1", id: 1, latlng: [90, 90] },
      { name: "Test2", id: 2, latlng: [180, 180] }
    ]
  };
  let props = { user };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<UserMap {...props} />);
  });

  it("renders Marker for each country", () => {
    expect(wrapper.find(Marker).length).toEqual(2);
    user = { countries: [] };
    props = { user };
    wrapper = shallow(<UserMap {...props} />);
    expect(wrapper.find(Marker).length).toEqual(0);
  });
});
