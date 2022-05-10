import { createSlice } from "@reduxjs/toolkit";

export interface registerProps {
	name?: string | null;
	id?: number | null;
	email?: string | null;
	password?: string | null;
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
		logout: (state) => {
			state.register = null;
		},
	},
});

export const { signup, logout } = registerSlice.actions;

export const selectUser = (state: { register: { register: registerProps } }) =>
	state.register.register;

export default registerSlice.reducer;
