import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { set_task, TaskProps } from '../../store/reducers/taskSlice';
import { deleteTask, getBoard, getTask } from '../../services/apiBoardProvider';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { set_board } from '../../store/reducers/boardSlice';
import { useTranslation } from 'react-i18next';
import { AddModalInfo } from '../Modal/Modal';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import EditField from '../Board/EditField';
import Button from '@mui/material/Button';
import { set_column } from '../../store/reducers/columnSlice';


export const Task = (props: TaskProps) => {
  const dispatch = useAppDispatch();
  const {t}= useTranslation();
  const [showInfo, setShowInfo] = useState(false);
  const board = useAppSelector((state) => state.board);
  const column = useAppSelector((state) => state.column);
  const task = useAppSelector((state) => state.task);
  console.log(`task title is ${task.title}, task descriptio is ${task.description}`);

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowEditModal = async () => {
    if (props.boardId && props.columnId && props.id) {
      const apiTask = await getTask(props.boardId, props.columnId, props.id);
    }    
    // dispatch(set_task())
    setShowEditModal(true);
  };

  const handleHideEditModal = () => {
    setShowEditModal(false);
  };

  const handleUpdateTask = () => {
    const body = {
      title: "Task: pet the cat",
      order: 1,
      description: "Domestic cat needs to be stroked gently",
      userId: localStorage.getItem("userID"),
      boardId: props.boardId,
      columnId: props.columnId,
    }
  }

  function AddEditModal(props: {showModal: boolean, toHide: boolean, columnId: string, taskId: string}) {
   
    handleShowEditModal();
    
    function renderModal(): JSX.Element | null {
      console.log(`we are in renderModal`);
      return (
        <div className="modal" >
          <section className="modal-main">
            <button
              className="modal-close"
              id={props.taskId}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleHideEditModal();
              }}
            >
              ×
            </button>
            <div className="main-container">
              <div className="add-section">
                <EditField formOpen={true} placeholder={t('placeholder_title')} type="title" field={task.title} category="create" />
                <EditField formOpen={true} placeholder={t('placeholder_description')} type="description" field={task.description} category="create" />
              </div>
            </div>
            <div className="save-cancel-section">
              <Button style={{ marginRight: 20, minWidth: 100, backgroundColor: "lightgrey", color: "midnightblue"}} onClick={handleHideEditModal}>{t('cancel')}</Button>
              <Button style={{ minWidth: 100, backgroundColor: "midnightblue", color: "white"}} onClick={() => console.log('The task will be saved')}>{t('save')}</Button>
            </div>
          </section>
        </div>
      );
    }
  return renderModal();  
}

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
      <CardActions className='button-wrapper'>
        <Tooltip title={t('delete_task')}>
          <DeleteIcon onClick={() => handleShowInfo()} />
        </Tooltip>
        <Tooltip title={t("edit_task")}>
          <EditIcon onClick={handleShowEditModal}/>
        </Tooltip>
      </CardActions>
      {showInfo? <AddModalInfo showInfo={showInfo} toHide={true} id={" "} title = {t('task').concat(` ${props.title} `).concat(t('will_be_deleted'))} function= {() => {handleDeleteTask(props.boardId, props.columnId, props.id)}} style={{display:'block'}} />: null}
      {showEditModal? <AddEditModal showModal={true} toHide={false} columnId={''} taskId={''} />: null}
    </Card>
  )
};
