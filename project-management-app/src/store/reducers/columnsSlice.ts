import { createSlice } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { TaskProps } from "./tasksSlice";

export interface ColumnProps {
  id: string,
  title: string,
  order: number,
  tasks?: TaskProps[];
}

let columnOrder = 0;
let columnId = 10;

const initialState: ColumnProps[] = [];

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {

    add_column: (state = initialState, action) => {
      console.log('we are in add_column');
      const newColumn = {
        id: columnId.toString(),
        title: action.payload.title,
        order: columnOrder,
      }
      columnOrder++;
      columnId++;
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
