import axios from "axios";

const GET_THEATRES = "GET_THEATRES";
const GET_THEATRE = "GET_THEATRE";

export function getTheatres() {
  return {
    type: GET_THEATRES,
    payload: axios.get('/api/theatres')
  }
}

export function getTheatre() {
  return {
    type: GET_THEATRES,
    payload: axios.get('/api/theatre/:id')
  }
}

const initialState = {
  theatres: [],
  theatre: {},
  isLoading: false
};

export default function theatreReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_THEATRES}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_THEATRES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        theatres: action.payload.data
      };
    case `${GET_THEATRE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_THEATRE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        theatre: action.payload.data
      };
    default:
      return state;
  } 
}