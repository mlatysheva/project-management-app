import { AnyAction } from "redux";
export interface UserIdProps {
  description: string;
}

export interface BoardIdProps {
  description: string;
}

export interface TaskProps {
  id:	string,
  title:	string,
  done?:	boolean,
  order?:	number,
  description?:	string,
  userId?: UserIdProps,
  boardId?: BoardIdProps,
  columnId?:	string,
  files?:	string[],
}

export const initialState: TaskProps[] = [{
  id: 'ab1',
  title: 'My first task',
  description: 'Sample task',
}]

let taskId = 2;
let taskOrder = 0;

export const tasksReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "add_task":
      const newTask = {
        id: taskId.toString(),
        title: action.payload.title,
        order: taskOrder,
      }
      taskId++;
      taskOrder++;
      return [...state, newTask];
    default: 
      return state;
  }
}
