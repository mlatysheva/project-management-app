import { delete_board, get_allBoards } from '../../store/reducers/boardsSlice';
import { BoardProps, set_board } from '../../store/reducers/boardSlice';
import AddBoard from '../Board/AddBoard';
import { deleteBoard, getAllBoards } from '../../services/apiBoardProvider';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import './Board.scss';

type TitleProps = {
  title: string;
  children?: string;
};

export function Title({ title = '' }: TitleProps) {
  return <h1 className="page-title">{title}</h1>
}

export function Boards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let boards = useAppSelector((state) => state.boards);
  
  const [board, setBoards] = useState([]);

  function handleOnDragEnd(result: DropResult, provided: ResponderProvided) {
    console.log(result);
    if (!result.destination) return;
    const items = Array.from(board);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBoards(items);
  }

  useEffect(() => {
    const fetchData = async () => {
      boards = await getAllBoards();
      if (boards.length === 0 ) {
        boards = [{id: '02', title: 'Your sample board', description: 'Your sample description'}];
      }
      dispatch(get_allBoards(boards));      
    }
    fetchData()
      .catch(console.error);
  }, []);

  async function handleDeleteBoard(boardId: string) {
    alert(`The board with id: ${boardId} will be removed!`);
    dispatch(delete_board(boardId));
    await deleteBoard(boardId);
  }

  async function handleEditBoard(boardId: string, title: string, description: string) {
    alert(`Do you want to edit the board with id: ${boardId}?`);
    navigate('/editboard');
    dispatch(set_board({
      id: boardId,
      title: title,
      description: description,
    }));
  }

  return (    
    <div className="main">
      <Title title="Your boards" />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
        {(provided) => (
          <div className="boards-container"  id="droppable" {...provided.droppableProps} ref={provided.innerRef}>
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
                  <DeleteIcon onClick={() => handleDeleteBoard(board.id)}/>
                </Tooltip>
                <Tooltip title="Edit board">
                  <EditIcon onClick={() => handleEditBoard(board.id, board.title, board.description)}/>
                </Tooltip>
              </CardActions>
              </Card>
          </div>
            )}
            </Draggable>
          )}
        <AddBoard formOpen={false} toHide={false} />
        {provided.placeholder}
      </div>
      )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
