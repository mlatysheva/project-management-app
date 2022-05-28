import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskProps } from '../../store/reducers/taskSlice';
import { deleteTask, getBoard } from '../../services/apiBoardProvider';
import { useAppDispatch } from '../../store/hooks';
import { set_board } from '../../store/reducers/boardSlice';
import { useTranslation } from 'react-i18next';
import { AddModalInfo } from '../Modal/Modal';
import { useState } from 'react';

export const Task = (props: TaskProps) => {
  const dispatch = useAppDispatch();
  const {t}= useTranslation();
  const [showInfo, setShowInfo] = useState(false);

    const handleShowInfo = () => {
      setShowInfo(true);
    };


  async function handleDeleteTask (boardId: string | undefined, columnId: string | undefined, taskId: string | undefined) {
    
    if (boardId && columnId && taskId) {
      await deleteTask(boardId, columnId, taskId);
      const updateBoard = await getBoard(boardId);
      dispatch(set_board({
        id: updateBoard.id,
        title: updateBoard.title,
        description: updateBoard.description,
        columns: updateBoard.columns,
      }));
    }
  }
  
  return (
    <Card className="card" sx={{ minWidth: 275, minHeight: 150, marginBottom: 1.5 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title={t('delete_task')}>
          <DeleteIcon onClick={() => handleShowInfo()} />
        </Tooltip>
      </CardActions>
      {showInfo? <AddModalInfo showInfo={showInfo} toHide={true} id={" "} title = {t('task').concat(` ${props.title} `).concat(t('will_be_deleted'))} function= {() => {handleDeleteTask(props.boardId, props.columnId, props.id)}} style={{display:'block'}} />: null}
    </Card>
  )
};
