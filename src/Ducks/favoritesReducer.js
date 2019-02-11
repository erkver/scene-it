import axios from 'axios';

const GET_FAVORITES = 'GET_FAVORITES';
// const GET_FILL = 'GET_FILL';
const ADD_FAVORITE = 'ADD_FAVORITE';
const DELETE_FAVORITE = 'DELETE_FAVORITE';

export function getFavorites(userId) {
  return {
    type: GET_FAVORITES,
    payload: axios.get(`/api/favorites?u=${userId}`)
  };
}

export function addFavorite(movieId, userId) {
  return {
    type: ADD_FAVORITE,
    payload: axios.post('/api/favorite', { movieId, userId })
  };
}

export function deleteFavorite(fav_id) {
  return {
    type: DELETE_FAVORITE,
    payload: axios.delete(`/api/favorite/${fav_id}`)
  };
}

const initialState = {
  favorites: [],
  favorite: [],
  fill: 0,
  isLoading: false
};

export default function favoritesReducer(state = initialState, action) {
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
    case `${DELETE_FAVORITE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${DELETE_FAVORITE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        favorites: action.payload.data
      };
    default:
      return state;
  }
}
