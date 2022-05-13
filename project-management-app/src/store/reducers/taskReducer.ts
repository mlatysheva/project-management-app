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

export const initialState: TaskProps = {
  id: 'ab1',
  title: 'My first task',
  description: 'Sample task',
  userId: {description: "some user"},
}

const taskReducer = (state = initialState, action: { type: string; }) => {
  switch (action.type) {
    default: 
      return state;
  }
}

export default taskReducer;