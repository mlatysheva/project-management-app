import React from 'react';
import { TaskProps } from '../../reducers/listReducer';
import { TaskCard } from './TaskCard';

interface BoardColumnProps {
  title: string;
  tasks: TaskProps[];
}

const styles = {
  container: {
    width: 300,
    margin: 10,
    color: "black",
    backgroundColor: "skyblue",
    borderRadius: 3,
    padding: 8,
  }
}; 

export const BoardColumn = (props: BoardColumnProps) => {
  console.dir(props);
  return (
    <div style={styles.container}>
      <h2>{props.title}</h2>
      { props.tasks.map((task: TaskProps) => <TaskCard title={task.title} description={task.description} responsible={task.responsible} />)}    
    </div>
  )
};
