import { createSlice } from "@reduxjs/toolkit";

export interface registerProps {
	name?: string | null;
	id?: number | null;
	login?: string | null;
	password?: string | null;
	registered: boolean;
}

export interface UserProps {
  name: string;
  login: string;
  password: string;
}

export interface SigninProps {
  login: string;
  password: string;
}

export const registerSlice = createSlice({
	name: "register",
	initialState: {
		register: null,
	},
	reducers: {
		signup: (state, action) => {
			state.register = action.payload;
		},
		signin: (state, action) => {
			state.register = action.payload;
		},
		logout: (state) => {
			state.register = null;
		},
	},
});

export const { signup, signin, logout } = registerSlice.actions;

export const selectUser = (state: { register: { register: registerProps } }) =>
	state.register.register;

export default registerSlice.reducer;
