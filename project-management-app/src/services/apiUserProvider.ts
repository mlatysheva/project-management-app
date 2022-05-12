import axios from 'axios'; 
import { handleResponse, handleError } from './response'; 
import { BASE_URL } from './api';
import { SigninProps, UserProps } from '../store/signup/userOptions';

export const getAllUsers = () => { 
  return axios 
    .get(`${BASE_URL}/users`) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export const getUser = (userId: string) => { 
  return axios 
    .get(`${BASE_URL}/users/${userId}`) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export const deleteUser = (userId: string) => {
  return axios
    .delete(`${BASE_URL}/users/${userId}`)
    .then(handleResponse)
    .catch(handleError);
}

export const updateUser = (userId: string, userData: UserProps) => { 
  return axios 
    .put(`${BASE_URL}/users/${userId}`, userData) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export const signinUser = (signinData: SigninProps) => { 
  return axios 
    .post(`${BASE_URL}/signin`, signinData) 
    .then(handleResponse) 
    .catch(handleError); 
};

export const signupUser = (userData: UserProps) => { 
  return axios 
    .post(`${BASE_URL}/signup`, userData) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

