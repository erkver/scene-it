import axios from "axios";

const GET_MOVIES = "GET_MOVIES";
const GET_MOVIE = "GET_MOVIE";


export function getMovies() {
  return {
    type: GET_MOVIES,
    payload: axios.get("/api/movies")
  };
}

export function getMovie(id) {
  return {
    type: GET_MOVIE,
    payload: axios.get(`/api/movie/${id}`)
  };
}

const initialState = {
  movies: [],
  movie: [],
  isLoading: false
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_MOVIES}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_MOVIES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        movies: action.payload.data.results
      };
    case `${GET_MOVIE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_MOVIE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        movie: action.payload.data
      };
    default:
      return state;
  }
}