import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { boardsReducer } from "./reducers/boardsReducer";
import { boardReducer } from "./reducers/boardReducer";
import { columnsReducer } from "./reducers/columnsReducer";
import { tasksReducer } from "./reducers/tasksReducer";
import registerReducer from "./signup/userOptions";

export const store = configureStore({
	reducer: {
		// rootReducer,
		register: registerReducer,
    // users: allUsersReducer,
    // user: userReducer,
    boards: boardsReducer,
    board: boardReducer,
    columns: columnsReducer,
    tasks: tasksReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
