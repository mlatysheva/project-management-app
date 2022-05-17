import { AllBoardsProps, delete_board, get_allBoards } from '../../store/reducers/boardsSlice';
import { BoardProps } from '../../store/reducers/boardSlice';
import AddBoardButton from '../Board/AddBoardButton';
import { BoardPreviewCard } from './BoardPreviewCard';
import { deleteBoard, getAllBoards } from '../../services/apiBoardProvider';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom';
import { Description } from '@mui/icons-material';

type TitleProps = {
  title: string;
  children?: string;
};

export function Title({ title = '' }: TitleProps) {
  return <h1>{title}</h1>
}

// export async function getBoards() {
//   return await getAllBoards();
// }

export function Boards() {
  const dispatch = useDispatch();
  let boards = useAppSelector((state) => state.boards);
  let boardId = '';

  useEffect(() => {
    const fetchData = async () => {
      boards = await getAllBoards();
      console.dir(boards);
      dispatch(get_allBoards(boards));
    }
    fetchData()
      .catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      boards = await deleteBoard(boardId);
      dispatch(delete_board(boardId));
    }
    fetchData()
      .catch(console.error);
  }, []);

  if (boards == undefined ) {
    boards = [{id: '02', title: 'Your sample board', description: 'Your sample description'}]
  }

  function handleDeleteBoard(id: string) {
    alert(`The board with id: ${id} will be removed!`);
  }

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

  const navigate = useNavigate();

  return (
    <div className="main">
      <Title title="Your boards" />
      <div className="boards-container">
        {boards.map((board: BoardProps) => 
        // <BoardPreviewCard key={board.id} id={board.id} title={board.title} description={board.description} />
          <div style={styles.container}>
            <h2 onClick={() => navigate('/editboard')}>{board.title}</h2>
            <Card className="card" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" onClick={() => navigate('/editboard')}>
                  {board.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Tooltip title="Delete board">
                  <DeleteIcon onClick={() => handleDeleteBoard(board.id)}/>
                </Tooltip>
              </CardActions>
            </Card>
          </div>
          )}
        <AddBoardButton />
      </div>
    </div>
  );
}

