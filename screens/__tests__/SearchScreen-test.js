import React from "react";
import { shallow } from "enzyme";
import { SearchScreen } from "../SearchScreen";

describe("<SearchScreen />", () => {
  let wrapper;
  const fetchCountries = jest.fn();
  let fetchingCountries = false;
  const user = {
    username: "Test",
    countries: [],
    home: { id: 1, name: "TestHome" },
    biography: "Test"
  };
  const updateUser = jest.fn();
  let updatingUser = false;
  let countries = [];
  let props = {
    fetchCountries,
    fetchingCountries,
    user,
    updateUser,
    updatingUser,
    countries
  };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<SearchScreen {...props} />);
  });

  it("handles Search", () => {
    wrapper.instance().handleSearch();
    expect(fetchCountries).toHaveBeenCalledTimes(1);
  });

  /**
   * Must await handleUpdate because it calls AsyncStorage.getItem()
   * which returns a promise.
   */
  it("handles Update", async () => {
    await wrapper.instance().handleUpdate({ name: "TestCountry", id: 2 });
    expect(updateUser).toHaveBeenCalledTimes(1);
  });

  it("renders header", () => {
    let header = wrapper.instance().renderHeader();
    expect(header).not.toEqual(null);
  });
});
