import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getColumn } from "../../services/apiBoardProvider";
import { TaskProps } from "./taskSlice";

export interface ColumnProps {
  boardId?: string,
  id?: string,
  title: string,
  order?: number,
  tasks?: TaskProps[];
}

let columnOrder = 0;

const initialState: ColumnProps =
  {
    id: '',
    title: '',
    order: columnOrder,
    tasks: [],
  }

interface ColumnParameters {
  columnId: string,
  boardId: string,
}
export const fetchColumn = createAsyncThunk(
  'column/fetchColumn',
  async (body: ColumnParameters, { rejectWithValue, dispatch }) => {
    try {
      const response = await getColumn(body.boardId, body.columnId);
      dispatch(set_column(response));
    } catch (error) {
      console.log(error);
    }
  }
);

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    set_column: (state: ColumnProps = initialState, action: { payload: ColumnProps; }) => {
      const column: ColumnProps = action.payload;
      return column;
    },
    clear_column: () => {
      return initialState;
    },
    add_task_to_column: (state: ColumnProps, action: { payload: TaskProps }) => {
      if (state.tasks === undefined) {
        state.tasks = [];
      }
      const updatedColumn = {
        ...state,
        tasks: [...state.tasks, action.payload]
      }
      // return updatedColumn;
    },
    update_column: (state: ColumnProps, action: { payload: { title: string; id: string; order: number }; }) => {
      const updatedColumn = {
        ...state,
        title: action.payload.title,
        id: action.payload.id,
        order: action.payload.order,
      }
      return updatedColumn;
    }
  }
});

export const { set_column, clear_column, add_task_to_column, update_column } = columnSlice.actions;

export default columnSlice.reducer;