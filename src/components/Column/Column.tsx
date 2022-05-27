import { TaskProps } from '../../store/reducers/taskSlice';
import { AddTask } from '../Task/AddTask';
import { Task } from '../Task/Task';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteColumn, getColumn } from '../../services/apiBoardProvider';
import { delete_column_from_board } from '../../store/reducers/boardSlice';
import './Column.scss';
import { useTranslation } from 'react-i18next';
import ColumnTitle from './ColumnTitle';
import { useEffect } from 'react';
import { set_column } from '../../store/reducers/columnSlice';

export interface ColumnProps {
  id: string;
	title: string;
	tasks: TaskProps[];
  order?: number;
}

export const Column = (props: ColumnProps) => {
  const board = useAppSelector((state) => state.board);
  // const tasks = useAppSelector((state) => state.column.tasks);
  const tasks = props.tasks;
  const boardId = board.id;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  let columnId = props.id;

  // useEffect(() => {
  //   console.log('we are in useEffect')
  //   async function getColumnFromServer(bId: string, cId: string) {
  //     const response = await getColumn(bId, cId);
  //     dispatch(set_column({
  //       id: response.id,
  //       title: response.title,
  //       order: response.order,
  //       tasks: response.tasks,
  //     }));
  //     columnId = response.id
  //   }
  //   getColumnFromServer(boardId, columnId);    
  // }, []);

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
      
      { (tasks != undefined) ? tasks.map((task: TaskProps) => <Task key={task.id} id={task.id} title={task.title} description={task.description} userId={localStorage.getItem('userID') || ''} /> ) : null}   
      <AddTask columnId={props.id} columnTitle={props.title} tasks={props.tasks} />
    </div>
  )
};
