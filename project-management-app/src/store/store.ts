import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
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
		rootReducer,
		register: registerReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
