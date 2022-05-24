import { delete_board, drag_and_drop, get_allBoards } from '../../store/reducers/boardsSlice';
import { BoardProps, fetchBoard, set_board } from '../../store/reducers/boardSlice';
import AddBoard from '../Board/AddBoard';
import { deleteBoard, getAllBoards, getColumns } from '../../services/apiBoardProvider';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import  { Modal } from '../Modal/Modal';


import './Board.scss';
import { baseUrl } from '../../App';

type TitleProps = {
  title: string;
  children?: string;
};

export function Title({ title = '' }: TitleProps) {
  return <h1 className="page-title">{title}</h1>
}

export function Boards() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  
  let [boards, setBoards] = useState(useAppSelector((state) => state.boards));
 // boards = useAppSelector((state) => state.boards);

  //https://github.com/facebook/react/issues/14920 fix for useEffect 
  useEffect(() => {
    async function fetchData () {
     let boards = await getAllBoards();
      if (boards.length === 0 ) {
        boards = [{id: '02', title: 'Your sample board', description: 'Your sample description'}];
      }
       dispatch(get_allBoards(boards));      
    }
    fetchData()
      .catch(console.error);
  }, [dispatch]);

  async function handleDeleteBoard(boardId: string) {
    dispatch(delete_board(boardId));
    await deleteBoard(boardId);
  }

  async function handleEditBoard(boardId: string, title: string, description: string) {
    alert(`Do you want to edit the board with id: ${boardId}?`);
    dispatch(fetchBoard(boardId));
    navigate(`/${baseUrl}/editboard`);
    // const apiColumns = await getColumns(boardId);
    // dispatch(set_board({
    //   id: boardId,
    //   title: title,
    //   description: description,
    //   columns: apiColumns,
    // }));
  }


  //drag-and-drop
  

  function handleOnDragEnd(result: DropResult, provided: ResponderProvided) {
     dispatch(drag_and_drop(boards));
    setBoards(boards);

  }
 


 //modal

const [showModal, setShowModal] = useState(false);

 const handleShow = () => {
   setShowModal(true);
 };

 const handleHide = () => {
   setShowModal(false);
 };


  const modal =  showModal? (

    <Modal show={false} >
      <div className="modal">
        <section className="modal-main">
          <div className="title-container">
            <Title title="Do you really want to delete your board?" />
          </div>
          <button
            className="modal-close"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleHide();
              // handleDeleteBoard(board.id);
            }}
          >
            ×
          </button>
          <div className="main-container">
            <div className="modal-buttons">
              <button
                className="modal-button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleHide();
                }}
              >
                DELETE
              </button>
            </div>
          </div>
        </section>
      </div>
    </Modal>
  ) : null;

  const { t } = useTranslation();
  return (    
    <div className="main" id="modal-root">
      <Title title={t('boards')}/>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
        {(provided) => (
          <>
          <div className="boards-container"  id="droppable" {...provided.droppableProps} ref={provided.innerRef}>
            <>
        {boards.map((board: BoardProps, index: number) =>
            <Draggable key={board.id} draggableId={board.id} index={index}>
            {(provided) => (
              
          <div className= "board" key={board.id}  {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
            <h2 onClick={() => handleEditBoard(board.id, board.title, board.description)}>{board.title}</h2>
              <Card className="card"  sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" onClick={() => handleEditBoard(board.id, board.title, board.description)}>
                  {board.description}
                </Typography>
              </CardContent>
              <CardActions className='button-wrapper'>
                <Tooltip title="Delete board">
                  {/* <DeleteIcon  onClick={() => handleShow()}/> */}
                  <DeleteIcon onClick={() => handleDeleteBoard(board.id)} />
                </Tooltip>
                <Tooltip title="Edit board">
                  <EditIcon onClick={() => handleEditBoard(board.id, board.title, board.description)}/>
                </Tooltip>
              </CardActions>
              </Card>
              {modal}  
          </div>
          
            )}
            </Draggable>
            
          )}
        <AddBoard formOpen={false} toHide={false} />
        {provided.placeholder}
        {modal}
        </>
      </div>
      </>
      )}
      
        </Droppable>
      </DragDropContext>
    </div>
  );
}
