import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/index";
import boardsReducer from "./reducers/boardsSlice";
import boardReducer from "./reducers/boardSlice";
import taskReducer from "./reducers/taskSlice";
import columnReducer from "./reducers/columnSlice";
import registerReducer from "./signup/userOptions";
import appReducer from "./reducers/appSlice";

export const store = configureStore({
	reducer: {
		// rootReducer,
		register: registerReducer,
    // users: allUsersReducer,
    // user: userReducer,
    boards: boardsReducer,
    board: boardReducer,
    column: columnReducer,
    task: taskReducer,
    app: appReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
