const initialState = {
  fetchingTripReports: false,
  fetchedTripReports: false,
  fetchingNextTripReports: false,
  fetchedNextTripReports: false,
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
    /*
    In the case of fetching the next page of trip reports, the new trip reports
    need to be added to the list of existing, fetched trip reports. They must
    not overwnite the original list.
    */
    case "FETCH_NEXT_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetchingNextTripReports: true,
        fetchedNextTripReports: false
      }
    }
    case "FETCH_NEXT_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        fetchingNextTripReport: false,
        fetchedNextTripReport: true,
        tripReports: {
          count: action.tripReports.count,
          next: action.tripReports.next,
          previous: action.tripReports.previous,
          results: [...state.tripReports.results].concat(action.tripReports.results),
        }
      }
    }
    case "FETCH_NEXT_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetchingNextTripReport: false,
        fetchedNextTripReport: false,
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
