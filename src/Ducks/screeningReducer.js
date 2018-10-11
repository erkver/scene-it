import axios from 'axios';
// import moment from "moment";

const GET_SCREENINGS = "GET_SCREENINGS";
const GET_SCREENING = "GET_SCREENING";
// const ADD_SCREENING = "ADD_SCREENING";
// const HANDLE_DATE = "HANDLE_DATE";

export function getScreenings() {
  return {
    type: GET_SCREENINGS,
    payload: axios.get("/api/screenings")
  };
}

export function getScreening(id) {
  return {
    type: GET_SCREENING,
    payload: axios.get(`/api/screening/${id}`)
  };
}

// export function handleDate(date) {
//   return {
//     type: HANDLE_DATE,
//     startDate: date
//   }
// }

const initialState = {
  screenings: [],
  screening: [],
  // startDate: moment(),
  isLoading: false
};

export default function screeningReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_SCREENINGS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        screenings: action.payload.data.results
      };
    case `${GET_SCREENING}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        screening: action.payload.data
      };
    // case HANDLE_DATE:
    //   return {
    //     ...state,
    //     startDate: action.payload
    //   }
    default: 
      return state;
  }
}