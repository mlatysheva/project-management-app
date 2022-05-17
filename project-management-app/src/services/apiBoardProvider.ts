import axios from 'axios'; 
import { handleResponse, handleError } from './response'; 
import { BASE_URL, config } from './api';
import { BoardProps } from '../store/reducers/boardSlice';

interface ShortBoardProps {
  id?: string;
  title: string;
  description: string;
}

export const getAllBoards = () => { 
  return axios 
    .get(`${BASE_URL}boards`, config) 
    .then(handleResponse) 
    .catch(handleError); 
};

export const createBoard = (board: ShortBoardProps) => {
  return axios 
    .post(`${BASE_URL}boards`, board, config) 
    .then(handleResponse) 
    .catch(handleError);
}

export const getBoard = (boardId: string) => { 
  return axios 
    .get(`${BASE_URL}boards/${boardId}`, config) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export const deleteBoard = (boardId: string) => {
  return axios
    .delete(`${BASE_URL}boards/${boardId}`, config)
    .then(handleResponse)
    .catch(handleError);
}

export const updateBoard = (boardId: string, boardData: BoardProps) => { 
  return axios 
    .put(`${BASE_URL}boards/${boardId}`, boardData, config) 
    .then(handleResponse) 
    .catch(handleError); 
}; 
