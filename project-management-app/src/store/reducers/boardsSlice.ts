import { BoardProps } from './boardSlice';
import { createSlice } from '@reduxjs/toolkit';
export interface AllBoardsProps {
  boards: BoardProps[];
}

export const initialState: BoardProps[] = 
 [
    { 
      id: '012',
      title: "Your sample board",
      description: "Team project on eating an elephant",
    },
  ]

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    get_allBoards: (state: BoardProps[] = [], action) => {
      const boards: BoardProps[] = action.payload;
      return [...boards];
    },

    add_board: (state = initialState, action) => {
      const newBoard = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
      }
      return [...state, newBoard];
    },

    delete_board: (state, action) => {
      const boardId = action.payload;
      let newList = state.filter(board => board.id != boardId);
      if (newList === []) {
        newList = initialState;
      }
      return newList;
    },
  }
});

export const { add_board, get_allBoards, delete_board } = boardsSlice.actions;

export default boardsSlice.reducer;
