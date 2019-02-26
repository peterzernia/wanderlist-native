import axios from 'axios'

// Fetch authenticated user action creators
export const fetchUserPending = () => ({type: "FETCH_USER_PENDING"})
export const fetchUserFulfilled = user => ({type: "FETCH_USER_FULFILLED", user})
export const fetchUserRejected = () => ({type: "FETCH_USER_REJECTED"})

// GET requests the Django REST API, which returns authenticated user object.
export const fetchUser = token => {
  return dispatch => {
    dispatch(fetchUserPending());
    axios.get(`http://10.0.2.2:8000/api/v1/rest-auth/user/`, 
      {
        headers: { 'Authorization': `Token ${token}`}
      })
        .then(response => {
          const user = response.data;
          dispatch(fetchUserFulfilled(user));
        })
        .catch(err => {
          dispatch(fetchUserRejected());
          dispatch({type: "ADD_ERROR", error: err});
        })
  }
}
