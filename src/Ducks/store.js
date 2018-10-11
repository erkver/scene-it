import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from './userReducer';
import authReducer from "./authReducer";
import adminReducer from "./adminReducer";
import theatreReducer from "./theatreReducer";

const combinedReducers = combineReducers({
  userReducer,
  authReducer,
  adminReducer,
  theatreReducer
});

export default createStore(combinedReducers, applyMiddleware(promiseMiddleware()));
