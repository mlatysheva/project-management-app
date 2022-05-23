import axios from "axios";
export const BASE_URL = "https://project-management-app-team15.herokuapp.com/";

const instaceApi = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
});

export const userCredentials = {
	token: localStorage.getItem("userToken"),
};

export const config = {
	headers: { Authorization: `Bearer ${userCredentials.token}` },
};

export const userCredentialsWorking = () => {
	return {
		token: localStorage.getItem("userToken"),
	};
};

export const configWorking = () => {
	return {
		headers: { Authorization: `Bearer ${userCredentialsWorking().token}` },
	};
};

export default instaceApi;
