import React from "react";
import { shallow } from "enzyme";
import TripReportTitleHeader from "../TripReportTitleHeader";
import { Alert, Modal } from "react-native";

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

  /**
   * Initially there is a component since the authenticated user
   * is the author, but when the author is changed, it renders null
   */
  it("renders conditionally", () => {
    expect(wrapper.find("TouchableOpacity").length).toEqual(4);
    wrapper.setProps({
      ...props,
      tripReport: {
        ...tripReport,
        author: { pk: 2, home: { flag: "https://test.com/" } }
      }
    });
    expect(wrapper.html()).toBeNull();
  });

  it("opens & closes modal", () => {
    // First TouchableOpacity opens Modal.
    expect(wrapper.state("modalVisible")).toEqual(false);
    wrapper
      .find("TouchableOpacity")
      .at(0)
      .simulate("press");
    expect(wrapper.state("modalVisible")).toEqual(true);

    // onRequestClose closes Modal.
    wrapper.find(Modal).simulate("requestClose");
    expect(wrapper.state("modalVisible")).toEqual(false);

    // Second TouchableOpacity closes Modal onPressOut.
    wrapper.setState({ modalVisible: true });
    wrapper
      .find("TouchableOpacity")
      .at(1)
      .simulate("pressOut");
    expect(wrapper.state("modalVisible")).toEqual(false);
  });

  it("third TouchableOpacity navigates & closes modal", () => {
    wrapper.setState({ modalVisible: true });
    wrapper
      .find("TouchableOpacity")
      .at(2)
      .simulate("press");
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(wrapper.state("modalVisible")).toEqual(false);
  });

  it("fourth TouchableOpacity alerts", () => {
    spy = jest.spyOn(Alert, "alert");
    wrapper
      .find("TouchableOpacity")
      .at(3)
      .simulate("press");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
