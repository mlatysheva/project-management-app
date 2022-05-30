import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { set_task, TaskProps } from '../../store/reducers/taskSlice';
import { deleteTask, getBoard, getColumn, getTask, updateTask } from '../../services/apiBoardProvider';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { set_board } from '../../store/reducers/boardSlice';
import { useTranslation } from 'react-i18next';
import { AddModalInfo } from '../Modal/Modal';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { set_column } from '../../store/reducers/columnSlice';
import TaskTitle from './TaskTitle';


export const Task = (props: TaskProps) => {
  const dispatch = useAppDispatch();
  const {t}= useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const column = useAppSelector((state) => state.column);
  const task = useAppSelector((state) => state.task);

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };  

  const handleShowEditModal = async () => {
    setShowEditModal(true);
    let apiTask;
    let apiColumn;
    if (props.boardId && props.columnId && props.id) {
      apiTask = await getTask(props.boardId, props.columnId, props.id);
      apiColumn = await getColumn(props.boardId, props.columnId);
    }
    dispatch(set_column({id: apiColumn.id, title: apiColumn.title, order: apiColumn.order}));
    dispatch(set_task({id: apiTask.id,
      title: apiTask.title,
      description: apiTask.description,
      order: apiTask.order,
      userId: apiTask.userId,
      }));    
  };

  const handleHideEditModal = () => {
 
    setShowEditModal(false);
  };

  const handleUpdateTask = async () => {
    const body = {
      title: task.title,
      order: task.order,
      description: task.description,
      userId: localStorage.getItem("userID") || '',
      boardId: props.boardId,
      columnId: props.columnId,
    }
    if (props.boardId && props.columnId && props.id) {
      const updatedTask = await updateTask(props.boardId, props.columnId, props.id, body);
      
    }
    if (props.boardId) {
      const updateBoard = await getBoard(props.boardId);
      dispatch(set_board({
        id: updateBoard.id,
        title: updateBoard.title,
        description: updateBoard.description,
        columns: updateBoard.columns,
      }));
    }    
    setShowEditModal(false);
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

  function AddDeleteModal(props: {showDeleteModal: boolean, toHide: boolean, boardId: string, columnId: string, taskId: string, taskTitle: string}) {
    useEffect(() => {
      setShowDeleteModal(true);
    }, []);
    
    function renderModal(): JSX.Element | null {
      return (
        <div className="modal" >
          <section className="modal-main">
            <button
              className="modal-close"
              id={props.taskId}
              onClick={(e) => {
                e.preventDefault();
                setShowDeleteModal(false);
              }}
            >
              ×
            </button>
            <div className="main-container">
              <p>{t('task').concat(` ${props.taskTitle} `).concat(t('will_be_deleted'))} </p>
              <div className="modal-buttons">
                <button
                  className="modal-button"
                  id={task.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteTask(props.boardId, props.columnId, props.taskId);                      
                  }}
                >
                  {t('confirm')}
                </button>
              </div>
            </div>
          </section>
        </div>
      );
    }
    return renderModal();  
  }

  function AddEditModal(props: {showEditModal: boolean, toHide: boolean, columnId: string, taskId: string}) {
    useEffect(() => {
      setShowEditModal(true);
    }, []);
    
    function renderModal(): JSX.Element | null {
      return (
        <div className="modal" >
          <section className="modal-main">
            <button
              className="modal-close"
              id={props.taskId}
              onClick={(e) => {
                e.preventDefault();
                setShowEditModal(false);
              }}
            >
              ×
            </button>
            <div className="main-container">
              <div className="add-section">
                <TaskTitle formOpen={false} placeholder={t('placeholder_title')} type='task_title' value={task.title} />
                <TaskTitle formOpen={false} placeholder={t('placeholder_description')} type='task_description' value={task.description} />
              </div>
            </div>
            <div className="save-cancel-section">
              <Button style={{ marginRight: 20, minWidth: 100, backgroundColor: "lightgrey", color: "midnightblue"}} onClick={handleHideEditModal}>{t('cancel')}</Button>
              <Button style={{ minWidth: 100, backgroundColor: "midnightblue", color: "white"}} onClick={handleUpdateTask}>{t('save')}</Button>
            </div>
          </section>
        </div>
      );
    }
    return renderModal();  
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
          <DeleteIcon onClick={() => handleShowDeleteModal()} />
        </Tooltip>
        <Tooltip title={t("edit_task")}>
          <EditIcon onClick={handleShowEditModal}/>
        </Tooltip>
      </CardActions>
      {showDeleteModal? <AddDeleteModal showDeleteModal={showDeleteModal} toHide={true} boardId={props.boardId || ''} columnId={props.columnId || ''} taskId={props.id || ''} taskTitle={task.title} />: null}
      {showEditModal? <AddEditModal showEditModal={true} toHide={false} columnId={props.columnId || ''} taskId={props.id || ''} />: null}
    </Card>
  )
};
