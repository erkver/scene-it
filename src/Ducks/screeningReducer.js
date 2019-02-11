import axios from 'axios';

const GET_SCREENINGS = 'GET_SCREENINGS';
const SEARCH_SCREENINGS = 'SEARCH_SCREENINGS';
const GET_SCREENING = 'GET_SCREENING';
const GET_SCREENING_INFO = 'GET_SCREENING_INFO';
const ADD_SCREENING = 'ADD_SCREENING';
const EDIT_SCREENING = 'EDIT_SCREENING';
const CLEAR_SCREENINGS = 'CLEAR_SCREENINGS';

export function getScreenings() {
  return {
    type: GET_SCREENINGS,
    payload: axios.get('/api/screenings')
  };
}

export function seatchScreenings(query) {
  return {
    type: GET_SCREENINGS,
    payload: axios.get(`/api/screenings?q=${query}`)
  };
}

export function getScreening(id) {
  return {
    type: GET_SCREENING,
    payload: axios.get(`/api/screening/${id}`)
  };
}

export function getScreeningInfo(id) {
  return {
    type: GET_SCREENING,
    payload: axios.get(`/api/screeningInfo/${id}`)
  };
}

export function addScreening(
  title,
  img_url,
  release_date,
  synopsis,
  isScreening,
  screening_date,
  userId,
  studio,
  genre,
  mov_url,
  runtime,
  theatreId,
  seat_count
) {
  return {
    type: ADD_SCREENING,
    payload: axios.post('/api/screening', {
      title,
      img_url,
      release_date,
      synopsis,
      isScreening,
      screening_date,
      userId,
      studio,
      genre,
      mov_url,
      runtime,
      theatreId,
      seat_count
    })
  };
}

export function editScreening(id, screening_date, theatreId, seat_count) {
  return {
    type: ADD_SCREENING,
    payload: axios.put(`/api/screening/${id}`, {
      screening_date,
      theatreId,
      seat_count
    })
  };
}

export function clearScreenings() {
  return {
    type: CLEAR_SCREENINGS,
    payload: { screenings: initialState, screening: initialState }
  };
}

const initialState = {
  screenings: [],
  screening: [],
  screeningInfo: [],
  isLoading: false
};

export default function screeningReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_SCREENINGS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_SCREENINGS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        screenings: action.payload.data
      };
    case `${SEARCH_SCREENINGS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${SEARCH_SCREENINGS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        screenings: action.payload.data
      };
    case `${GET_SCREENING}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_SCREENING}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        screening: action.payload.data
      };
    case `${GET_SCREENING_INFO}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_SCREENING_INFO}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        screeningInfo: action.payload.data
      };
    case `${ADD_SCREENING}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_SCREENING}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        screening: action.payload.data
      };
    case `${EDIT_SCREENING}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${EDIT_SCREENING}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        screenings: action.payload.data
      };
    case CLEAR_SCREENINGS:
      return {
        ...state,
        screenings: action.payload,
        screening: action.payload
      };
    default:
      return state;
  }
}
