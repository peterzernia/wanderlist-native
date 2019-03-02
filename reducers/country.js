const initialState = {
  fetchingCountries: false,
  fetchedCountries: false,
  countries: [],
}

/* Reducer Function*/
export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_COUNTRIES_PENDING": {
      return {
        ...state,
        fetchingCountries: true,
        fetchedCountries: false,
      }
    }
    case "FETCH_COUNTRIES_FULFILLED": {
      return {
        ...state,
        fetchingCountries: false,
        fetchedCountries: true,
        countries: action.countries,
      }
    }
    case "FETCH_COUNTRIES_REJECTED": {
      return {
        ...state,
        fetchingCountries: false,
        fetchedCountries: false,
      }
    }
    // Return to initialState on logout.
    case "AUTH_LOGOUT": {
      return {
        ...initialState
      }
    }
    default:
      return state
  }
}
