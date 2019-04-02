import React from "react";
import { shallow } from "enzyme";
import { FeedScreen } from "../FeedScreen";
import FeedTitleHeader from "../../components/FeedTitleHeader";

describe("<FeedScreen />", () => {
  let wrapper;
  let user = { username: "TestUser" };
  let tripReports = { results: [], next: null };
  const fetchTripReports = jest.fn();
  const fetchNextTripReports = jest.fn();
  let fetchingTripReports = false;
  let fetchingNextTripReports = false;
  const params = { param: "Test" };
  const state = { params };
  const navigate = jest.fn();
  const setParams = jest.fn();
  const getParam = jest.fn();
  const navigation = { state, navigate, setParams, getParam };
  let props = {
    user,
    tripReports,
    fetchTripReports,
    fetchNextTripReports,
    fetchingTripReports,
    fetchingNextTripReports,
    navigation
  };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<FeedScreen {...props} />);
  });

  it("sets params when component mounts", () => {
    expect(setParams).toHaveBeenCalled();
  });

  it("navigationOptions", () => {
    const navigationOptions = FeedScreen.navigationOptions(props);
    expect(navigationOptions).toEqual({
      headerTitle: (
        <FeedTitleHeader
          {...params}
          handleSearch={navigation.getParam("handleSearch")}
        />
      )
    });
  });

  it("handles Search", () => {
    wrapper.instance().handleSearch();
    expect(fetchTripReports).toHaveBeenCalledTimes(1);
  });

  /**
   * handleLoadMore is called 3 times. The first time, fetchNextTripReports isn't called
   * because there is no tripReports.next url. The second time fetchNextTripReports IS
   * called because there is a tripReports.next url and it is different than state.url.
   * After it is called, state.url is set to tripReports.next, so when handleLoadMore
   * is called the last time, fetchTripReports is not called since
   * tripReport.next == state.url
   */
  it("loads more", () => {
    wrapper.instance().handleLoadMore();
    expect(fetchNextTripReports).toHaveBeenCalledTimes(0);

    wrapper.setProps({
      ...props,
      tripReports: { ...tripReports, next: "http://test.com/?page=2" }
    });
    wrapper.instance().handleLoadMore();
    expect(fetchNextTripReports).toHaveBeenCalledTimes(1);
    expect(wrapper.state("url")).toEqual("http://test.com/?page=2");

    wrapper.instance().handleLoadMore();
    expect(fetchNextTripReports).toHaveBeenCalledTimes(1);
  });

  /**
   * The first time the footer is rendered, there is no tripReport.next and
   * fetchingNextTripReports is false, therefore returns null. When these props
   * are set, the footer is not null.
   */
  it("renders footer", () => {
    let footer = wrapper.instance().renderFooter();
    expect(footer).toEqual(null);

    wrapper.setProps({
      ...props,
      tripReports: { ...tripReports, next: "http://test.com/?page=2" },
      fetchingNextTripReports: true
    });
    footer = wrapper.instance().renderFooter();
    expect(footer).not.toEqual(null);
  });

  /**
   * renderHeader() returns a View. To test it, it must be mounted as a
   * normal component.
   */
  it("renders header", () => {
    const header = shallow(wrapper.instance().renderHeader());
    // header.find("TouchableOpacity").simulate("press");
    // expect(navigate).toHaveBeenCalledTimes(1);
  });
});
