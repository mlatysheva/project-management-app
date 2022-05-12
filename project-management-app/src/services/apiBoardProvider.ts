import axios from 'axios'; 
import { handleResponse, handleError } from './response'; 
import { BASE_URL } from './api';
  import { CreateBoardProps } from '../store/reducers/boardReducer';

export const getAllBoards = () => { 
  return axios 
    .get(`${BASE_URL}/boards`) 
    .then(handleResponse) 
    .catch(handleError); 
};

export const createBoard = (board: CreateBoardProps) => {
  return axios 
    .post(`${BASE_URL}/boards`, board) 
    .then(handleResponse) 
    .catch(handleError); 
}

export const getBoard = (boardId: string) => { 
  return axios 
    .get(`${BASE_URL}/boards/${boardId}`) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export const deleteBoard = (userId: string) => {
  return axios
    .delete(`${BASE_URL}/boards/${userId}`)
    .then(handleResponse)
    .catch(handleError);
}

export const updateBoard = (boardId: string, boardData: CreateBoardProps) => { 
  return axios 
    .put(`${BASE_URL}/boards/${boardId}`, boardData) 
    .then(handleResponse) 
    .catch(handleError); 
}; 
