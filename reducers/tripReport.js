const initialState = {
  fetchingTripReports: false,
  fetchedTripReports: false,
  tripReports: { results: [], count: null, next: null, previous: null},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetchingTripReports: true,
      }
    }
    case "FETCH_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        fetchingTripReports: false,
        fetchedTripReports: true,
        tripReports: action.tripReports,
      }
    }
    case "FETCH_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetchingTripReports: false,
        fetchedTripReports: false,
      }
    }
    // Return initialState on logout.
    case "AUTH_LOGOUT": {
      return {
        ...initialState,
      }
    }
    default:
      return state
  }
}
