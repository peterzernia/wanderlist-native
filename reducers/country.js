const initialState = {
  fetchingCountry: false,
  fetchedCountry: false,
  country: [],
}

/* Reducer Function*/
export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_COUNTRY_PENDING": {
      return {
        ...state,
        fetchingCountry: true,
        fetchedCountry: false,
      }
    }
    case "FETCH_COUNTRY_FULFILLED": {
      return {
        ...state,
        fetchingCountry: false,
        fetchedCountry: true,
        country: action.country,
      }
    }
    case "FETCH_COUNTRY_REJECTED": {
      return {
        ...state,
        fetchingCountry: false,
        fetchedCountry: false,
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
