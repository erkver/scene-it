import axios from "axios";

const GET_FAVORITES = "GET_FAVORITES"
const ADD_FAVORITE = "ADD_FAVORITE";

export function getFavorites(userId) {
  return {
    type: GET_FAVORITES,
    payload: axios.get(`/api/favorites?u=${userId}`)
  }
}

export function addFavorite( movieId, userId) {
  return {
    type: ADD_FAVORITE,
    payload: axios.post('/api/favorite', {movieId,userId})
  }
}

const initialState = {
  favorites: [],
  favorite: [],
  isLoading: false
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_FAVORITES}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_FAVORITES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        favorites: action.payload.data
      };
    case `${ADD_FAVORITE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_FAVORITE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        favorites: action.payload.data
      };
    default:
      return state;
  }
}