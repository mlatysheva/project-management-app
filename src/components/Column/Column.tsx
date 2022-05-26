import { TaskProps } from '../../store/reducers/taskSlice';
import { AddTask } from '../Task/AddTask';
import { Task } from '../Task/Task';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteColumn } from '../../services/apiBoardProvider';
import { delete_column_from_board } from '../../store/reducers/boardSlice';
import './Column.scss';
import { useTranslation } from 'react-i18next';
import ColumnTitle from './ColumnTitle';

export interface BoardColumnProps {
  id: string;
	title: string;
	tasks: TaskProps[];
  order?: number;
}

export const Column = (props: BoardColumnProps) => {
  const board = useAppSelector((state) => state.board);
  const tasks = props.tasks;
  const boardId = board.id;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
        <ColumnTitle placeholder={t('title_column')} type={'column_title'} value={props.title} columnId={props.id} columnOrder={props.order}/>
      </div>
      
      { tasks.map((task: TaskProps) => <Task key={task.id} id={task.id} title={task.title} description={task.description}  userId={localStorage.getItem('userID') || ''} />)}   
      <AddTask columnId={props.id} columnTitle={props.title} />
    </div>
  )
};
