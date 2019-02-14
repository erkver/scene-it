import axios from 'axios';

const GET_SCENES = 'GET_SCENES';
const CLEAR_SCENES = 'CLEAR_SCENES';

export function getScenes(reportId) {
  return {
    type: GET_SCENES,
    payload: axios.get(`/api/scenes?r=${reportId}`)
  };
}

export function clearScenes() {
  return {
    type: CLEAR_SCENES,
    payload: initialState
  };
}

const initialState = {
  scenes: [],
  isLoading: false
};

export default function sceneReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_SCENES}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_SCENES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        scenes: action.payload.data
      };
    case CLEAR_SCENES:
      return {
        ...state,
        scenes: action.payload
      };
    default:
      return state;
  }
}
