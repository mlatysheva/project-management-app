import axios from 'axios'; 
import { handleResponse, handleError } from './response'; 
import { BASE_URL, config, configWorking } from './api';
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

interface UpdateBoardProps {
  title: string;
  description: string;
}

export const updateBoard = (boardId: string, boardData: UpdateBoardProps) => { 
  return axios 
    .put(`${BASE_URL}boards/${boardId}`, boardData, config) 
    .then(handleResponse) 
    .catch(handleError); 
};

interface ColumnProps {
  title: string;
  order: number;
}

export const createColumn = (boardId: string, columnData: ColumnProps) => {
  return axios 
    .post(`${BASE_URL}boards/${boardId}/columns`, columnData, config)
    .then(handleResponse) 
    .catch(handleError);
}

