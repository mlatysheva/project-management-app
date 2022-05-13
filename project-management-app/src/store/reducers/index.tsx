import { combineReducers } from "redux";
import { boardsReducer } from "./boardsReducer";

export default combineReducers({
  boards: boardsReducer,
});