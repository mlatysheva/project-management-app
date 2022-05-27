import axios from 'axios'; 
import { handleResponse, handleError } from './response'; 
import { BASE_URL, config, configWorking } from './api';

interface ShortBoardProps {
  id?: string;
  title: string;
  description: string;
}

export const getAllBoards = () => { 
  return axios 
    .get(`${BASE_URL}boards`, configWorking()) 
    .then(handleResponse) 
    .catch(handleError); 
};

export const createBoard = (board: ShortBoardProps) => {
  return axios 
    .post(`${BASE_URL}boards`, board, configWorking()) 
    .then(handleResponse) 
    .catch(handleError);
}

export const getBoard = (boardId: string) => { 
  return axios 
    .get(`${BASE_URL}boards/${boardId}`, configWorking()) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export const deleteBoard = (boardId: string) => {
  return axios
    .delete(`${BASE_URL}boards/${boardId}`, configWorking())
    .then(handleResponse)
    .catch(handleError);
}

interface UpdateBoardProps {
  title: string;
  description: string;
}

export const updateBoard = (boardId: string, boardData: UpdateBoardProps) => { 
  return axios 
    .put(`${BASE_URL}boards/${boardId}`, boardData, configWorking()) 
    .then(handleResponse) 
    .catch(handleError); 
};

interface ColumnProps {
  title?: string;
  order?: number;
}

export const createColumn = (boardId: string, columnData: ColumnProps) => {
  return axios 
    .post(`${BASE_URL}boards/${boardId}/columns`, columnData, configWorking())
    .then(handleResponse) 
    .catch(handleError);
}

export const deleteColumn = (boardId: string, columnId: string) => {
  return axios 
    .delete(`${BASE_URL}boards/${boardId}/columns/${columnId}`, configWorking())
    .then(handleResponse) 
    .catch(handleError);
}

export const updateColumn = (boardId: string, columnId: string, columnData: ColumnProps) => { 
  return axios 
    .put(`${BASE_URL}boards/${boardId}/columns/${columnId}`, columnData, configWorking()) 
    .then(handleResponse) 
    .catch(handleError); 
};

export const getColumns = (boardId: string) => { 
  return axios 
    .get(`${BASE_URL}boards/${boardId}/columns`, configWorking()) 
    .then(handleResponse) 
    .catch(handleError); 
};

export const getColumn = (boardId: string, columnId: string) => {
  return axios 
    .get(`${BASE_URL}boards/${boardId}/columns/${columnId}`, configWorking()) 
    .then(handleResponse) 
    .catch(handleError); 
}

interface TaskProps {
  title: string,
  description: string,
  userId: string;
}

export const createTask = (boardId: string, columnId: string, taskData: TaskProps) => {
  return axios 
    .post(`${BASE_URL}boards/${boardId}/columns/${columnId}/tasks`, taskData, configWorking())
    .then(handleResponse) 
    .catch(handleError);
}
