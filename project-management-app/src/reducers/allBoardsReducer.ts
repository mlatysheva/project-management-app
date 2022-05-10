import { BoardProps } from "./boardReducer";

export interface TaskProps {
  title: string;
  description: string;
  responsible: string;
}

export interface AllBoardsProps {
  boards: BoardProps[];
}

export const initialState: AllBoardsProps = {
  boards: [
    {
      title: "Create website",
      id: 0,
      description: "Team work on the Louvre website",
    },
    {
      title: "Setup CEO",
      id: 1,
      description: "Prepare and implement marketing strategy for the website"
    },
  ]
}

const allBoardsReducer = (state = initialState, action: { type: string; }) => {
  switch (action.type) {
    default: 
      return state;
  }
}

export default allBoardsReducer;