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

// let boardId = 13;

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    add_board: (state = initialState, action) => {
      const newBoard = {
        // id: boardId.toString(),
        id: action.payload.title,
        title: action.payload.title,
        description: action.payload.description,
      }
      // boardId++;
      console.dir(state);
      console.log(`in boardsReduce title is ${newBoard.title}`);
      return [...state, newBoard];
    }
  }
});

export const { add_board } = boardsSlice.actions;

export default boardsSlice.reducer;
