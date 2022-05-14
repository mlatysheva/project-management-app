import React from 'react';
import { TaskProps } from '../../store/reducers/tasksSlice';
import { AddButton } from '../Board/AddButton';
import { TaskCard } from '../Board/TaskCard';

interface BoardColumnProps {
	title: string;
	tasks: TaskProps[];
}

export const Column = (props: BoardColumnProps) => {
  //console.dir(props);
  return (
    <div className="column-wrapper">
      <h2>{props.title}</h2>
      { props.tasks.map((task: TaskProps) => <TaskCard key={task.id} id={task.id} title={task.title} description={task.description} done={task.done} />)}   
      <AddButton type="Add new task"/> 
    </div>
  )
};
