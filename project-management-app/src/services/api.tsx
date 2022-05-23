import axios from "axios";
export const BASE_URL = "https://project-management-app-back15.herokuapp.com/";

const instaceApi = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
});

export const userCredentials = {
	// token: localStorage.getItem("userToken"),
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZjk1NzIyZS1jOWVjLTRhMzAtOTI3Ny04ODZlYzkyOGMxOGIiLCJsb2dpbiI6Im1hcmkiLCJpYXQiOjE2NTMzMzEyMDR9.RNwZmrVuf1j51u5axJF5uc5UDbQ7pcN8QFTM8tKtzv8",
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
