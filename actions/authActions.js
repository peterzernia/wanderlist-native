import axios from 'axios';
import { AsyncStorage } from 'react-native';

// Action creators
export const authStart = () => ({type: "AUTH_START"})
export const authSuccess = token => ({type: "AUTH_SUCCESS", token})
export const authFail = () => ({type: "AUTH_FAIL"})

export const authLogout = () => {
  try {
    AsyncStorage.removeItem('token', token);
    AsyncStorage.removeItem('username', username);
  } catch (err) {
    console.log(err)
  }
  return {type: "AUTH_LOGOUT"}
}

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(`https://localhost:8000/api/v1/rest-auth/login/`, {
      username: username,
      password: password
    })
      .then(response => {
        const token = response.data.key;
        try {
          AsyncStorage.setItem('token', token);
          AsyncStorage.setItem('username', username);
        } catch (err) {
          console.log(err)
        }
        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail());
      })
  }
}