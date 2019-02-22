import axios from 'axios';
import { AsyncStorage } from 'react-native';

// Action creators
export const authStart = () => ({type: "AUTH_START"})
export const authSuccess = token => ({type: "AUTH_SUCCESS", token})
export const authFail = () => ({type: "AUTH_FAIL"})

export const authLogout = () => {
  try {
    AsyncStorage.clear();
  } catch (err) {
    console.log(err)
  }
  return {type: "AUTH_LOGOUT"}
} 

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(`http://10.0.2.2:8000/api/v1/rest-auth/login/`, {
      username: username,
      password: password
    })
      .then(response => {
        var token = response.data.key;
        console.log(token)
        try {
          AsyncStorage.setItem('token', token);
        } catch (err) {
          console.log(err)
        }
        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail());
        console.log(err)
      })
  }
}

export const authRegister = (username, email, password1, password2, home) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(`http://10.0.2.2:8000/api/v1/rest-auth/registration/`, {
      username: username,
      email: email,
      password1: password1,
      password2: password2,
      home: home
    })
      .then(response => {
        var token = response.data.key;
        try {
          AsyncStorage.setItem('token', token);
        } catch (err) {
          console.log(err)
        }
        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail());
        console.log(err)
      })
  }
}

export const authCheckState = () => {
  try {
    var token = AsyncStorage.getItem('token');
  } catch (err) {
    console.log(err);
  }
  return dispatch => {
    if (token === null) {
      dispatch(authLogout());
    } else {
      dispatch(authSuccess(token));
    }
  }
}