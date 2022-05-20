import { createSlice } from "@reduxjs/toolkit";
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

// export const columnSlice = createSlice({
//   name: 'column',
//   initialState,
//   reducers: {
//     add_column: (state: ColumnProps, action: { payload: { title: string; }; }) => {
//       const newColumn = {
//         id: columnId.toString(),
//         title: action.payload.title,
//         order: columnOrder,
//       }
//       columnId++;
//       columnOrder++;
//       return newColumn;
//     }
//   }
// });

// export const { add_column } = columnSlice.actions;

// export default columnSlice.reducer;