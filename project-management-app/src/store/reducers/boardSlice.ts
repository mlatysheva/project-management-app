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
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    create_board: (state: BoardProps = initialState, action) => {
      const board: BoardProps = action.payload;
      return board;
    },
    clear_board: () => {
      const newState = initialState; 
      return newState;
    }
  }
});

export const { create_board, clear_board } = boardSlice.actions;

export default boardSlice.reducer;