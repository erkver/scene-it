import axios from "axios";

const GET_SCREENINGS = "GET_SCREENINGS";
const GET_SCREENING = "GET_SCREENING";
const GET_USER = "GET_USER";
const ADD_FAVORITE = "ADD_FAVORITE";
const GET_USER_BY_ID = "GET_USER_BY_ID";

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

export function getUserById(id) {
  return {
    type: GET_USER_BY_ID,
    payload: axios.get(`/user/${id}`)
  }
}

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
    payload: axios.post('/api/favorite' , {
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
  screenings: [],
  screening: [],
  favorites: [],
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
      };
    case `${ADD_FAVORITE}_FULFILLED`:
      return {
        ...state,
        favorites: action.payload
      };
    case `${GET_USER_BY_ID}_FULFILLED`:
      return {
        ...state,
        isAuthed: true,
        user: action.payload
      };
    default:
      return state;
  }
}

