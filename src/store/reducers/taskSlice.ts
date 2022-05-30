import { createSlice } from "@reduxjs/toolkit";

export interface TaskProps {
  boardId?: string,
  columnId?: string,
  id?: string,
  order?: number,
  title: string,
  description: string,
  userId: string,
}


const initialState: TaskProps =
  { 
    id: '',
    title: '',
    description: '',
    userId: localStorage.getItem("userID") || '',
  }

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    set_task: (state: TaskProps, action: { payload: TaskProps; }) =>{
      return action.payload;
    },
    clear_task: () => {
      return initialState;
    },
    update_task_title: (state: TaskProps, action: { payload: string; }) => {
      return {
        ...state,
        title: action.payload,
      }
    },
    update_task_description: (state: TaskProps, action: { payload: string; }) => {
      return {
        ...state,
        description: action.payload,
      }
    },
    update_task_id: (state: TaskProps, action: { payload: string; }) => {
      return {
        ...state,
        id: action.payload,
      }
    },
  }
});

export const { set_task, clear_task, update_task_title, update_task_description, update_task_id } = taskSlice.actions;

export default taskSlice.reducer;