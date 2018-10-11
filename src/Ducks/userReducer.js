import axios from "axios";

const GET_USER = "GET_USER";

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get('/api/me')
  }
}

const initialState = {
  user: {},
  isAuthed: false
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
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
    default:
      return state;
  }
}

