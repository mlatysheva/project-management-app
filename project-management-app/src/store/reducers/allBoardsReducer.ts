import { BoardProps } from './boardReducer';
import { CONSTANTS } from '../../actions/index';
import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

export interface AllBoardsProps {
  boards: BoardProps[];
}

export const initialState: BoardProps[] =
 [
    {
      title: "Create website",
      description: "Team work on the Louvre website",
    },
    {
      title: "Setup CEO",
      description: "Prepare and implement marketing strategy for the website"
    },
  ]

let boardId = '021';

export const allBoardsReducer = (state = initialState, action: AnyAction ) => {
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
