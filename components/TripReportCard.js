import React from 'react';
import { Image, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import TripReportFooter from './TripReportFooter';
import TripReportHeader from './TripReportHeader';

// TripReportCard is shows a truncated text of the TripReport 
// on the FeedScreen, rendered in a FlatList.
export default function TripReportCard(props) {
  const { tripReport, navigation } = props;
  var { alpha2code } = props.tripReport.author.home;
  alpha2code = alpha2code.toLowerCase()

  return (
    <TouchableOpacity 
      // Pass props into navigation to TripReportScreen.
      onPress={() => navigation.navigate(
        'TripReport', {...props}
      )}
    >
      <View style={styles.card}>
        <TripReportHeader {...props} />
        <View style={styles.body}>
          <Text numberOfLines={3}>
            {tripReport.content}
          </Text>
        </View>
        <TripReportFooter {...props} />
      </View>
    </TouchableOpacity>
  )
}

TripReportCard.propTypes = {
  tripReport: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5, 
    borderWidth: .1,
    marginBottom: 10,
    padding: 5,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
});