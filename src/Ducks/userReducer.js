import axios from "axios";

const GET_SCREENINGS = "GET_SCREENINGS";
const GET_SCREENING = "GET_SCREENING";
const GET_USER = "GET_USER";

export function getScreenings() {
  return {
    type: GET_SCREENINGS,
    payload: axios.get('/api/screenings')
  }
}

export function getScreening(id) {
  return {
    type: GET_SCREENING,
    payload: axios.get(`/api/screening/${id}`)
  }
}

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get('/api/me')
  }
}

const initialState = {
  screenings: [],
  screening: [],
  user: {},
  isAuthed: false,
  isLoading: false
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
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
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        isAuthed: true,
        user: action.payload
      };
    case `${GET_USER}_REJECTED`:
      return {
        ...state,
        isAuthed: false
      }
    default:
      return state;
  }
}

