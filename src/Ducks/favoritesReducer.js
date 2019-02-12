import axios from 'axios';

const GET_FAVORITES = 'GET_FAVORITES';

export function getFavorites(userId) {
  return {
    type: GET_FAVORITES,
    payload: axios.get(`/api/favorites?u=${userId}`)
  };
}

const initialState = {
  favorites: [],
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
    default:
      return state;
  }
}
