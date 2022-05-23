import { TaskProps } from '../../store/reducers/tasksSlice';
import { AddTaskButton } from '../Task/AddTaskButton';
import { Task } from '../Task/Task';
import { useAppSelector } from '../../store/hooks';
import CardActions from '@mui/material/CardActions';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { deleteColumn } from '../../services/apiBoardProvider';
import { delete_column_from_board } from '../../store/reducers/boardSlice';

export interface BoardColumnProps {
  id: string;
	title: string;
	tasks: TaskProps[];
}

export const Column = (props: BoardColumnProps) => {
  const tasks = useAppSelector((state) => state.tasks);
  const boardId = useAppSelector((state) => state.board.id);
  const dispatch = useDispatch();

  function handleDeleteColumn(columnId: string) {
    alert(`Column ${columnId} will be deleted!`);  
    deleteColumn(boardId, columnId);
    dispatch(delete_column_from_board(columnId));
  }
  return (
    <div className="column-wrapper">
      <h2>{props.title}</h2>
      { tasks.map((task: TaskProps) => <Task key={task.id} id={task.id} title={task.title} description={task.description} done={task.done} />)}   
      <AddTaskButton type="Add new task"/> 
      <CardActions className='button-wrapper'>
        <Tooltip title="Delete column">
          <DeleteIcon onClick={() => handleDeleteColumn(props.id)}/>
        </Tooltip>
        <Tooltip title="Edit column">
          <EditIcon onClick={() => console.log(`column with id ${props.id} will be edited`)}/>
        </Tooltip>
      </CardActions>
    </div>
  )
};
