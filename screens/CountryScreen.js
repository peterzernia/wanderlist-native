import React, { Component } from "react";
import {
  Linking,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import PropTypes from "prop-types";

import CountryMap from "../components/CountryMap";
import Layout from "../constants/Layout";

export default class CountryScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { country } = navigation.state.params;
    return { title: country.name };
  };

  constructor() {
    super();
    this.state = {
      height: 0
    };
  }

  // Get flag dimensions before loading image.
  componentDidMount() {
    var { country } = this.props.navigation.state.params;

    Image.getSize(country.flag, (width, height) => {
      this.setState({
        height: Layout.window.width * 0.95 * (height / width)
      });
    });
  }

  render() {
    const { country } = this.props.navigation.state.params;
    return (
      <ScrollView>
        <View style={styles.container}>
          {// Nepal's flag has shape is not square and can't have a border.
          country.name === "Nepal" ? (
            <View style={styles.nepalContainer}>
              <Image
                style={[styles.flag, { height: this.state.height }]}
                source={{ uri: country.flag }}
              />
            </View>
          ) : (
            <View style={styles.flagContainer}>
              <Image
                style={[styles.flag, { height: this.state.height }]}
                source={{ uri: country.flag }}
              />
            </View>
          )}
          <View style={styles.map}>
            <CountryMap {...this.props.navigation.state.params} />
            {/* Open link to OSM copyright page when the text is clicked. */}
            <TouchableOpacity
              style={styles.oSMLogo}
              onPress={() =>
                Linking.openURL("https://www.openstreetmap.org/copyright")
              }
            >
              <Text style={{ fontSize: 10, color: "blue" }}>
                {" "}
                ©OpenStreetMap{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.info}>
            {country.native_name && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Native Name: </Text>
                <Text>{country.native_name}</Text>
              </View>
            )}
            {country.alt_spellings && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Alternate Spellings: </Text>
                <Text>{country.alt_spellings.join(", ")}</Text>
              </View>
            )}
            {country.capital && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Capital: </Text>
                <Text>{country.capital}</Text>
              </View>
            )}
            {country.demonym && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Demonym: </Text>
                <Text>{country.demonym}</Text>
              </View>
            )}
            {country.languages && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Languages: </Text>
                <Text>
                  {country.languages &&
                    country.languages.map(language => language.name).join(", ")}
                </Text>
              </View>
            )}
            {country.region && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Region: </Text>
                <Text>{country.region}</Text>
              </View>
            )}
            {country.subregion && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Subregion: </Text>
                <Text>{country.subregion}</Text>
              </View>
            )}
            {country.borders && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Borders: </Text>
                <Text>{country.borders && country.borders.join(", ")}</Text>
              </View>
            )}
            {country.regional_blocs && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Regional Trade Blocs: </Text>
                <Text>
                  {country.regional_blocs &&
                    country.regional_blocs.map(bloc => bloc.name).join(", ")}
                </Text>
              </View>
            )}
            {country.population && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Population: </Text>
                <Text>{country.population}</Text>
              </View>
            )}
            {country.area && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Area: </Text>
                <Text>{country.area} km²</Text>
              </View>
            )}
            {country.latlng && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Latitude & Longitude: </Text>
                <Text>{country.latlng && country.latlng.join(", ")}</Text>
              </View>
            )}
            {country.timezones && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Timezone(s): </Text>
                <Text>{country.timezones && country.timezones.join(", ")}</Text>
              </View>
            )}
            {country.top_level_domain && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Top Level Domain(s): </Text>
                <Text>
                  {country.top_level_domain &&
                    country.top_level_domain.join(", ")}
                </Text>
              </View>
            )}
            {country.alpha2code && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>ISO ALPHA-2: </Text>
                <Text>{country.alpha2code}</Text>
              </View>
            )}
            {country.alpha3code && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>ISO ALPHA-3: </Text>
                <Text>{country.alpha3code}</Text>
              </View>
            )}
            {country.gini && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Gini Coefficient: </Text>
                <Text>{country.gini}</Text>
              </View>
            )}
            {country.numeric_code && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Numeric Code: </Text>
                <Text>{country.numeric_code}</Text>
              </View>
            )}
            {country.calling_codes && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>Calling Code(s): </Text>
                <Text>
                  {country.calling_codes && country.calling_codes.join(", ")}
                </Text>
              </View>
            )}
            {country.cioc && (
              <View style={styles.textContainer}>
                <Text style={styles.category}>CIOC: </Text>
                <Text>{country.cioc}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

CountryScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  flagContainer: {
    width: Layout.window.width * 0.95,
    alignSelf: "center",
    margin: 5,
    marginTop: 10,
    borderWidth: 1
  },
  nepalContainer: {
    width: Layout.window.width * 0.95,
    alignSelf: "center",
    margin: 5,
    marginTop: 10
  },
  flag: {
    width: Layout.window.width * 0.95,
    resizeMode: "cover"
  },
  map: {
    height: 200,
    width: Layout.window.width * 0.95,
    borderWidth: 0.5,
    overflow: "hidden",
    margin: 10
  },
  oSMLogo: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, .75)"
  },
  info: {
    width: Layout.window.width * 0.95,
    borderRadius: 10,
    borderWidth: 0.5,
    padding: 10,
    margin: 5,
    marginBottom: 10
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  category: {
    fontWeight: "bold"
  }
});
