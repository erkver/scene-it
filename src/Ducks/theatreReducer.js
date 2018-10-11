import axios from "axios";

const GET_THEATRES = "GET_THEATRES";

export function getTheatres() {
  return {
    type: GET_THEATRES,
    payload: axios.get('/api/theatres')
  }
}

const initialState = {
  theatres: [],
  isLoading: false
};

export default function theatreReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_THEATRES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        theatres: action.payload
      };
    default:
      return state;
  } 
}