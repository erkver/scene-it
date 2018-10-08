import axios from "axios";

const GET_MOVIES = "GET_MOVIES";
// const POST_MOVIES = "POST_MOVIES";

export function getMovies() {
  return {
    type: GET_MOVIES,
    payload: axios.get('/api/movies')
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
    default:
      return state;
  }
}

