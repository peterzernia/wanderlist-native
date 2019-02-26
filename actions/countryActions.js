import axios from 'axios'

// Action creators
export const fetchCountryPending = () => ({type: "FETCH_COUNTRY_PENDING"})
export const fetchCountryFulfilled = country => ({type: "FETCH_COUNTRY_FULFILLED", country})
export const fetchCountryRejected = () => ({type: "FETCH_COUNTRY_REJECTED"})


export const fetchCountry = (query) => {
  return dispatch => {
    dispatch(fetchCountryPending());
    return axios.get(`http://10.0.2.2:8000/api/v1/countries/?search=${query}`)
      .then(response => {
        const country = response.data;
        dispatch(fetchCountryFulfilled(country));
      })
      .catch(err => {
        dispatch(fetchCountryRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}
