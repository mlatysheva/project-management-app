import axios from 'axios'; 
import { handleResponse, handleError } from './response'; 
import { BASE_URL, config } from './api';
import { SigninProps, UserProps } from '../store/signup/userOptions';


export const getAllUsers = () => { 
  return axios 
    .get(`${BASE_URL}users`, config) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export const getUser = (userId: string) => { 
  return axios 
    .get(`${BASE_URL}users/${userId}`, config) 
    .then(handleResponse) 
    .catch(handleError); 
};

interface UserIdProps {
  id: string,
  name: string,
  login: string,
}

export async function getUserByLogin(login: string) {
  const users = await getAllUsers();
  const soughtUser: UserIdProps = users.filter((user: UserIdProps) => user.login === login)[0];
  console.log(soughtUser.id);
  return soughtUser.id;
}

export const deleteUser = (userId: string) => {
  return axios
    .delete(`${BASE_URL}users/${userId}`, config)
    .then(handleResponse)
    .catch(handleError);
}

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

