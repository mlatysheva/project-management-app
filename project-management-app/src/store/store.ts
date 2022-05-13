import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { allBoardsReducer } from "./reducers/allBoardsReducer";
import { boardReducer } from "./reducers/boardReducer";
import { columnReducer } from "./reducers/columnReducer";
import taskReducer from "./reducers/taskReducer";
import registerReducer from "./signup/userOptions";

const defaultState = {
	user: {
		userName: "",
		login: "",
		password: "",
	},
	lists: [],
};

const reducer = (
	state = defaultState,
	action: { type: string; payload: string }
) => {
	switch (action.type) {
		case "ADD_LOGIN":
			return { ...state, username: action.payload };
		default:
			return state;
	}
};

export const store = configureStore({
	reducer: {
		// rootReducer,
		register: registerReducer,
    // users: allUsersReducer,
    // user: userReducer,
    boards: allBoardsReducer,
    board: boardReducer,
    // columns: allColumnsReducer,
    column: columnReducer,
    // tasks: allTasksReducer,
    task: taskReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
