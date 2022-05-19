import AddColumnButton from '../Column/AddColumnButton';
import { useAppSelector } from '../../store/hooks';
import { Button} from "@mui/material";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clear_board } from '../../store/reducers/boardSlice';
import EditField from './EditField';
import { createBoard } from '../../services/apiBoardProvider';

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

  return (
    <div className="main">
      <h1>Create a new board</h1>
      <div className="add-section">
        <EditField formOpen={true} buttonName="Title" placeholder="Enter title" type="title" field="" />
        <EditField formOpen={true} buttonName="Description" placeholder="Enter description" type="description" field="" />
      </div>
      <div className="column-container">
        {/* {columns.map((column: ColumnProps) => <Column id="01" key={column.id} title={column.title} tasks={[
          { id: "01r",
            title: "Your sample task",
            description: "Visualise your elephant",
            done: false,
          },      
        ]} />)} */}
        <AddColumnButton type="Add new column" />
      </div>
      <Button onClick={handleBoardComplete}>Complete</Button>      
    </div>
  )
}
