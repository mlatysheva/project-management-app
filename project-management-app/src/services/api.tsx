import axios from "axios";
export const BASE_URL = "https://project-management-app-team15.herokuapp.com/";

const instaceApi = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
});

export const userCredentials = {
	// token: localStorage.getItem("userToken"),
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDgwZGY1OC02YWYyLTQ0NmItODlhZi1kOWYyMDEyOTEzODMiLCJsb2dpbiI6Im1hcmkiLCJpYXQiOjE2NTMyMjY1ODJ9.nMevGvq70UXCJsFrHpTNCYpK-rn8fSHS7ECrp15VPKo"
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
