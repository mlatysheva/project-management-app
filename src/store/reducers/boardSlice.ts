import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getBoard } from "../../services/apiBoardProvider";
import { TaskProps } from "./taskSlice";

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
    set_board: (state: BoardProps = initialState, action: { payload: BoardProps; }) => {
      const board: BoardProps = action.payload;
      return board;
    },
    clear_board: () => {
      return initialState;
    },
    update_board: (state: BoardProps, action: { payload: { title: string; description: string; id: string; }; }) => {
      const updatedBoard = {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        id: action.payload.id,
      }
      return updatedBoard;
    },
    add_column_to_board: (state: BoardProps, action: { payload: any; }) => {
      if (state.columns === undefined) {
        state.columns = [];
      }
      const updatedBoard = {
        ...state,
        columns: [...state.columns, action.payload]
      }
      return updatedBoard;
    },
    delete_column_from_board: (state: BoardProps, action: { payload: any; }) => {
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
    update_column_title: (state: BoardProps, action: { payload: { columnId: string; title: string; }; }) => {
      const { columns } = current(state);
      if (columns) {
        const updatedColumns = columns.map((column) => {
          if(column.id === action.payload.columnId) {
            return Object.assign({}, column, { title: action.payload.title });
          } else { 
            return column;
          }          
        }); 
        return {
          ...state,
          columns: updatedColumns,
        }
      } else {
        return state;
      }
    }
  }
});

export const { set_board, clear_board, update_board, add_column_to_board, delete_column_from_board, update_column_title } = boardSlice.actions;

export default boardSlice.reducer;