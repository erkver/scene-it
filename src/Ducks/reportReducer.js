import axios from "axios";

const GET_REPORTS = "GET_REPORTS";
const GET_REPORT = "GET_REPORT";
const ADD_REPORT = "ADD_REPORT";

export function getReports() {
  return {
    type: GET_REPORTS,
    payload: axios.get('/api/reports')
  }
}

export function getReport(id) {
  return {
    type: GET_REPORT,
    payload: axios.get(`/api/reports/${id}`)
  }
}

export function addReport(
  attendance,
  ratio,
  reaction,
  movieId) {
  return {
    type: ADD_REPORT,
    payload: axios.post('/api/report', {
      attendance,
      ratio,
      reaction,
      movieId})
  }
}

const initialState = {
  reports: [],
  report: [],
  isLoading: false
}

export default function reportReducer(state = initialState, action) {
  switch(action.type) {
    case `${GET_REPORTS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        payload: action.payload.data
      };
    case `${GET_REPORT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        payload: action.payload.data
      };
    case `${ADD_REPORT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        payload: action.payload.data
      };
    default: 
      return state;
  }
}