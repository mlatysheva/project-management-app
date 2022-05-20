import AddColumn from '../Column/AddColumn';
import { useAppSelector } from '../../store/hooks';
import { Button} from "@mui/material";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clear_board } from '../../store/reducers/boardSlice';
import EditField from './EditField';
import { createBoard } from '../../services/apiBoardProvider';
import { ColumnProps } from '../../store/reducers/columnsSlice';
import { Column } from '../Column/Column';

export default function CreateBoard() {
  const columns = useAppSelector((state) => state.columns);
  const board = useAppSelector((state) => state.board);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleBoardComplete() {
    dispatch(clear_board());
    navigate('/boards');
    const body = {
      title: board.title,
      description: board.description,
    }
    const boardApi = await createBoard(body);
    console.dir(boardApi);   
  }  
  console.dir(columns);
  return (
    <div className="main">
      <h1>Create a new board</h1>
      <div className="add-section">
        <EditField formOpen={true} buttonName="set" placeholder="Enter title" type="title" field="" category="board" />
        <EditField formOpen={true} buttonName="set" placeholder="Enter description" type="description" field="" category="board" />
      </div>
      <Button style={{marginTop: 40}} onClick={handleBoardComplete}>Save</Button>
      <div className="column-container">
        {columns.map((column: ColumnProps) => <Column id={column.id} key={column.id} title={column.title} tasks={[
          { id: "01r",
            title: "Your sample task",
            description: "Visualise your elephant",
            done: false,
          },      
        ]} />)}
        <AddColumn type="Add new column" />
      </div>
    </div>
  )
}
