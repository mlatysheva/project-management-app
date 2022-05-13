import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../store';
import { BoardProps } from './boardReducer';
import { boardsReducer, initialState } from './boardsReducer';

export interface CounterState {
  value: number;
}

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: { boardsReducer },
});
