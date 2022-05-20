import { createSlice } from "@reduxjs/toolkit";
import { ColumnProps } from "./columnsSlice";

export interface BoardProps {
  id: string;
  title: string;
  description: string;
  columns?: ColumnProps[];
}

const initialState: BoardProps = {
  id: '',
  title: '',  
  description: '',
  columns: [],
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    set_board: (state: BoardProps = initialState, action) => {
      const board: BoardProps = action.payload;
      return board;
    },
    clear_board: () => {
      const newState = initialState; 
      return newState;
    },
    update_board: (state, action) => {
      const updatedBoard = {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        id: action.payload.id,
      }
      return updatedBoard;
    }
  }
});

export const { set_board, clear_board, update_board } = boardSlice.actions;

export default boardSlice.reducer;