import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import TripReportFooter from './TripReportFooter';

// TripReportCard is shows a truncated text of the TripReport 
// on the FeedScreen, rendered in a FlatList.
export default function TripReportCard(props) {
  const { tripReport, navigation } = props;

  return (
    <TouchableOpacity 
      // Pass props into navigation to TripReportScreen.
      onPress={() => navigation.navigate(
        'TripReport', {...props}
      )}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{tripReport.title} </Text>
          <Text style={styles.author}>{tripReport.author.username}</Text>
        </View>
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
  header: {
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  author: {
    textAlign: 'center',
    fontSize: 20
  },
  body: {
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
});