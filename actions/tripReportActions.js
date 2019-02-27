import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

// For fetching the first page of all of the Trip Reports
export const fetchTripReportsPending = () => ({type: "FETCH_TRIP_REPORTS_PENDING"})
export const fetchTripReportsFulfilled = tripReports => ({type: "FETCH_TRIP_REPORTS_FULFILLED", tripReports})
export const fetchTripReportsRejected = () => ({type: "FETCH_TRIP_REPORTS_REJECTED"})

// For fetching the next page of all of the next Trip Reports
export const fetchNextTripReportsPending = () => ({type: "FETCH_NEXT_TRIP_REPORTS_PENDING"})
export const fetchNextTripReportsFulfilled = tripReports => ({type: "FETCH_NEXT_TRIP_REPORTS_FULFILLED", tripReports})
export const fetchNextTripReportsRejected = () => ({type: "FETCH_NEXT_TRIP_REPORTS_REJECTED"})

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
              // case 'non_field_errors': {
              //   return error += `${err.response.data[message]}\n`
              // }
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
              // case 'non_field_errors': {
              //   return error += `${err.response.data[message]}\n`
              // }
              default: return error += `${message}: ${err.response.data[message]}\n`
            }
          });
          Alert.alert('Error', error);
      })
  }
}