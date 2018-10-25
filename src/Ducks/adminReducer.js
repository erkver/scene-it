import axios from "axios";

const GET_MOVIES = "GET_MOVIES";
const GET_MOVIE = "GET_MOVIE";
const GET_ALL_USERS = "GET_ALL_USERS";

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

export function getAllUsers(movieid) {
  return {
    type: GET_ALL_USERS,
    payload: axios.get(`/api/data?mov=${movieid}`)
  };
}

const initialState = {
  movies: [],
  movie: [],
  users: [],
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
    case `${GET_ALL_USERS}_PENDING`:
      return {
        ...state,
        isAuthed: false
      };
    case `${GET_ALL_USERS}_FULFILLED`:
      return {
        ...state,
        isAuthed: true,
        users: action.payload.data
      }; 
    default:
      return state;
  }
}