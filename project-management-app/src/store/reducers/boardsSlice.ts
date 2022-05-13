import { BoardProps } from './boardSlice';
import { AnyAction, createSlice } from '@reduxjs/toolkit';

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


let boardId = 13;

export const boardsReducer = (state = initialState, action: AnyAction ) => {
  switch (action.type) {
    case "add_board":
      const newBoard = {
        id: boardId.toString(),
        title: action.payload.title,
        description: action.payload.description,
      }
      boardId++;
      console.dir(state);
      return [...state, newBoard];
    default: 
      return state;
  }
}

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: { boardsReducer },
  // reducers: {
  //   add_board: (state, action) =>{
  //     const newBoard = {
  //       title: action.payload.title,
  //       description: action.payload.description,
  //     }
  //     console.dir(state);
  //     return [...state, newBoard];
  //   }
  // }
});

// export const { add_board } = boardsSlice.actions;

export default boardsSlice.reducer;
