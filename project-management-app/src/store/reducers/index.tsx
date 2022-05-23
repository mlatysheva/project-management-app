import { combineReducers } from "redux";
import boardsReducer from "./boardsSlice";
import { tasksReducer } from "./tasksSlice";
import registerReducer from "../signup/userOptions";


export const rootReducer = combineReducers({
  register: registerReducer,
  boards: boardsReducer,
  tasks: tasksReducer,
});
