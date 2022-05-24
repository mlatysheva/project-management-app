import { BoardProps } from './boardSlice';
import { createSlice } from '@reduxjs/toolkit';
import { DropResult, ResponderProvided } from 'react-beautiful-dnd';

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
      let newList = state.filter(board => board.id !== boardId);
      if (newList === []) {
        newList = initialState;
      }
      return newList;
    },
    drag_and_drop: (state:BoardProps[], action) => {
      const { result } = action.payload;
      const { destination, source, draggableId } = result ||{};
      if (!destination) {
        return state;
      }
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return state;
      }
      const start = state.slice(0, source.index);
      const end = state.slice(source.index + 1);
      const newList = [...start, ...end];
      const newBoard = newList.filter(board => board.id === draggableId)[0];
      newList.splice(source.index, 1);
      newList.splice(destination.index, 0, newBoard);
      return newList;
    },
  },
});
export const { add_board, get_allBoards, delete_board, drag_and_drop } = boardsSlice.actions;

export default boardsSlice.reducer;
