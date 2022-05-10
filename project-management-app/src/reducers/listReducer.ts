export interface TaskProps {
  title: string;
  description: string;
  responsible: string;
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
          title: "Initial setup",
          description: "Set up site structure, webpack",
          responsible: "Ivan",
        },
        {
          title: "Kick-off meeting",
          description: "Conduct meeting to assign tasks",
          responsible: "Olga",
        }      
      ]
    },
    {
      title: "Setup CEO",
      id: 1,
      tasks: [
        {
          title: "Marketing research",
          description: "Identify TA, set up goals",
          responsible: "Zhanna",
        },
        {
          title: "Task allocation",
          description: "Assign tasks to the team",
          responsible: "Angela",
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