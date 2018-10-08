import axios from "axios";

const GET_MOVIES = "GET_MOVIES";
const GET_SCREENING = "GET_SCREENING";
const GET_SCREENING_INFO = "GET_SCREENING_INFO"

export function getMovies() {
  return {
    type: GET_MOVIES,
    payload: axios.get('/api/movies')
  }
}

export function getScreening(id) {
  return {
    type: GET_SCREENING,
    payload: axios.get(`/api/screening/${id}`)
  }
}

export function getScreeningInfo() {
  return {
    type: GET_SCREENING_INFO,
    payload: initialState.movies
  }
}

const initialState = {
  movies: [],
  isLoading: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case `${GET_MOVIES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        movies: action.payload.data.results
      };
    case `${GET_SCREENING}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        movies: action.payload.data
      }
    case GET_SCREENING_INFO:
      return {
        ...state,
        movies: action.payload
      }
    default:
      return state;
  }
}

