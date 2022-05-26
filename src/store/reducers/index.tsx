import { combineReducers } from "redux";
import boardsReducer from "./boardsSlice";
import taskReducer from "./taskSlice";
import appReducer from "./appSlice";
import registerReducer from "../signup/userOptions";


export const rootReducer = combineReducers({
  register: registerReducer,
  boards: boardsReducer,
  task: taskReducer,
  app: appReducer,
});
