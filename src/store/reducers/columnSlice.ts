import { createSlice } from "@reduxjs/toolkit";
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
    title: '',
    order: columnOrder,
    tasks: [],
  }

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    set_column: (state: ColumnProps = initialState, action: { payload: ColumnProps; }) => {
      const column: ColumnProps = action.payload;
      return column;
    },
    add_task_to_column: (state: ColumnProps, action: { payload: any; }) => {
      console.dir(action.payload);
      console.log()
      console.dir(state.tasks);
      if (state.tasks === undefined) {
        state.tasks = [];
      }
      state.tasks.push(action.payload);
      console.log('updated state.tasks is');
      console.dir(state.tasks);
      const updatedColumn = {
        ...state,
        tasks: [...state.tasks, action.payload]
      }
      console.dir(updatedColumn);
      // return updatedColumn;
    },
  }
});

export const { set_column, add_task_to_column } = columnSlice.actions;

export default columnSlice.reducer;