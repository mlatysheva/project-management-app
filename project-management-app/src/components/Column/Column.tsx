import { TaskProps } from '../../store/reducers/tasksSlice';
import { AddTaskButton } from '../Task/AddTaskButton';
import { Task } from '../Task/Task';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteColumn } from '../../services/apiBoardProvider';
import { delete_column_from_board } from '../../store/reducers/boardSlice';

export interface BoardColumnProps {
  id: string;
	title: string;
	tasks: TaskProps[];
}

export const Column = (props: BoardColumnProps) => {
  const tasks = useAppSelector((state) => state.tasks);
  const board = useAppSelector((state) => state.board);
  const boardId = board.id;
  const dispatch = useAppDispatch();

  function handleDeleteColumn(columnId: string) {
    alert(`Column ${columnId} will be deleted!`);  
    deleteColumn(boardId, columnId);
    dispatch(delete_column_from_board(columnId));
  }
  return (
    <div className="column-wrapper">
      <div className="button-wrapper">
        <Tooltip title="Delete column">
          <DeleteIcon onClick={() => handleDeleteColumn(props.id)}/>
        </Tooltip>
        <h2>{props.title}</h2>
        <Tooltip title="Edit title">
          <EditIcon onClick={() => console.log(`column with id ${props.id} will be edited`)}/>
        </Tooltip>
      </div>
      
      { tasks.map((task: TaskProps) => <Task key={task.id} id={task.id} title={task.title} description={task.description} done={task.done} />)}   
      <AddTaskButton type="Add new task"/>
    </div>
  )
};
