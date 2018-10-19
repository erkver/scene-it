import axios from "axios";

const GET_REPORTS = "GET_REPORTS";
const GET_REPORT = "GET_REPORT";
const ADD_REPORT = "ADD_REPORT";
const ADD_SCENE = "ADD_SCENE";
const ADD_PRESS_COMMENT = "ADD_PRESS_COMMENT";
const ADD_AUD_COMMENT = "ADD_AUD_COMMENT";

export function getReports() {
  return {
    type: GET_REPORTS,
    payload: axios.get('/api/reports')
  }
}

export function getReport(id) {
  return {
    type: GET_REPORT,
    payload: axios.get(`/api/reports/${id}`)
  }
}

export function addReport(
  attendance,
  ratio,
  reaction,
  movieId) {
  return {
    type: ADD_REPORT,
    payload: axios.post('/api/report', {
      attendance,
      ratio,
      reaction,
      movieId})
  }
}

export function addScene(scene, reportId) {
  return {
    type: ADD_SCENE,
    payload: axios.post('/api/scene', {scene, reportId})
  }
}

export function addPressComment(
  name,
  outlet,
  reportId,
  comment) {
  return {
    type: ADD_PRESS_COMMENT,
    payload: axios.post('/api/comment/press', {
      name,
      outlet,
      reportId,
      comment})
  }
}

export function addAudComment(
  name,
  age,
  comment,
  reportId
  ) {
  return {
    type: ADD_AUD_COMMENT,
    payload: axios.post('/api/comment/audience', {
      name,
      age,
      comment,
      reportId
    })
  }
}

const initialState = {
  reports: [],
  report: [],
  scenes: [],
  scene: [],
  pressComments: [],
  audienceComments: [],
  isLoading: false
}

export default function reportReducer(state = initialState, action) {
  switch(action.type) {
    case `${GET_REPORTS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        reports: action.payload.data
      };
    case `${GET_REPORT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        report: action.payload.data
      };
    case `${ADD_REPORT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        report: action.payload.data
      };
    case `${ADD_SCENE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        scenes: action.payload.data
      };
    case `${ADD_PRESS_COMMENT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        pressComments: action.payload.data
      };
    case `${ADD_AUD_COMMENT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        audienceComments: action.payload.data
      };
    default: 
      return state;
  }
}