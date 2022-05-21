import AddColumn from '../Column/AddColumn';
import { Column } from '../Column/Column';
import { useAppSelector } from '../../store/hooks';
import { ColumnProps } from '../../store/reducers/columnsSlice';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clear_board } from '../../store/reducers/boardSlice';
import { EditField } from './EditField';
import { deleteBoard, updateBoard } from '../../services/apiBoardProvider';
import { baseUrl } from '../../App';

export default function EditBoard() {
  const columns = useAppSelector((state) => state.board.columns);
  const board = useAppSelector((state) => state.board);
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
        {(columns != undefined) ? columns.map((column: ColumnProps) => <Column key={column.id} id={column.id} title={column.title} tasks={[
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
        <Button style={{ minWidth: 100, backgroundColor: "midnightblue", color: "white"}} onClick={handleBoardSave}>Save board</Button>
      </div>
    </div>
  )
}
