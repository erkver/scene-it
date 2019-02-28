import axios from 'axios';

const GET_PRESS_COMMENTS = 'GET_PRESS_COMMENTS';
const CLEAR_PRESS_COMMENTS = 'CLEAR_PRESS_COMMENTS';

export function getPressComments(reportId) {
  return {
    type: GET_PRESS_COMMENTS,
    payload: axios.get(`/api/comments/press?r=${reportId}`)
  };
}

export function clearPressComments() {
  return {
    type: CLEAR_PRESS_COMMENTS,
    payload: []
  };
}

const initialState = {
  pressComments: [],
  prComLoading: false
};

export default function pressCommentReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_PRESS_COMMENTS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_PRESS_COMMENTS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        pressComments: action.payload.data
      };
    case CLEAR_PRESS_COMMENTS:
      return {
        ...state,
        pressComments: action.payload
      };
    default:
      return state;
  }
}
