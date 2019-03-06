import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

export default function PostTitleHeader(props) {
  const { tripReport } = props;
  return (
    <View style={styles.container}>
      <View>
        {
          tripReport
          ? <Text style={styles.titleText}>Edit Trip Report</Text>
          : <Text style={styles.titleText}>New Trip Report</Text>
        }
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        {
          tripReport
          ? <Text style={styles.buttonText}>Update</Text>
          : <Text style={styles.buttonText}>Post</Text>
        }
      </TouchableOpacity>
    </View>
  )
}

PostTitleHeader.propTypes = {
  tripReport: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonContainer: {
    marginRight: 30,
    alignSelf: 'center',
  },
  buttonText: {
    fontWeight: 'bold'
  }
})