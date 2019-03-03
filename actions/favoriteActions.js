import axios from 'axios'
import { REACT_APP_API_URL } from 'react-native-dotenv';

// Action creators
export const toggleFavoriteFulfilled = response => ({type: "TOGGLE_FAVORITE_FULFILLED", response})
export const toggleFavoriteRejected = () => ({type: "TOGGLE_FAVORITE_REJECTED"})

export const toggleFavorite = (id, token) => {
  return dispatch => {
    axios.get(`${REACT_APP_API_URL}/api/v1/reports/${id}/favorite/`, 
      {
        headers: { 'Authorization': `Token ${token}`}
      })
      .then(response => {
        dispatch(toggleFavoriteFulfilled(response.data));
      })
      .catch(err => {
        dispatch(toggleFavoriteRejected());
        let error = '';
        Object.keys(err.response.data).map(message => {
          switch(message) {
            default: return error += `message: ${err.response.data[message]}\n`
          }
        });
      })
  }
}
