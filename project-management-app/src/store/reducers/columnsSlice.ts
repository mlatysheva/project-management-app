import { createSlice } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { TaskProps } from "./tasksSlice";

export interface ColumnProps {
  id?: string,
  title: string,
  order: number,
  tasks?: TaskProps[];
}

let columnId = 2;
let columnOrder = 0;

const initialState: ColumnProps[] = [];

// export const columnsReducer = (state = initialState, action: AnyAction ) => {
//   switch (action.type) {
//     case "add_column":
//       const newColumn = {
//         id: columnId.toString(),
//         title: action.payload.title,
//         order: columnOrder,
//       }
//       columnId++;
//       columnOrder++;
//       console.dir(state);
//       console.log(`in columnsReducer title is ${newColumn.title}`);
//       return [...state, newColumn];
//     default: 
//       return state;
//   }
// }

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {

    add_column: (state = initialState, action) => {
      console.log('we are in add_column');
      const newColumn = {
        title: action.payload.title,
        order: columnOrder,
      }
      columnOrder++;
      return [...state, newColumn];
    },

    delete_column: (state, action) => {
      const columnId = action.payload;
      let newList = state.filter(column => column.id != columnId);
      if (newList === []) {
        newList = initialState;
      }
      return newList;
    },
  }
});

export const { add_column, delete_column } = columnsSlice.actions;

export default columnsSlice.reducer;
