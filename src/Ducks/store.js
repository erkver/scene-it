import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from './userReducer';
import favoritesReducer from "./favoritesReducer";
import adminReducer from "./adminReducer";
import theatreReducer from "./theatreReducer";
import screeningReducer from "./screeningReducer";
import reportReducer from "./reportReducer";
import pressCommentReducer from "./pressCommentReducer";
import audCommentReducer from "./audCommentReducer";
import sceneReducer from "./sceneReducer";

const combinedReducers = combineReducers({
  userReducer,
  favoritesReducer,
  adminReducer,
  theatreReducer,
  screeningReducer,
  reportReducer,
  pressCommentReducer,
  audCommentReducer,
  sceneReducer
});

export default createStore(combinedReducers, applyMiddleware(promiseMiddleware()));
