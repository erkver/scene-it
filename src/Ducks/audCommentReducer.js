import axios from "axios";

const GET_AUD_COMMENTS = "GET_AUD_COMMENTS";
const GET_AUD_COMMENT = "GET_AUD_COMMENT";
const ADD_AUD_COMMENT = "ADD_AUD_COMMENT";
const EDIT_AUD_COMMENT = "EDIT_AUD_COMMENT";
const DELETE_AUD_COMMENT = "DELETE_AUD_COMMENT";
const CLEAR_AUD_COMMENTS = "CLEAR_AUD_COMMENTS";

export function getAudComments(reportId) {
  return {
    type: GET_AUD_COMMENTS,
    payload: axios.get(`/api/comments/audience?r=${reportId}`)
  }
};

export function getAudComment(tAC_id) {
  return {
    type: GET_AUD_COMMENT,
    payload: axios.get(`/api/comment/audience/${tAC_id}`)
  }
};

export function addAudComment(
  gender,
  age,
  comment,
  reportId
) {
  return {
    type: ADD_AUD_COMMENT,
    payload: axios.post('/api/comment/audience', {
      gender,
      age,
      comment,
      reportId
    })
  }
};

export function editAudComment(
  tAC_id,
  gender,
  age,
  comment
) {
  return {
    type: EDIT_AUD_COMMENT,
    payload: axios.put(`/api/comment/audience/${tAC_id}`, {
      gender,
      age,
      comment
    })
  }
};

export function deleteAudComment(tAC_id) {
  return {
    type: DELETE_AUD_COMMENT,
    payload: axios.delete(`/api/comment/audience/${tAC_id}`)
  }
};

export function clearAudComments() {
  return {
    type: CLEAR_AUD_COMMENTS,
    payload: {audienceComment: initialState, audienceComments: initialState}
  }
};

const initialState = {
  audienceComments: [],
  audienceComment: [],
  isLoading: false
};

export default function audCommentReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_AUD_COMMENTS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_AUD_COMMENTS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        audienceComments: action.payload.data
      };
    case `${GET_AUD_COMMENT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_AUD_COMMENT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        audienceComment: action.payload.data
      };
    case `${ADD_AUD_COMMENT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_AUD_COMMENT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        audienceComment: action.payload.data
      };
    case `${EDIT_AUD_COMMENT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${EDIT_AUD_COMMENT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        audienceComment: action.payload.data
      };
    case `${DELETE_AUD_COMMENT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${DELETE_AUD_COMMENT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        audienceComment: action.payload.data
      };
    case CLEAR_AUD_COMMENTS:
      return {
        ...state,
        audienceComments: action.payload,
        audienceComment: action.payload
      };
    default:
      return state;
  }
};