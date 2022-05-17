import axios from 'axios'; 
import { handleResponse, handleError } from './response'; 
import { BASE_URL, config } from './api';
import { BoardProps } from '../store/reducers/boardSlice';

export const getAllBoards = () => { 
  return axios 
    .get(`${BASE_URL}boards`, config) 
    .then(handleResponse) 
    .catch(handleError); 
};

export const createBoard = (board: BoardProps) => {
  return axios 
    .post(`${BASE_URL}boards`, board, config) 
    .then(handleResponse) 
    .catch(handleError);
}

export const getBoard = (boardId: string) => { 
  return axios 
    .get(`${BASE_URL}boards/${boardId}`) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export const deleteBoard = (boardId: string) => {
  return axios
    .delete(`${BASE_URL}boards/${boardId}`)
    .then(handleResponse)
    .catch(handleError);
}

export const updateBoard = (boardId: string, boardData: BoardProps) => { 
  return axios 
    .put(`${BASE_URL}boards/${boardId}`, boardData) 
    .then(handleResponse) 
    .catch(handleError); 
}; 
