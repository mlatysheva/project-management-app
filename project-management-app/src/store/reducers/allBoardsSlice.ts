import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../store';
import { BoardProps } from './boardReducer';
import { allBoardsReducer, initialState } from './allBoardsReducer';

export interface CounterState {
  value: number;
}

export const allBoardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: { allBoardsReducer },
});
