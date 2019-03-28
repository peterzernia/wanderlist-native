import axios from "axios";
import { REACT_APP_API_URL } from "react-native-dotenv";
import { Alert } from "react-native";

// Action creators
export const fetchCountriesPending = () => ({
  type: "FETCH_COUNTRIES_PENDING"
});
export const fetchCountriesFulfilled = countries => ({
  type: "FETCH_COUNTRIES_FULFILLED",
  countries
});
export const fetchCountriesRejected = () => ({
  type: "FETCH_COUNTRIES_REJECTED"
});

export const fetchCountries = query => {
  return dispatch => {
    dispatch(fetchCountriesPending());
    return axios
      .get(`${REACT_APP_API_URL}/api/v1/countries/?search=${query}`)
      .then(response => {
        const countries = response.data;
        dispatch(fetchCountriesFulfilled(countries));
      })
      .catch(err => {
        dispatch(fetchCountriesRejected());
        let error = "";
        Object.keys(err.response.data).map(message => {
          switch (message) {
            default:
              return (error += `${message
                .charAt(0)
                .toUpperCase()}${message.slice(1)}: ${
                err.response.data[message]
              }\n`);
          }
        });
        Alert.alert("Error", error);
      });
  };
};
