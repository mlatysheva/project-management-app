import { TaskProps } from "./taskReducer";

export interface ColumnProps {
  id?: string,
  title: string,
  order: number,
  tasks?: TaskProps[];
}

const initialState = {
  title: 'todo column',
  order: 1,
}

export const columnReducer = (state = initialState, action: { type: string; }) => {
  switch (action.type) {
    default: 
      return state;
  }
}