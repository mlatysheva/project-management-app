import { createSlice } from "@reduxjs/toolkit";
import { TaskProps } from "./tasksSlice";

export interface ColumnProps {
  id: string,
  title: string,
  order: number,
  tasks?: TaskProps[];
}

const initialState: ColumnProps[] = [];

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {

    add_column: (state = initialState, action) => {
      console.log(`in add column order is ${action.payload.order}`);
      const newColumn = {
        id: action.payload.id,
        title: action.payload.title,
        order: action.payload.title,
      }
      return [...state, newColumn];
    },

    delete_column: (state, action) => {
      const columnId = action.payload;
      console.dir(state);
      console.log(`in reducer column with id ${columnId} will be deleted`);
      let newList = state.filter(column => column.id != columnId);
      console.dir(newList);
      if (newList === []) {
        newList = initialState;
      }
      return newList;
    },
  }
});

export const { add_column, delete_column } = columnsSlice.actions;

export default columnsSlice.reducer;
