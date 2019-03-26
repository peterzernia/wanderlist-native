import React from "react";
import { shallow } from "enzyme";
import CountryScreen from "../CountryScreen";
import { ScrollView } from "react-native";

describe("<CountryScreen />", () => {
  let wrapper;
  let country = {
    id: 2,
    currencies: [
      {
        code: "EUR",
        name: "European Euro",
        symbol: "€"
      }
    ],
    languages: [
      {
        iso639_1: "sv",
        name: "Swedish",
        native_name: "svenska"
      }
    ],
    regional_blocs: [
      {
        acronym: "EU",
        name: "European Union",
        other_acronyms: null,
        other_names: null
      }
    ],
    name: "Aland Islands",
    top_level_domain: [".ax"],
    alpha2code: "AX",
    alpha3code: "ALA",
    calling_codes: ["358"],
    capital: "Mariehamn",
    alt_spellings: ["AX", "Aaland", "Åland", "Ahvenanmaa"],
    region: "Europe",
    subregion: "Northern Europe",
    population: 28875,
    latlng: [60.116667, 19.9],
    demonym: "Ålandish",
    area: 1580.0,
    gini: null,
    timezones: ["UTC+02:00"],
    borders: [],
    native_name: "Åland",
    numeric_code: "248",
    flag: "https://raw.githubusercontent.com/peterzernia/flags/master/ax.png",
    cioc: null
  };
  const params = { country };
  const state = { params };
  const navigation = { state };
  let props = { navigation };

  // Setup wrapper
  beforeEach(() => {
    wrapper = shallow(<CountryScreen {...props} />);
  });

  it("renders", () => {
    expect(wrapper.find(ScrollView).length).toEqual(1);
  });
});
