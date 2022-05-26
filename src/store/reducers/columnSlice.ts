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
  }

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    set_column: (state: ColumnProps = initialState, action) => {
      const column: ColumnProps = action.payload;
      return column;
    },
  }
});

export const { set_column } = columnSlice.actions;

export default columnSlice.reducer;