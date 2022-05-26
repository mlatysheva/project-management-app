import { createSlice } from "@reduxjs/toolkit";

export interface TaskProps {
  boardId?: string,
  columnId?: string,
  id?: string,
  title: string,
  description: string,
  userId: string,
}


const initialState: TaskProps =
  {
    title: '',
    description: '',
    userId: localStorage.getItem("userID") || '',
  }

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    set_task: (state, action) =>{
      return action.payload;
    },
    update_task_title: (state, action) => {
      return {
        ...state,
        title: action.payload,
      }
    },
    update_task_description: (state, action) => {
      return {
        ...state,
        description: action.payload,
      }
    }
  }
});

export const { set_task, update_task_title, update_task_description } = taskSlice.actions;

export default taskSlice.reducer;