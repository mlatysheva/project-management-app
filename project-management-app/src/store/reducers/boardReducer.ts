import { ColumnProps } from "./columnReducer";

export interface BoardProps {
  id?: string | undefined;
  title: string;
  description: string;
  columns?: ColumnProps[];
}

const initialState: BoardProps = {
  title: "Task: figure out how this crazy shit works",  
  description: "My mind is going to blow out",
}

export const boardReducer = (state = initialState, action: { type: string; }) => {
  switch (action.type) {
    default: 
      return state;
  }
}
