import AddColumn from '../Column/AddColumn';
import { Column } from '../Column/Column';
import { useAppSelector } from '../../store/hooks';
import { ColumnProps } from '../../store/reducers/columnsSlice';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clear_board, update_board } from '../../store/reducers/boardSlice';
import { EditField } from './EditField';
import { createBoard, deleteBoard, updateBoard } from '../../services/apiBoardProvider';
import { baseUrl } from '../../App';

export default function EditBoard() {
  const board = useAppSelector((state) => state.board);
  const columns = useAppSelector((state) => state.board.columns);
  console.dir(columns);
  console.log(`board title is ${board.title}`);
  console.log(`board description is ${board.description}`);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const boardId = board.id;

  async function handleBoardSave() {
    // dispatch(clear_board());
    const body = {
      title: board.title,
      description: board.description,
    }
    const boardApi = await updateBoard(boardId, body);
    console.dir(boardApi);   
  }

  async function handleBoardSave2() {
    let body = {
      title: board.title,
      description: board.description,
    }
    let boardApi;
    let boardId;
    if (board.id === '') {
      boardApi = await createBoard(body);
      boardId = boardApi.id;
    } else {
      boardId = board.id;
      boardApi = await updateBoard(boardId, body);
    }
    // const boardApi = await createBoard(body);
    
    dispatch(update_board({
      ...body,
      id: boardId,
    }));

    // setState({
		// 	...state,
		// 	isBoardSaved: true,
		// });
    
    dispatch(clear_board());

    alert(`The board was saved.`);
  }

  async function handleDeleteBoard() {    
    alert(`The board will be deleted`);
    await deleteBoard(boardId);
    dispatch(clear_board());
    navigate(`/${baseUrl}/boards`);
  }

  return (
    <div className="main">
      <h1 className="page-title">Edit the board</h1>
      <EditField buttonName="Update" placeholder="Enter new title" type="title" field={board.title} category="board"/>
      <EditField buttonName="Update" placeholder="Enter new description" type="description" field={board.description} category="board"/>
      <div className="column-container">
        {(columns !== undefined) ? columns.map((column: ColumnProps) => <Column key={column.id} id={column.id} title={column.title} tasks={[
            { id: "01r",
              title: "Your sample task",
              description: "Visualise your elephant",
              done: false,
            },      
          ]} />
        ) : null }
        <AddColumn type="Add new column" />
      </div>
      <div className="save-cancel-section">
        <Button style={{ marginRight: 20, minWidth: 100, backgroundColor: "lightgrey", color: "midnightblue"}} onClick={handleDeleteBoard}>Delete board</Button>
        <Button style={{ minWidth: 100, backgroundColor: "midnightblue", color: "white"}} onClick={handleBoardSave2}>Save board</Button>
      </div>
    </div>
  )
}
