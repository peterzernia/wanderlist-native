import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import TripReportFooter from './TripReportFooter';

// TripReportCard is shown on FeedScreen in a FlatList.
export default function TripReportCard(props) {
  const { tripReport, navigation } = props;

  const listCountries = tripReport.countries.map(country => {
    <Text>{country.name}</Text>
  });
  return (
    <TouchableOpacity 
      style={styles.card}
      // Pass tripReport prop into navigation to Trip Report Screen.
      onPress={() => navigation.navigate('TripReport', {tripReport: tripReport})}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{tripReport.title} </Text>
        <Text style={styles.author}>{tripReport.author.username}</Text>
      </View>
      <View style={styles.body}>
        <Text numberOfLines={3}>
          {tripReport.content}
        </Text>
      </View>
      <View style={styles.countriesSection}>
        {listCountries}
      </View>
      <TripReportFooter {...props} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5, 
    borderWidth: .1,
    alignItems: 'center',
    marginBottom: 10
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
    justifyContent: 'space-around',
    padding: 10,
  },
  countriesSection: {
  },
});