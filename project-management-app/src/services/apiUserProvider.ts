import axios from "axios";
import { handleResponse, handleError } from "./response";
import { BASE_URL, config, configWorking } from "./api";
import { SigninProps, UserProps } from "../store/signup/userOptions";

interface UserIdProps {
	id: string;
	name: string;
	login: string;
}

export const getAllUsers = async () => {
	let result = await axios.get(`${BASE_URL}users`, configWorking());
	return result.data;
};

export const getUserForName = async (userId: string) => {
	let result = await axios(`${BASE_URL}users/${userId}`, configWorking());
	return result.data;
};

export const getUser = (userId: string) => {
	return axios
		.get(`${BASE_URL}users/${userId}`, config)
		.then(handleResponse)
		.catch(handleError);
};

export async function getUserByLogin(login: string) {
	const users = await getAllUsers();
	const soughtUser: UserIdProps = users.filter(
		(user: UserIdProps) => user.login == login
	)[0];
	return soughtUser.id;
}

export async function getUserName(userId: string) {
	const user = await getUserForName(userId);
	const userName = user.name;
	return userName;
}

export const deleteUserPermanently = async (userId: string) => {
	return await axios.delete(`${BASE_URL}users/${userId}`, configWorking());
};

export const deleteUser = (userId: string) => {
	return axios
		.delete(`${BASE_URL}users/${userId}`, config)
		.then(handleResponse)
		.catch(handleError);
};

export const updateUser = (userId: string, userData: UserProps) => {
	return axios
		.put(`${BASE_URL}users/${userId}`, userData, config)
		.then(handleResponse)
		.catch(handleError);
};

export const signinUser = (signinData: SigninProps) => {
	return axios
		.post(`${BASE_URL}signin`, signinData)
		.then(handleResponse)
		.catch(handleError);
};

export const signupUser = (userData: UserProps) => {
	return axios
		.post(`${BASE_URL}signup`, userData)
		.then(handleResponse)
		.catch(handleError);
};

export async function toServerRegister(userData: UserProps) {
	try {
		let response = await axios.post(`${BASE_URL}signup`, userData);
		return response;
	} catch (e) {
		return e;
	}
}

export async function toServerSignin(userData: SigninProps) {
	try {
		let response = await axios.post(`${BASE_URL}signin`, userData);
		return response.data;
	} catch (e) {
		console.error(e);
	} finally {
	}
}

export async function toServerEdit(userId: string, userData: UserProps) {
	return await axios.put(
		`${BASE_URL}users/${userId}`,
		userData,
		configWorking()
	);
}
