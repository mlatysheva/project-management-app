import axios from "axios";
const BASE_URL = "https://project-management-app-team15.herokuapp.com/";

const instaceApi = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
});

export default instaceApi;
