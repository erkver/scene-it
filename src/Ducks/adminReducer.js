import axios from "axios";

const GET_MOVIES = "GET_MOVIES";
const GET_MOVIE = "GET_MOVIE";
const GET_USERS_BY_GEN = "GET_USERS_BY_GEN";
const GET_USERS_BY_AGE = "GET_USERS_BY_AGE";
const GET_USERS_BY_ETH = "GET_USERS_BY_ETH";
const GET_USERS_BY_GENRE = "GET_USERS_BY_GENRE";

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

export function getUsersByGen(movieid) {
  return {
    type: GET_USERS_BY_GEN,
    payload: axios.get(`/api/data?g=${movieid}`)
  };
}

export function getUsersByAge(movieid) {
  return {
    type: GET_USERS_BY_AGE,
    payload: axios.get(`/api/data?a=${movieid}`)
  };
}

export function getUsersByEth(movieid) {
  return {
    type: GET_USERS_BY_ETH,
    payload: axios.get(`/api/data?a=${movieid}`)
  };
}

export function getUsersByGenre(movieid) {
  return {
    type: GET_USERS_BY_GENRE,
    payload: axios.get(`/api/data?genre=${movieid}`)
  };
}

const initialState = {
  movies: [],
  movie: [],
  gender: [],
  age: [],
  eth: [],
  genre: [],
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
    case `${GET_USERS_BY_GEN}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_USERS_BY_GEN}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        gender: action.payload.data
      }; 
    case `${GET_USERS_BY_AGE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_USERS_BY_AGE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        age: action.payload.data
      }; 
    case `${GET_USERS_BY_ETH}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_USERS_BY_ETH}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        eth: action.payload.data
      }; 
    case `${GET_USERS_BY_GENRE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_USERS_BY_GENRE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        genre: action.payload.data
      }; 
    default:
      return state;
  }
}