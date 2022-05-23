import AddColumn from '../Column/AddColumn';
import { useAppSelector } from '../../store/hooks';
import { Button} from "@mui/material";
import { useDispatch } from 'react-redux';
import { clear_board, ColumnProps, update_board } from '../../store/reducers/boardSlice';
import EditField from './EditField';
import { createBoard, deleteBoard, updateBoard } from '../../services/apiBoardProvider';
import { Column } from '../Column/Column';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../App';

export default function CreateBoard() {
  const columns = useAppSelector((state) => state.board.columns);
  const board = useAppSelector((state) => state.board);

  const [state, setState] = useState({
		isBoardSaved: false,
	});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleBoardSave() {
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
    
    dispatch(update_board({
      ...body,
      id: boardId,
    }));

    setState({
			...state,
			isBoardSaved: true,
		});

    alert(`The board was saved.`);
  }

  async function handleDeleteBoard() {
    const boardId = board.id;
    alert(`The board will not be saved`);
    await deleteBoard(boardId);
    dispatch(clear_board());
    navigate(`/${baseUrl}/boards`);
  }

  return (
    <div className="main">
      <h1 className="page-title">Create board</h1>
      <div className="add-section">
        <EditField formOpen={true} placeholder="Enter title" type="title" field={board.title} />
        <EditField formOpen={true} placeholder="Enter description" type="description" field={board.description} />
      </div>

      {state.isBoardSaved ? (
        <div className="column-container">
          {(columns != undefined) ? columns.map((column: ColumnProps) => <Column id={column.id} key={column.id} title={column.title} tasks={[
            { id: "01r",
              title: "Your sample task",
              description: "Visualise your elephant",
              done: false,
            },      
          ]} />): null }
          <AddColumn type="Add new column" />
        </div>
      ) : null }
      <div className="save-cancel-section">
        <Button style={{ marginRight: 20, minWidth: 100, backgroundColor: "lightgrey", color: "midnightblue"}} onClick={handleDeleteBoard}>Cancel</Button>
        <Button style={{ minWidth: 100, backgroundColor: "midnightblue", color: "white"}} onClick={handleBoardSave}>Save</Button>
      </div>
    </div>
  )
}
