import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/index";
import boardsReducer from "./reducers/boardsSlice";
import boardReducer from "./reducers/boardSlice";
import { tasksReducer } from "./reducers/tasksSlice";
import registerReducer from "./signup/userOptions";

export const store = configureStore({
	reducer: {
		// rootReducer,
		register: registerReducer,
    // users: allUsersReducer,
    // user: userReducer,
    boards: boardsReducer,
    board: boardReducer,
    tasks: tasksReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
