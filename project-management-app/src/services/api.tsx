import axios from "axios";
export const BASE_URL = "https://project-management-app-team15.herokuapp.com/";

const instaceApi = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
});

// TODO: сохранять токен в ЛС и записывать его сюда оттуда
export const userCredentials = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDgwZGY1OC02YWYyLTQ0NmItODlhZi1kOWYyMDEyOTEzODMiLCJsb2dpbiI6Im1hcmkiLCJpYXQiOjE2NTI2OTI2Mjl9.q-wJjtCfObcSdihs829cgghaO5hvIu-5hS9NXKicsMI",
  userId: "3080df58-6af2-446b-89af-d9f201291383",
}

export default instaceApi;
