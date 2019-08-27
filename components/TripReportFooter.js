import React from 'react'
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  Share,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'

// Reusable TripReportFooter Component used in TripReportCard and TripReportScreen.
export default function TripReportFooter(props) {
  const {
    tripReport, user, navigation, handleShare, handleFavorite,
  } = props

  const listCountries = tripReport.countries.map((country) => (
    <TouchableOpacity
      key={country.id}
      onPress={() => navigation.navigate('Country', { country })}
    >
      <Text style={styles.country}>{country.name}</Text>
    </TouchableOpacity>
  ))

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.line} />
      <View style={styles.countriesSection}>{listCountries}</View>
      <View style={styles.footer}>
        <View style={styles.favoriteButtonContainer}>
          {/* If the trip report favorite count is not 0, display the count. */}
          {!!tripReport.favoriters.length && (
            <Text style={styles.favoriteCount}>
              {tripReport.favoriters.length}
            </Text>
          )}
          <TouchableOpacity onPress={() => handleFavorite(tripReport.id)}>
            {/* Display border icon if Trip Report is not favorited. */}
            {tripReport.favoriters.includes(user.pk) ? (
              <Icon name="favorite" size={25} />
            ) : (
              <Icon name="favorite-border" size={25} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleShare(tripReport.slug)}>
          <Icon name="share" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

TripReportFooter.propTypes = {
  tripReport: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleShare: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  line: {
    height: 0,
    borderWidth: 0.3,
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
  },
  countriesSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  country: {
    padding: 5,
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
    marginRight: 2,
  },
})
