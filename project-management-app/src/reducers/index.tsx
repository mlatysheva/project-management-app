import { combineReducers } from "redux";
import allBoardsReducer from "./allBoardsReducer";

export default combineReducers({
  lists: allBoardsReducer,
});