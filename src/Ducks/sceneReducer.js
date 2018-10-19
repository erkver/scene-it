import axios from "axios";

const GET_SCENES = "GET_SCENES";
const GET_SCENE = "GET_SCENE";
const ADD_SCENE = "ADD_SCENE";
const EDIT_SCENE = "EDIT_SCENE";
const DELETE_SCENE = "DELETE_SCENE";

export function getScenes(reportId) {
  return {
    type: GET_SCENES,
    payload: axios.get('/api/scenes', {reportId})
  }
};

export function getScene(tS_id) {
  return {
    type: GET_SCENE,
    payload: axios.get(`/api/scene/${tS_id}`)
  }
};

export function addScene(scene, reportId) {
  return {
    type: ADD_SCENE,
    payload: axios.post('/api/scene', { scene, reportId })
  }
};

export function editScene(tS_id, scene, reportId) {
  return {
    type: EDIT_SCENE,
    payload: axios.put(`/api/scene/${tS_id}`, { scene, reportId })
  }
};

export function deleteScene(tS_id) {
  return {
    type: DELETE_SCENE,
    payload: axios.delete(`/api/scene/${tS_id}`)
  }
};

const initialState = {
  scenes: [],
  scene: [],
  isLoading: false
};

export default function sceneReducer(state = initialState, action) {
  switch(action.type) {
    case `${GET_SCENES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        scenes: action.payload.data
      };
    case `${GET_SCENE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        scene: action.payload.data
      }
    case `${ADD_SCENE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        scenes: action.payload.data
      };
    case `${EDIT_SCENE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        scenes: action.payload.data
      };
    case `${DELETE_SCENE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        scenes: action.payload.data
      };
    default: 
      return state;
  }
};