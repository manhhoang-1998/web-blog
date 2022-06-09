import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "./app/app.slice";
import { authReducer } from "./auth/auth.slice";
import { commentReducer } from "./post/comment.slice";
const rootReducer = combineReducers({
  auths: authReducer,
  app: appReducer,
  comment: commentReducer,
});

export default rootReducer;
