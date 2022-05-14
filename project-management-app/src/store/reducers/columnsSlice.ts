import { AnyAction } from "redux";
import { TaskProps } from "./tasksSlice";

export interface ColumnProps {
  id?: string,
  title: string,
  order: number,
  tasks?: TaskProps[];
}

const initialState: ColumnProps[] = [
  {
    title: 'todo column',
    order: 1,
  }
]

let columnId = 2;
let columnOrder = 0;

export const columnsReducer = (state = initialState, action: AnyAction ) => {
  switch (action.type) {
    case "add_column":
      const newColumn = {
        id: columnId.toString(),
        title: action.payload.title,
        order: columnOrder,
      }
      columnId++;
      columnOrder++;
      console.dir(state);
      console.log(`in columnsReducer title is ${newColumn.title}`);
      return [...state, newColumn];
    default: 
      return state;
  }
}