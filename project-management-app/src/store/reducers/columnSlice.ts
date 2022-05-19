import { createSlice } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { TaskProps } from "./tasksSlice";

export interface ColumnProps {
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
  }

let columnId = 2;

// export const columnReducer = (state = initialState, action: AnyAction ) => {
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

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    add_column: (state: ColumnProps, action: { payload: { title: string; }; }) => {
      const newColumn = {
        id: columnId.toString(),
        title: action.payload.title,
        order: columnOrder,
      }
      columnId++;
      columnOrder++;
      console.dir(state);
      console.log(`in columnsReducer title is ${newColumn.title}`);
      return newColumn;
    }
  }
});

export const { add_column } = columnSlice.actions;

export default columnSlice.reducer;