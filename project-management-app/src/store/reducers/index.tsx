import { combineReducers } from "redux";
import { allBoardsReducer } from "./allBoardsReducer";

export default combineReducers({
  boards: allBoardsReducer,
});