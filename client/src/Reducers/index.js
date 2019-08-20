import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

const reducers = combineReducers({
  authReducer,
  errorReducer,
  profileReducer,
  postReducer
});

export default reducers;
