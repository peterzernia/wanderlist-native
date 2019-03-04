import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import TripReportFooter from '../components/TripReportFooter';

// TripReportScreen displays the full text of the Trip Reports.
export default function TripReportScreen(props) {
  // Pull tripReport prop out of navigation parameters.
  const { tripReport } = props.navigation.state.params;

  const listCountries = tripReport.countries.map(country => {
    <Text>{country.name}</Text>
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{tripReport.title} </Text>
          <Text style={styles.author}>{tripReport.author.username}</Text>
        </View>
        <View style={styles.body}>
          <Text>
            {tripReport.content}
          </Text>
        </View>
        <View style={styles.countriesSection}>
          {listCountries}
        </View>
        <TripReportFooter {...props.navigation.state.params} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
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
})