import axios from "axios";

const GET_REPORTS = "GET_REPORTS";
const GET_REPORT = "GET_REPORT";
const ADD_REPORT = "ADD_REPORT";
const EDIT_REPORT = "EDIT_REPORT";
const DELETE_REPORT =  "DELETE_REPORT";
const CLEAR_REPORTS =  "CLEAR_REPORTS";

export function getReports() {
  return {
    type: GET_REPORTS,
    payload: axios.get('/api/reports')
  }
};

export function getReport(tr_id) {
  return {
    type: GET_REPORT,
    payload: axios.get(`/api/report/${tr_id}`)
  }
};

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
      movieId
    })
  }
};

export function editReport(
  tr_id,
  attendance,
  ratio,
  reaction
  ) {
  return {
    type: EDIT_REPORT,
    payload: axios.put(`/api/report/${tr_id}`, {
      attendance,
      ratio,
      reaction  
    })
  }
};

export function deleteReport(tr_id) {
  return {
    type: DELETE_REPORT,
    payload: axios.delete(`/api/report/${tr_id}`)
  }
};

export function clearReports() {
  return {
    type: CLEAR_REPORTS,
    payload: {reports: initialState, report: initialState}
  }
}

const initialState = {
  reports: [],
  report: [],
  isLoading: false
};

export default function reportReducer(state = initialState, action) {
  switch(action.type) {
    case `${GET_REPORTS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_REPORTS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        reports: action.payload.data
      };
    case `${GET_REPORT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_REPORT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        report: action.payload.data
      };
    case `${ADD_REPORT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_REPORT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        report: action.payload.data
      };
    case `${EDIT_REPORT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${EDIT_REPORT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        reports: action.payload.data
      };
    case `${DELETE_REPORT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${DELETE_REPORT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        reports: action.payload.data
      };
    case CLEAR_REPORTS:
      return {
        ...state,
        reports: action.payload, 
        report: action.payload
      };
    default: 
      return state;
  }
};