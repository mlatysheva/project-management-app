import { TaskProps } from '../../store/reducers/taskSlice';
import { AddTask } from '../Task/AddTask';
import { Task } from '../Task/Task';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteColumn} from '../../services/apiBoardProvider';
import { delete_column_from_board } from '../../store/reducers/boardSlice';
import './Column.scss';
import { useTranslation } from 'react-i18next';
import ColumnTitle from './ColumnTitle';
import { AddModalInfo } from '../Modal/Modal';
import { useState } from 'react';


export interface ColumnProps {
  id: string;
	title: string;
	tasks: TaskProps[];
  order?: number;
}

export const Column = (props: ColumnProps) => {
  const board = useAppSelector((state) => state.board);
  const tasks = props.tasks;
  const boardId = board.id;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [showInfo, setShowInfo] = useState(false);

  const handleShowInfo = (columnId: string) => {
      setShowInfo(true);
      }
    

  function handleDeleteColumn(columnId: string) {
    handleShowInfo(columnId); 
    deleteColumn(boardId, columnId);
    dispatch(delete_column_from_board(columnId));
  }
  

  return (
    <div className="column-wrapper">
      <div className="button-wrapper">
        <Tooltip title={t('delete_column')}>
          <DeleteIcon onClick={() => handleShowInfo (props.id)}/>
        </Tooltip>
        <ColumnTitle placeholder={t('enter_title')} type={'column_title'} value={props.title} columnId={props.id} columnOrder={props.order}/>
      </div>
      
      { (tasks !== undefined) ? tasks.map((task: TaskProps) => <Task key={task.id} id={task.id} columnId={props.id} boardId={board.id} title={task.title} description={task.description} userId={localStorage.getItem('userID') || ''} /> ) : null}   
      <AddTask columnId={props.id} columnTitle={props.title} tasks={props.tasks} />
      {showInfo? <AddModalInfo showInfo={showInfo} toHide={true} id={board.id} title = {t('column').concat(` ${props.title} `).concat(t('will_be_deleted'))  } style={{display:'block'}} function={()=>{handleDeleteColumn(props.id)}}/>: null}
    </div>
  )
};
