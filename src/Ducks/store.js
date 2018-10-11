import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from './userReducer';
import favoritesReducer from "./favoritesReducer";
import adminReducer from "./adminReducer";
import theatreReducer from "./theatreReducer";
import screeningReducer from "./screeningReducer";

const combinedReducers = combineReducers({
  userReducer,
  favoritesReducer,
  adminReducer,
  theatreReducer,
  screeningReducer
});

export default createStore(combinedReducers, applyMiddleware(promiseMiddleware()));
