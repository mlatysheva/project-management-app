import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "history";
import { getBoard } from "../../services/apiBoardProvider";
import { TaskProps } from "./tasksSlice";

export interface ColumnProps {
  id: string,
  title: string,
  order?: number,
  tasks?: TaskProps[];
}
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

export const fetchBoard = createAsyncThunk(
  'board/fetchBoard',
  async (boardId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await getBoard(boardId);
      dispatch(set_board(response));
    } catch (error) {
      console.log(error);
    }
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    set_board: (state: BoardProps = initialState, action) => {
      const board: BoardProps = action.payload;
      return board;
    },
    clear_board: () => {
      return initialState;
    },
    update_board: (state, action) => {
      const updatedBoard = {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        id: action.payload.id,
      }
      return updatedBoard;
    },
    add_column_to_board: (state, action) => {
      if (state.columns === undefined) {
        state.columns = [];
      }
      const updatedBoard = {
        ...state,
        columns: [...state.columns, action.payload]
      }
      return updatedBoard;
    },
    delete_column_from_board: (state, action) => {
      const columnId = action.payload;
      if (state.columns === undefined) {
        return state
      } else {
        let newList = state.columns.filter(column => column.id !== columnId);
        const updatedBoard = {
          ...state,
          columns: newList,
        };
        return updatedBoard;
      }
    },
    update_column_title: (state, action) => {
      const columns = state.columns;
      function replaceTitle(items: ColumnProps[], newTitle: string, itemId: string) {
        return items.map((item) => {
          if (item.id === itemId) {
            item.title = newTitle;
          }
          return item;
        });
      }
      if (columns) {
        const updatedColumns = replaceTitle(columns, action.payload.title, action.payload.id);
      return {...state,
      columns: updatedColumns}
      }
    }
  }
});

export const { set_board, clear_board, update_board, add_column_to_board, delete_column_from_board, update_column_title } = boardSlice.actions;

export default boardSlice.reducer;