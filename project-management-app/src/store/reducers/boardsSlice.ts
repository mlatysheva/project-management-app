import { createSlice } from '@reduxjs/toolkit';
import { boardsReducer, initialState } from './boardsReducer';

export interface CounterState {
  value: number;
}

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: { boardsReducer },
});
