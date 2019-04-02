export const initialState = {
  fetchingUser: false,
  fetchedUser: false,
  updatingUser: false,
  user: { countries: [] }
};

/* Reducer Function*/
export default function(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USER_PENDING": {
      return {
        ...state,
        fetchingUser: true
      };
    }
    case "FETCH_USER_FULFILLED": {
      return {
        ...state,
        fetchingUser: false,
        fetchedUser: true,
        user: action.user
      };
    }
    case "FETCH_USER_REJECTED": {
      return {
        ...state,
        fetchingUser: false,
        fetchedUser: false
      };
    }
    case "UPDATE_USER_PENDING": {
      return {
        ...state,
        updatingUser: true
      };
    }
    case "UPDATE_USER_FULFILLED": {
      return {
        ...state,
        updatingUser: false,
        user: action.user
      };
    }
    case "UPDATE_USER_REJECTED": {
      return {
        ...state,
        updatingUser: false
      };
    }
    // Reset authenticated user object on logout.
    case "AUTH_LOGOUT": {
      return {
        ...state,
        user: { countries: [] }
      };
    }
    default:
      return state;
  }
}
