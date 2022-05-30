import AddColumn from '../Column/AddColumn';
import { Column } from '../Column/Column';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { clear_board, ColumnProps, set_board, update_board } from '../../store/reducers/boardSlice';
import{ update_column } from '../../store/reducers/columnSlice';
import { EditField } from './EditField';
import { deleteBoard, getBoard, updateBoard } from '../../services/apiBoardProvider';
import { baseUrl } from '../../App';
import { useEffect, useState } from 'react';
import { AddModalInfo } from '../Modal/Modal';
import { DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd';
import '../Boards/Board.scss';

export default function EditBoard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const boardId = useAppSelector((state) => state.app.editedBoardId);
  const { t } = useTranslation();
  const board = useAppSelector((state) => state.board);
  const columns = useAppSelector((state) => state.board.columns);
  const task = useAppSelector((state) => state.task);

  const [showModal, setShowModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
 
  const handleShow = () => {
     setShowModal(true);
  };

  const handleHide = () => {
    setShowModal(false);
    setShowInfo(false);
    setShowAlert(false);
    };

    const handleShowInfo = () => {
      setShowInfo(true);
    };

    const handleAlert = () => {
      setShowAlert(true);
    };
  function AddModal(props: {showModal: boolean, toHide: boolean, id: string, title: string}) {
    document.body.addEventListener('click', (e) => {
      if (e) {
        if ((e.target as HTMLElement).className === 'delete-board' && (e.target as HTMLElement).id === props.id) {
          handleShow();
        }
      }
    });
    
    function renderModal(): JSX.Element | null {
      return (
        <div className="modal" >
        <section className="modal-main">
          <div className="title-container">
          <h3> {props.title} </h3>
          </div>
          <button
            className="modal-close"
            id={props.id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleHide();
            }}
          >
            ×
          </button>
          <div className="main-container">
            <div className="modal-buttons">
              <button
                className="modal-button"
                id={props.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteBoard();
                  handleHide();
                    
                }}
              >
                {t('delete')}
              </button>
            </div>
          </div>
        </section>
      </div>
      );
    }
   
  
  return  renderModal() ;
  
}

  let taskId = task.id;

  useEffect(() => {
    async function getBoardFromServer(id: string) {
      const response = await getBoard(id);
      dispatch(set_board({
        id: response.id,
        title: response.title,
        description: response.description,
        columns: response.columns,
      }));
    }
    getBoardFromServer(boardId);    
  }, [boardId, dispatch, taskId]);
  
  async function handleBoardSave() {
    let body = {
      title: board.title,
      description: board.description,
    }
    await updateBoard(boardId, body);

    if (body.title && body.description) {
      dispatch(update_board({
        ...body,
        id: boardId,
      }));
      handleShowInfo();
      navigate(`/${baseUrl}/boards`);
    }
    else {
      handleAlert();
    }    
  }

  async function handleDeleteBoard() {    
     if (boardId) {
      await deleteBoard(boardId);
    }
    dispatch(clear_board());
    navigate(`/${baseUrl}/boards`);
  }

//drag-and-drop  
 
function reorder(columns: ColumnProps[], index: number, newIndex: number) {
  const newColumns = [...columns];
  
  const [removed] = newColumns.splice(index, 1);
  newColumns.splice(newIndex, 0, removed);
  
  
  return newColumns;
}

 const[column, setColumn] = useState(columns);

function handleOnDragEnd(result: DropResult) {

  if (!result.destination) {
    return;
  }
  if (result.destination.index === result.source.index) {
    return;
  } else {
    
  const newColumn = reorder(
    columns || [],
    result.source.index,
    result.destination.index
  );
  
    setColumn(newColumn);
   
    dispatch(update_column({
      id: newColumn[result.destination.index].id,
      title: newColumn[result.destination.index].title,
      order: result.destination.index,
      
    }));
}
}

  return (
    <div className="main" id="modal-root">
      <h1 className="page-title">{t('edit_title')}</h1>
      <div className="add-section">
        <EditField placeholder="Enter new title" type="title" field={board.title} category="edit"/>
        <EditField placeholder="Enter new description" type="description" field={board.description} category="edit"/>
      </div>

 <DragDropContext onDragEnd={handleOnDragEnd}>
 <Droppable droppableId="droppable">
 {(provided) => (
            <>

      <div className="column-container" id="droppable" {...provided.droppableProps} ref={provided.innerRef}>
        {(columns !== undefined) ? columns.map((column: ColumnProps, index:number) => 
        <Draggable key={column.id} draggableId={column.id} index={index}>
          {(provided) => (
        <div  {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
        <Column 
        key={column.id} 
        id={column.id} 
        title={column.title} 
        order={column.order} 
        tasks={column.tasks || []} 
         />
        </div>
        )}

        </Draggable>


        
        ) : null }
        <AddColumn />
      </div>

      
      {provided.placeholder}
    </>
  )}
      </Droppable>
</DragDropContext>

      <div className="save-cancel-section">
        <Button style={{ marginRight: 20, minWidth: 100, backgroundColor: "lightgrey", color: "midnightblue"}} onClick={handleShow}>{t('delete_board')}</Button>
        {showModal? <AddModal showModal={showModal} toHide={true} id={board.id} title = {t('question_delete_board').concat(" ", board.title, " ?")}/>: null}
        <Button style={{ minWidth: 100, backgroundColor: "midnightblue", color: "white"}} onClick={handleBoardSave}>{t('save_board')}</Button>
        {showInfo? <AddModalInfo showInfo={showInfo} toHide={true} id={board.id} title = {t("board_was_saved").concat(" ", board.title)} function= {() => {}} style={{display:'none'}} />: null}
        {showAlert? <AddModalInfo showInfo={showAlert} toHide={true} id={board.id} title = {t('alert')} function= {() => {handleHide()}} style={{display:'block'}} />: null}
      </div>
    </div>
  )
}
