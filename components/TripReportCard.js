import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

import TripReportFooter from "./TripReportFooter";
import TripReportHeader from "./TripReportHeader";
import { handleShare } from "../constants/Functions";

// TripReportCard is shows a truncated text of the TripReport
// on the FeedScreen, rendered in a FlatList.
export default function TripReportCard(props) {
  const { tripReport, navigation } = props;

  return (
    <TouchableOpacity
      // Pass props into navigation to TripReportScreen.
      onPress={() => navigation.navigate("TripReport", { ...props })}
    >
      <View style={styles.card}>
        <TripReportHeader {...props} />
        <View style={styles.body}>
          <Text numberOfLines={3}>{tripReport.content}</Text>
        </View>
        <TripReportFooter {...props} handleShare={handleShare} />
      </View>
    </TouchableOpacity>
  );
}

TripReportCard.propTypes = {
  tripReport: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 0.1,
    marginBottom: 10,
    padding: 5
  },
  body: {
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10
  }
});
