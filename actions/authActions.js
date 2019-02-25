import axios from 'axios';
import { AsyncStorage, Alert } from 'react-native';

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
        try {
          AsyncStorage.setItem('token', token);
        } catch (err) {
          console.log(err)
        }
        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail());
        let error = '';
        Object.keys(err.response.data).map(message => {
          switch(message) {
            case 'password': {
              return error += `${message.charAt(0).toUpperCase()}${message.slice(1)}: ${err.response.data[message]}\n`
            }
            case 'non_field_errors': {
              return error += `${err.response.data[message]}\n`
            }
            default: return null
          }
        });
        Alert.alert('Error', error);
        console.log(error)
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
        Alert.alert('Error', err.message)
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