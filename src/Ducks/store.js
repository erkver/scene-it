import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from './userReducer';
import authReducer from "./authReducer";

const combinedReducers = combineReducers({
  userReducer,
  authReducer
});

export default createStore(combinedReducers, applyMiddleware(promiseMiddleware()));
