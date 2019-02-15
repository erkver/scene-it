import axios from 'axios';

const GET_PRESS_COMMENTS = 'GET_PRESS_COMMENTS';
const GET_PRESS_COMMENT = 'GET_PRESS_COMMENT';
const CLEAR_PRESS_COMMENTS = 'CLEAR_PRESS_COMMENTS';

export function getPressComments(reportId) {
  return {
    type: GET_PRESS_COMMENTS,
    payload: axios.get(`/api/comments/press?r=${reportId}`)
  };
}

export function getPressComment(tPC_id) {
  return {
    type: GET_PRESS_COMMENT,
    payload: axios.get(`/api/comment/press/${tPC_id}`)
  };
}

export function clearPressComments() {
  return {
    type: CLEAR_PRESS_COMMENTS,
    payload: { pressComment: initialState, pressComments: initialState }
  };
}

const initialState = {
  pressComments: [],
  pressComment: [],
  isLoading: false
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
    case `${GET_PRESS_COMMENT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_PRESS_COMMENT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        pressComment: action.payload.data
      };
    case CLEAR_PRESS_COMMENTS:
      return {
        ...state,
        pressComment: action.payload,
        pressComments: action.payload
      };
    default:
      return state;
  }
}
