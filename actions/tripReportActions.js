import axios from 'axios';
import { Alert } from 'react-native';
import { REACT_APP_API_URL } from 'react-native-dotenv';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// For fetching the first page of all of the Trip Reports
export const fetchTripReportsPending = () => ({type: "FETCH_TRIP_REPORTS_PENDING"})
export const fetchTripReportsFulfilled = tripReports => ({type: "FETCH_TRIP_REPORTS_FULFILLED", tripReports})
export const fetchTripReportsRejected = () => ({type: "FETCH_TRIP_REPORTS_REJECTED"})

// For fetching the next page of all of the next Trip Reports
export const fetchNextTripReportsPending = () => ({type: "FETCH_NEXT_TRIP_REPORTS_PENDING"})
export const fetchNextTripReportsFulfilled = tripReports => ({type: "FETCH_NEXT_TRIP_REPORTS_FULFILLED", tripReports})
export const fetchNextTripReportsRejected = () => ({type: "FETCH_NEXT_TRIP_REPORTS_REJECTED"})

// For fetching the first page of Trip Reports of the authenticated user
export const fetchUserTripReportsPending = () => ({type: "FETCH_USER_TRIP_REPORTS_PENDING"})
export const fetchUserTripReportsFulfilled = tripReports => ({type: "FETCH_USER_TRIP_REPORTS_FULFILLED", tripReports})
export const fetchUserTripReportsRejected = () => ({type: "FETCH_USER_TRIP_REPORTS_REJECTED"})

// For fetching the next page of the authenticated users Trip Reports
export const fetchNextUserTripReportsPending = () => ({type: "FETCH_NEXT_USER_TRIP_REPORTS_PENDING"})
export const fetchNextUserTripReportsFulfilled = tripReports => ({type: "FETCH_NEXT_USER_TRIP_REPORTS_FULFILLED", tripReports})
export const fetchNextUserTripReportsRejected = () => ({type: "FETCH_NEXT_USER_TRIP_REPORTS_REJECTED"})

// For the authenticated user to POST request a new trip report
export const postTripReportPending = () => ({type: "POST_TRIP_REPORT_PENDING"})
export const postTripReportFulfilled = response => ({type: "POST_TRIP_REPORT_FULFILLED", response})
export const postTripReportRejected = () => ({type: "POST_TRIP_REPORT_REJECTED"})

// For the authenticated user to delete a Trip Report of theirs
export const deleteTripReportPending = () => ({type: "DELETE_TRIP_REPORT_PENDING"})
export const deleteTripReportFulfilled = response => ({type: "DELETE_TRIP_REPORT_FULFILLED", response})
export const deleteTripReportRejected = () => ({type: "DELETE_TRIP_REPORT_REJECTED"})

// For the authenticated user to update a Trip Report of theirs
export const updateTripReportPending = () => ({type: "UPDATE_TRIP_REPORT_PENDING"})
export const updateTripReportFulfilled = response => ({type: "UPDATE_TRIP_REPORT_FULFILLED", response})
export const updateTripReportRejected = () => ({type: "UPDATE_TRIP_REPORT_REJECTED"})

/*
GET requests the Django REST API and returns the first page of a list of Trip
Reports. The passed in url can have filter parameters added.
*/
export const fetchTripReports = (url) => {
  return dispatch => {
    dispatch(fetchTripReportsPending());
    axios.get(url)
      .then(response => {
        const tripReports = response.data;
        dispatch(fetchTripReportsFulfilled(tripReports));
      })
      .catch(err => {
        dispatch(fetchTripReportsRejected());
        let error = '';
          Object.keys(err.response.data).map(message => {
            switch(message) {
              default: return error += `${message}: ${err.response.data[message]}\n`
            }
          });
          Alert.alert('Error', error);
      })
  }
}

/*
Since the Trip Reports are paginated, the original axios call returns an object
with a Next variable that contains the link API of the the next page, which is
passed into this function to GET the next Trip Reports.
*/
export const fetchNextTripReports = (url) => {
  return dispatch => {
    dispatch(fetchNextTripReportsPending());
    axios.get(url)
      .then(response => {
        const tripReports = response.data;
        dispatch(fetchNextTripReportsFulfilled(tripReports));
      })
      .catch(err => {
        dispatch(fetchNextTripReportsRejected());
        let error = '';
          Object.keys(err.response.data).map(message => {
            switch(message) {
              default: return error += `${message.charAt(0).toUpperCase()}${message.slice(1)}: ${err.response.data[message]}\n`
            }
          });
          Alert.alert('Error', error);
      })
  }
}

/*
GET requests the Django REST API with the parameter of username to return the
first page of the list of the Users TripReports.
*/
export const fetchUserTripReports = (username) => {
  return dispatch => {
    dispatch(fetchUserTripReportsPending());
    axios.get(`${REACT_APP_API_URL}/api/v1/reports/?ordering=-pk&search=${username}`)
      .then(response => {
        const tripReports = response.data;
        dispatch(fetchUserTripReportsFulfilled(tripReports));
      })
      .catch(err => {
        dispatch(fetchUserTripReportsRejected());
        let error = '';
        Object.keys(err.response.data).map(message => {
          switch(message) {
            default: return error += `${message.charAt(0).toUpperCase()}${message.slice(1)}: ${err.response.data[message]}\n`
          }
        });
        Alert.alert('Error', error);
      })
  }
}

/*
Again, the paginated API returns a next variable that is the url to the next
page, which is passed into this function to retrieve the next page of the user's
Trip Reports.
*/
export const fetchNextUserTripReports = (url) => {
  return dispatch => {
    dispatch(fetchNextUserTripReportsPending());
    axios.get(url)
      .then(response => {
        const tripReports = response.data;
        dispatch(fetchNextUserTripReportsFulfilled(tripReports));
      })
      .catch(err => {
        dispatch(fetchNextUserTripReportsRejected());
        let error = '';
        Object.keys(err.response.data).map(message => {
          switch(message) {
            default: return error += `${message.charAt(0).toUpperCase()}${message.slice(1)}: ${err.response.data[message]}\n`
          }
        });
        Alert.alert('Error', error);
      })
  }
}

/*
POST requests a new trip report to the Django REST API by the authenticated
user.
*/
export const postTripReport = (token, author, title, content, countries) => {
  return dispatch => {
    dispatch(postTripReportPending());
    axios.post(
      `${REACT_APP_API_URL}/api/v1/reports/`, 
      { author, title, content, countries},
      {headers: { 'Authorization': `Token ${token}`}}
    )
      .then(response => {
        dispatch(postTripReportFulfilled(response.data));
      })
      .catch(err => {
        dispatch(postTripReportRejected());
        let error = '';
        Object.keys(err.response.data).map(message => {
          switch(message) {
            default: return error += `${message.charAt(0).toUpperCase()}${message.slice(1)}: ${err.response.data[message]}\n`
          }
        });
        Alert.alert('Error', error);
      })
  }
}

// Deletes a post of the authenticated user on the API.
export const deleteTripReport = (token, tripReport) => {
  return dispatch => {
    dispatch(deleteTripReportPending());
    axios.delete(`${REACT_APP_API_URL}/api/v1/reports/${tripReport.id}/`, 
    {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': 'csrftoken',
        'Authorization': `Token ${token}`
      }
    })
      .then(response => {
        dispatch(deleteTripReportFulfilled(tripReport));
        Alert.alert('Success', 'Your post has been deleted.');
      })
      .catch(err => {
        dispatch(deleteTripReportRejected());
        let error = '';
        Object.keys(err.response.data).map(message => {
          switch(message) {
            default: return error += `${message.charAt(0).toUpperCase()}${message.slice(1)}: ${err.response.data[message]}\n`
          }
        });
        Alert.alert('Error', error);
      })
  }
}

// Updates a post of the authenticated user on the API.
export const updateTripReport = (token, id, author, title, content, countries) => {
  return dispatch => {
    dispatch(updateTripReportPending());
    axios.patch(`${REACT_APP_API_URL}/api/v1/reports/${id}/`, 
    { author, title, content, countries },
      {
        headers: 
        {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': 'csrftoken',
          'Authorization': `Token ${token}`
        }
    })
      .then(response => {
        dispatch(updateTripReportFulfilled(response.data));
        Alert.alert('Success', 'Your post has been updated.');
      })
      .catch(err => {
        dispatch(updateTripReportRejected());
        let error = '';
        Object.keys(err.response.data).map(message => {
          switch(message) {
            default: return error += `${message.charAt(0).toUpperCase()}${message.slice(1)}: ${err.response.data[message]}\n`
          }
        });
        Alert.alert('Error', error);
      })
  }
}