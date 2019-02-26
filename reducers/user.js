const initialState = {
  fetchingUser: false,
  fetchedUser: false,
  user: {},
}

/* Reducer Function*/
export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_USER_PENDING": {
      return {
        ...state,
        fetchingUser: true
      }
    }
    case "FETCH_USER_FULFILLED": {
      return {
        ...state,
        fetchingUser: false,
        fetchedUser: true,
        user: action.user
      }
    }
    case "FETCH_USER_REJECTED": {
      return {
        ...state,
        fetchingUser: false,
        fetchedUser: false,
      }
    }
    // Reset authenticated user object on logout.
    case "AUTH_LOGOUT": {
      return {
        ...state,
        user: {},
      }
    }
    default:
      return state
  }
}
