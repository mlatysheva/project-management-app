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

export const createdBoardSlice = createSlice({
  name: 'createdBoard',
  initialState,
  reducers: {
    set_created_board: (state: BoardProps = initialState, action) => {
      const board: BoardProps = action.payload;
      return board;
    },
    clear_created_board: () => {
      const newState = initialState; 
      return newState;
    },
    update_created_board: (state, action) => {
      const updatedBoard = {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        id: action.payload.id,
      }
      return updatedBoard;
    },
    add_column_to_created_board: (state, action) => {
      const updatedBoard = {
        ...state,
        columns: [...state.columns!, action.payload]
      }
      return updatedBoard;
    },
    delete_column_from_created_board: (state, action) => {
      const columnId = action.payload;
      if (state.columns === undefined) {
        return state
      } else {
        let newList = state.columns.filter(column => column.id != columnId);
        console.dir(newList);
        const updatedBoard = {
          ...state,
          columns: newList,
        };
        return updatedBoard;
      }
    },
  }
});

export const { set_created_board, clear_created_board, update_created_board, add_column_to_created_board, delete_column_from_created_board } = createdBoardSlice.actions;

export default createdBoardSlice.reducer;