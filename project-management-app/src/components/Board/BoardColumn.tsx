import React from 'react';
import { TaskProps } from '../../store/reducers/taskReducer';
import { AddButton } from './AddButton';
import { TaskCard } from './TaskCard';

interface BoardColumnProps {
	title: string;
	tasks: TaskProps[];
}

export const BoardColumn = (props: BoardColumnProps) => {
  //console.dir(props);
  return (
    <div className="column-wrapper">
      <h2>{props.title}</h2>
      { props.tasks.map((task: TaskProps) => <TaskCard key={task.id} id={task.id} title={task.title} description={task.description} done={task.done} />)}   
      <AddButton type="Add new task"/> 
    </div>
  )
};
