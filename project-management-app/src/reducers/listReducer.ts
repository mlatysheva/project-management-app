export interface TaskProps {
  id: number;
  text: string;
}

export interface ListProps {
  title: string;
  id: number;
  tasks: TaskProps[];
}

export interface ListsProps {
  lists: ListProps[];
}

export const initialState: ListsProps = {
  lists: [
    {
      title: "Create website",
      id: 0,
      tasks: [
        {
          id: 0,
          text: "Deploy server",
        },
        {
          id: 1,
          text: "Setup initial structure",
        }      
      ]
    },
    {
      title: "Setup CEO",
      id: 0,
      tasks: [
        {
          id: 0,
          text: "Find a contractor",
        },
        {
          id: 1,
          text: "Draw up the list of marketing tasks",
        }      
      ]
    },
  ]
}

const listReducer = (state = initialState, action: { type: string; }) => {
  switch (action.type) {
    default: 
      return state;
  }
}

export default listReducer;