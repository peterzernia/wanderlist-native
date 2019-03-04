import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

export default function TripReportHeader(props) {
  const { tripReport } = props;
  var { alpha2code } = props.tripReport.author.home;
  alpha2code = alpha2code.toLowerCase()

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.flagContainer}
        onPress={() => Alert.alert('', tripReport.author.home.name)}
      >
        <Image
          style={styles.flag}
          source={{uri: `https://raw.githubusercontent.com/peterzernia/flags/master/${alpha2code}.png`}}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{tripReport.title} </Text>
        <Text style={styles.author}>{tripReport.author.username}</Text>
      </View>
      <View style={styles.flagOffset} />
    </View>
  )
}

TripReportHeader.propTypes = {
  tripReport: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flagContainer: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    borderWidth: .5,
    borderColor: 'black',
    marginRight: 5,
    marginLeft: 5,
    overflow: 'hidden',
  },
  flag: {
    resizeMode: 'cover', 
    height: 50,
    width: 'auto'
  },
  flagOffset: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    marginRight: 5,
    marginLeft: 5,
  },
  textContainer: {
    maxWidth: '50%',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  author: {
    textAlign: 'center',
    fontSize: 18
  },
})