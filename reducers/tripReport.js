const initialState = {
  posting: false,
  fetchingTripReports: false,
  fetchedTripReports: false,
  fetchingNextTripReports: false,
  fetchedNextTripReports: false,
  fetchingUserTripReports: false,
  fetchedUserTripReports: false,
  fetchingNextUserTripReports: false,
  fetchingNextUserTripReports: false,
  tripReports: { results: [], count: null, next: null, previous: null },
  userTripReports: { results: [], count: null, next: null, previous: null },
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetchingTripReports: true,
        fetchedTripReports: false,
        tripReports: { results: [], count: null, next: null, previous: null },
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
    need to be added to the list of existing, fetched trip reports, not ovewrite them.
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
    // Basic axios request for fetching a user's Trip Reports
    case "FETCH_USER_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetchingUserTripReports: true,
        fetchedUserTripReports: false
      }
    }
    case "FETCH_USER_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        fetchingUserTripReports: false,
        fetchedUserTripReports: true,
        userTripReports: action.tripReports,
      }
    }
    case "FETCH_USER_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetchingUserTripReports: false,
        fetchedUserTripReports: false,
      }
    }
    /*
    In the case of fetching the next page of the user's trip reports, the new
    trip reports need to be added to the list of existing, fetched trip reports.
    They must not overwnite the original list.
    */
    case "FETCH_NEXT_USER_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetchingNextUserTripReports: true,
        fetchedNextUserTripReports: false
      }
    }
    case "FETCH_NEXT_USER_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        fetchingNextUserTripReports: false,
        fetchedNextUserTripReports: true,
        userTripReports: {
          count: action.tripReports.count,
          next: action.tripReports.next,
          previous: action.tripReports.previous,
          results: [...state.userTripReports.results].concat(action.tripReports.results),
        }
      }
    }
    case "FETCH_NEXT_USER_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetchingNextUserTripReports: false,
        fetchingNextUserTripReports: false,
      }
    }
    case "TOGGLE_FAVORITE_FULFILLED": {
      /*
      The response of the axios call to toggle favorite returns the new 
      Trip Report object with updated favorites array. This Trip Report 
      favoriters must replace the old Trip Report favoriters. User Trip 
      Reports do not need to be updated since a favorite button is never 
      shown for that array.
      */
      return {
        ...state,
        tripReports: {
          // Since order matters, only the specific index of the array should be changed.
          results: [...state.tripReports.results].map( tripReport => tripReport.id === action.response.id ? { ...tripReport, favoriters: action.response.favoriters} : {...tripReport}),
          count: state.tripReports.count,
          next: state.tripReports.next,
          previous: state.tripReports.previous
        },
        userTripReports: {
          results: [...state.userTripReports.results].map( tripReport => tripReport.id === action.response.id ? { ...tripReport, favoriters: action.response.favoriters} : {...tripReport}),
          count: state.userTripReports.count,
          next: state.userTripReports.next,
          previous: state.userTripReports.previous
        }
      }
    }
    case "POST_TRIP_REPORT_PENDING": {
      return {
        ...state,
        posting: true
        }
    }
    case "POST_TRIP_REPORT_FULFILLED": {
      /*
      The axios response is a single trip report. The new trip report must be
      added onto the array, then the array must be sorted by id for both the
      Trip Reports and User Trip Reports lists.
      */
      return {
        ...state,
        tripReports: {
          results: [...state.tripReports.results].concat(action.response).sort((a, b) => a.id < b.id),
          count: state.tripReports.count,
          next: state.tripReports.next,
          previous: state.tripReports.previous
        },
        userTripReports: {
          results: [...state.userTripReports.results].concat(action.response).sort((a, b) => a.id < b.id),
          count: state.userTripReports.count,
          next: state.userTripReports.next,
          previous: state.userTripReports.previous
        },
        posting: false
      }
    }
    case "POST_TRIP_REPORT_REJECTED": {
      return {
        ...state,
        posting: false
        }
    }
    case "DELETE_TRIP_REPORTS_FULFILLED": {
      /*
      The response is the deleted post that must be filtered out of both
      lists.
      */
      return {
        ...state,
        tripReports: {
          results: [...state.tripReports.results].filter(tripReport => tripReport.id !== action.response.id),
          count: state.tripReports.count,
          next: state.tripReports.next,
          previous: state.tripReports.previous
        },
        userTripReports: {
          results: [...state.userTripReports.results].filter(tripReport => tripReport.id !== action.response.id),
          count: state.userTripReports.count,
          next: state.userTripReports.next,
          previous: state.userTripReports.previous
        },
      }
    }
    case "UPDATE_USER_FULFILLED": {
      return {
        ...state,
        tripReports: {
          results: [...state.tripReports.results].map( tripReport => tripReport.author.pk === action.user.pk ? { ...tripReport, author: action.user} : {...tripReport}),
          count: state.tripReports.count,
          next: state.tripReports.next,
          previous: state.tripReports.previous
        },
        userTripReports: {
          results: [...state.userTripReports.results].map( tripReport => tripReport.author.pk === action.user.pk ? { ...tripReport, author: action.user} : {...tripReport}),
          count: state.userTripReports.count,
          next: state.userTripReports.next,
          previous: state.userTripReports.previous
        }
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
