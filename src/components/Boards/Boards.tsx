import { delete_board, get_allBoards, drag_and_drop } from '../../store/reducers/boardsSlice';
import { BoardProps, clear_board, fetchBoard, set_board } from '../../store/reducers/boardSlice';
import AddBoard from '../Board/AddBoard';
import { deleteBoard, getAllBoards, getColumns } from '../../services/apiBoardProvider';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd';


import './Board.scss';
import { baseUrl } from '../../App';
import { remove_editedBoard, set_editedBoard } from '../../store/reducers/appSlice';

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
  const { t } = useTranslation();
  let boards = useAppSelector((state) => state.boards);  

  const [board, setBoards] = useState(boards);
 
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
    dispatch(remove_editedBoard());
    await deleteBoard(boardId);   
  }  

  async function handleEditBoard(boardId: string, title: string, description: string) {
    navigate(`/${baseUrl}/editboard`);
    dispatch(set_editedBoard({isBoardInEdit: true,
      editedBoardId: boardId}));
  }

  //drag-and-drop  
 
    function reorder(boards: BoardProps[], index: number, newIndex: number) {
      const newBoards = [...boards];
      console.log(boards);
      const [removed] = newBoards.splice(index, 1);
      newBoards.splice(newIndex, 0, removed);
      console.log(index, removed, newBoards);
      localStorage.setItem('boards', JSON.stringify(newBoards));
      return newBoards;
    }
   
    function handleOnDragEnd(result: DropResult) {
  
      if (!result.destination) {
        return;
      }
      if (result.destination.index === result.source.index) {
        return;
      } else {
        
      const newBoard = reorder(
        boards,
        result.source.index,
        result.destination.index
      );
      setBoards(newBoard);
    }
  }

 //modal

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
     setShowModal(true);
  };

  const handleHide = () => {
    setShowModal(false);
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
            <Title title={t('question_delete_board')}/>
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
                  handleDeleteBoard(props.id);
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
                    <Tooltip title={t("delete_board")}>
                      <DeleteIcon  className='delete-board' id={board.id} onClick={() => handleShow()}/>
                     </Tooltip>
                    <Tooltip title={t('edit_title')}>
                      <EditIcon onClick={() => handleEditBoard(board.id, board.title, board.description)}/>
                    </Tooltip>
                  </CardActions>
                </Card>
                {showModal? <AddModal showModal={showModal} toHide={true} id={board.id} title = {t('question_delete_board').concat(" ", board.title)}/>: null}
            </div>
            
              )}
              </Draggable>              
            )}
          <AddBoard formOpen={false} toHide={false} />
          
          {provided.placeholder}
          </>
        </div>
        </>
        )}      
        </Droppable>
      </DragDropContext>
    </div>
  );
}


