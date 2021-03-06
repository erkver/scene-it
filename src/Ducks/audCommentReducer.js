import axios from 'axios';

const GET_AUD_COMMENTS = 'GET_AUD_COMMENTS';
const CLEAR_AUD_COMMENTS = 'CLEAR_AUD_COMMENTS';

export function getAudComments(reportId) {
  return {
    type: GET_AUD_COMMENTS,
    payload: axios.get(`/api/comments/audience?r=${reportId}`)
  };
}

export function clearAudComments() {
  return {
    type: CLEAR_AUD_COMMENTS,
    payload: []
  };
}

const initialState = {
  audienceComments: [],
  audComLoading: false
};

export default function audCommentReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_AUD_COMMENTS}_PENDING`:
      return {
        ...state,
        audComLoading: true
      };
    case `${GET_AUD_COMMENTS}_FULFILLED`:
      return {
        ...state,
        audComLoading: false,
        audienceComments: action.payload.data
      };
    case CLEAR_AUD_COMMENTS:
      return {
        ...state,
        audienceComments: action.payload
      };
    default:
      return state;
  }
}
