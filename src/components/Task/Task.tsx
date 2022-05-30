import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { set_task, TaskProps, update_task_title } from '../../store/reducers/taskSlice';
import { deleteTask, getBoard, getColumn, getTask, updateTask } from '../../services/apiBoardProvider';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { set_board } from '../../store/reducers/boardSlice';
import { useTranslation } from 'react-i18next';
import { AddModalInfo } from '../Modal/Modal';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import EditField from '../Board/EditField';
import Button from '@mui/material/Button';
import { set_column } from '../../store/reducers/columnSlice';
import { takeCoverage } from 'v8';


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
    let apiTask;
    let apiColumn;
    if (props.boardId && props.columnId && props.id) {
      apiTask = await getTask(props.boardId, props.columnId, props.id);
      console.dir(apiTask);
      apiColumn = await getColumn(props.boardId, props.columnId);
    }
    dispatch(set_column({id: apiColumn.id, title: apiColumn.title, order: apiColumn.order}));
    dispatch(set_task({id: apiTask.id,
      title: apiTask.title,
      description: apiTask.description,
      order: apiTask.order,
      }));
    setShowEditModal(true);
  };

  const handleHideEditModal = () => {
    setShowEditModal(false);
  };

  const handleUpdateTask = async () => {
    const body = {
      title: task.title,
      order: task.order,
      description: task.description,
      userId: task.userId,
      boardId: props.boardId,
      columnId: props.columnId,
    }
    if (props.boardId && props.columnId && props.id) {
      const updatedTask = await updateTask(props.boardId, props.columnId, props.id, body);
      console.dir(updatedTask);
    }
  }

  function AddEditModal(props: {showModal: boolean, toHide: boolean, columnId: string, taskId: string}) {
   
    setShowEditModal(true);
    
    function renderModal(): JSX.Element | null {
      console.log(`we are in renderModal, task title is ${task.title}, task description is ${task.description}`);
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
