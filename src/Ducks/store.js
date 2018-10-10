import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from './userReducer';
import authReducer from "./authReducer";
import adminReducer from "./adminReducer";

const combinedReducers = combineReducers({
  userReducer,
  authReducer,
  adminReducer
});

export default createStore(combinedReducers, applyMiddleware(promiseMiddleware()));
