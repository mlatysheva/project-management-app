import { delete_board, get_allBoards } from '../../store/reducers/boardsSlice';
import { BoardProps, set_board } from '../../store/reducers/boardSlice';
import AddBoardButton from '../Board/AddBoardButton';
import { deleteBoard, getAllBoards } from '../../services/apiBoardProvider';
import { useEffect } from 'react';
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

type TitleProps = {
  title: string;
  children?: string;
};

export function Title({ title = '' }: TitleProps) {
  return <h1>{title}</h1>
}

export function Boards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const styles = {
    container: {
      width: 300,
      margin: 10,
      color: "black",
      backgroundColor: "skyblue",
      borderRadius: 3,
      padding: 8,
    }
  };

  let boards = useAppSelector((state) => state.boards);

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
      <div className="boards-container">
        {boards.map((board: BoardProps) => 
          <div style={styles.container} key={board.id}>
            <h2 onClick={() => handleEditBoard(board.id, board.title, board.description)}>{board.title}</h2>
            <Card className="card" sx={{ minWidth: 275 }}>
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
        <AddBoardButton formOpen={false} toHide={false} />
      </div>
    </div>
  );
}

