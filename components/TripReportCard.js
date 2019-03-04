import React, { PureComponent } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TripReportCard extends PureComponent {
  render() {
    const { tripReport, user, navigation, handlePress, onShare} = this.props;

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
        <View style={styles.footer}>
          <View style={styles.favoriteButtonContainer}>
            {/* If the trip report favorite count is not 0, display the count. */}
            {
             (!!tripReport.favoriters.length) && 
             <Text style={styles.favoriteCount}>{tripReport.favoriters.length}</Text>
            }
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={() => handlePress(tripReport.id)}
            >
            {
              tripReport.favoriters.includes(user.pk)
              ? <Icon name='favorite' size={25} />
              : <Icon name='favorite-border' size={25} />
            }
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={() => onShare(tripReport.slug)}
          >
            <Icon name='share' size={25} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
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
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
  favoriteButtonContainer: {
    flexDirection: 'row',
  },
  favoriteCount: {
    fontSize: 18,
    marginRight: 2
  },
  favoriteButton: {
  },
  shareButton: {
  }
})