import axios from "axios";

const ADD_FAVORITE = "ADD_FAVORITE";

export function addFavorite(
  movieId,
  fav_title,
  fav_img_url,
  fav_release_date,
  fav_synopsis,
  fav_isScreening,
  fav_screening_date,
  fav_theatre_name,
  fav_theatre_location,
  fav_studio,
  fav_genre,
  fav_mov_url,
  fav_runtime,
  userId
) {
  return {
    type: ADD_FAVORITE,
    payload: axios.post('/api/favorite', {
      movieId,
      fav_title,
      fav_img_url,
      fav_release_date,
      fav_synopsis,
      fav_isScreening,
      fav_screening_date,
      fav_theatre_name,
      fav_theatre_location,
      fav_studio,
      fav_genre,
      fav_mov_url,
      fav_runtime,
      userId
    })
  }
}

const initialState = {
  favorites: [],
  isLoading: false
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${ADD_FAVORITE}_FULFILLED`:
      return {
        ...state,
        favorites: action.payload
      };
    default:
      return state;
  }
}