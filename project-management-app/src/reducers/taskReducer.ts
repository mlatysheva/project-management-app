export interface TaskProps {
  title: string;
  description: string;
  responsible: string;
}

export const initialState: TaskProps = {
  title: 'My first task',
  description: '',
  responsible: '',
}

const taskReducer = (state = initialState, action: { type: string; }) => {
  switch (action.type) {
    default: 
      return state;
  }
}

export default taskReducer;