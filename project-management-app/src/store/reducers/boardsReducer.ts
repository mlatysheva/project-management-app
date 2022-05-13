import { BoardProps } from './boardReducer';
import { CONSTANTS } from '../../actions/index';
import { AnyAction } from '@reduxjs/toolkit';

export interface AllBoardsProps {
  boards: BoardProps[];
}

export const initialState: BoardProps[] =
 [
    {
      title: "Your sample board",
      description: "Team project on eating an elephant",
    },
  ]

let boardId = '021';

export const boardsReducer = (state = initialState, action: AnyAction ) => {
  switch (action.type) {
    case CONSTANTS.ADD_BOARD:
      const newBoard = {
        title: action.payload.title,
        description: action.payload.description,
        id: boardId,
      }
      boardId = (parseInt(boardId)+1).toString();
      return [...state, newBoard];
    default: 
      return state;
  }
}
