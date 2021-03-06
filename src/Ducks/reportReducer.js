import axios from 'axios';

const GET_REPORT = 'GET_REPORT';
const CLEAR_REPORT = 'CLEAR_REPORTS';

export function getReport(tr_id) {
  return {
    type: GET_REPORT,
    payload: axios.get(`/api/report/${tr_id}`)
  };
}

export function clearReports() {
  return {
    type: CLEAR_REPORT,
    payload: []
  };
}

const initialState = {
  report: [],
  isLoading: false
};

export default function reportReducer(state = initialState, action) {
  switch (action.type) {
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
    case CLEAR_REPORT:
      return {
        ...state,
        report: action.payload
      };
    default:
      return state;
  }
}
