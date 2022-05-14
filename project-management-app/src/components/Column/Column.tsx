import React from 'react';
import { TaskProps } from '../../store/reducers/tasksSlice';
import { AddTaskButton } from '../Task/AddTaskButton';
import { Task } from '../Task/Task';
import { useAppSelector } from '../../store/hooks';

interface BoardColumnProps {
	title: string;
	tasks: TaskProps[];
}

export const Column = (props: BoardColumnProps) => {
  const tasks = useAppSelector((state) => state.tasks);
  console.dir(tasks);
  //console.dir(props);
  return (
    <div className="column-wrapper">
      <h2>{props.title}</h2>
      { tasks.map((task: TaskProps) => <Task key={task.id} id={task.id} title={task.title} description={task.description} done={task.done} />)}   
      <AddTaskButton type="Add new task"/> 
    </div>
  )
};
