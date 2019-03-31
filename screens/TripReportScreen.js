import React, { Component } from "react";
import { AsyncStorage, ScrollView, StyleSheet, Text, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TripReportFooter from "../components/TripReportFooter";
import TripReportHeader from "../components/TripReportHeader";
import TripReportTitleHeader from "../components/TripReportTitleHeader";
import { deleteTripReport } from "../actions/tripReportActions";
import { toggleFavorite } from "../actions/favoriteActions";
import { handleShare } from "../constants/Functions";

// TripReportScreen displays the full text of the Trip Reports.
export class TripReportScreen extends Component {
  // Custom headerTitle component.
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: (
        <TripReportTitleHeader
          {...params}
          handleDelete={navigation.getParam("handleDelete")}
        />
      )
    };
  };

  // Set handleDelete() as a parameter to pass into TripReportTitle.
  componentDidMount() {
    this.props.navigation.setParams({ handleDelete: this.handleDelete });
  }

  handleDelete = async tripReport => {
    const { deleteTripReport } = this.props;
    const token = await AsyncStorage.getItem("token");
    deleteTripReport(token, tripReport);
  };

  render() {
    /**
     * A Trip Report is passed in as a navigation prop, but this prop is
     * not connected to the Redux state, so the Trip Report has to be mapped to
     * props from state and passed into the Header and Footer components to
     * correctly rerender on state changes.
     */
    const { tripReports, userTripReports, navigation } = this.props;
    let tripReport;

    /**
     * Check where navigation is from - if from Feed page, tripReport is from
     * tripReports prop, if from Profile page, tripReport is from userTripReports
     * prop to prevent crash when tripReports reload, but Profile page has
     * TripReportScreen open.
     */
    if (navigation.state.params.navigation.state.routeName === "Feed") {
      [tripReport] = tripReports.results.filter(
        tripReport => tripReport.id === navigation.state.params.tripReport.id
      );
    } else if (
      navigation.state.params.navigation.state.routeName === "Profile"
    ) {
      [tripReport] = userTripReports.results.filter(
        tripReport => tripReport.id === navigation.state.params.tripReport.id
      );
    }

    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          <TripReportHeader tripReport={tripReport} {...this.props} />
          <View style={styles.body}>
            <Text>{tripReport.content}</Text>
          </View>
          <TripReportFooter
            tripReport={tripReport}
            handleShare={handleShare}
            {...this.props}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    tripReports: state.tripReport.tripReports,
    userTripReports: state.tripReport.userTripReports,
    user: state.user.user
  };
};

const mapDispatch = dispatch => {
  return bindActionCreators(
    {
      deleteTripReport,
      toggleFavorite
    },
    dispatch
  );
};

export default connect(
  mapState,
  mapDispatch
)(TripReportScreen);

TripReportScreen.propTypes = {
  deleteTripReport: PropTypes.func.isRequired,
  tripReports: PropTypes.object.isRequired,
  userTripReports: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  toggleFavorite: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 5
  },
  body: {
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10
  }
});
