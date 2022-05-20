import AddColumn from '../Column/AddColumn';
import { Column } from '../Column/Column';
import { useAppSelector } from '../../store/hooks';
import { ColumnProps } from '../../store/reducers/columnsSlice';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clear_board } from '../../store/reducers/boardSlice';
import { EditField } from './EditField';
import { updateBoard } from '../../services/apiBoardProvider';

export default function EditBoard() {
  const columns = useAppSelector((state) => state.columns);
  const board = useAppSelector((state) => state.board);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleBoardSave() {
    dispatch(clear_board());
    const boardId = board.id;
    const body = {
      title: board.title,
      description: board.description,
    }
    const boardApi = await updateBoard(boardId, body);
    console.dir(boardApi);   
  }

  return (
    <div className="main">
      <h1>Edit the board</h1>
      <EditField buttonName="Update" placeholder="Enter new title" type="title" field={board.title} category="board"/>
      <EditField buttonName="Update" placeholder="Enter new description" type="description" field={board.description} category="board"/>
      <div className="column-container">
        {columns.map((column: ColumnProps) => <Column key={column.id} id={column.id} title={column.title} tasks={[
            // { id: "01r",
            //   title: "Your sample task",
            //   description: "Visualise your elephant",
            //   done: false,
            // },      
          ]} />
        )}
        <AddColumn type="Add new column" />
      </div>
      <Button style={{marginTop: 40}} onClick={handleBoardSave}>Save</Button>
    </div>
  )
}
