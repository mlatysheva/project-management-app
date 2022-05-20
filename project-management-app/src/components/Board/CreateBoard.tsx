import AddColumn from '../Column/AddColumn';
import { useAppSelector } from '../../store/hooks';
import { Button} from "@mui/material";
import { useDispatch } from 'react-redux';
import { update_board } from '../../store/reducers/boardSlice';
import EditField from './EditField';
import { createBoard } from '../../services/apiBoardProvider';
import { ColumnProps } from '../../store/reducers/columnsSlice';
import { Column } from '../Column/Column';
import { useState } from 'react';

export default function CreateBoard() {
  const columns = useAppSelector((state) => state.board.columns);
  const board = useAppSelector((state) => state.board);

  const [state, setState] = useState({
		isColumnSaved: false,
	});

  const dispatch = useDispatch();

  async function handleBoardSave() {
    let body = {
      title: board.title,
      description: board.description,
    }
    const boardApi = await createBoard(body);
    const boardId = boardApi.id;
    
    dispatch(update_board({
      ...body,
      id: boardId,
    }));
    setState({
			...state,
			isColumnSaved: true,
		});
  }  

  return (
    <div className="main">
      <h1>Create a new board</h1>
      <div className="add-section">
        <EditField formOpen={true} buttonName="set" placeholder="Enter title" type="title" field="" category="board" />
        <EditField formOpen={true} buttonName="set" placeholder="Enter description" type="description" field="" category="board" />
      </div>
      <Button style={{marginTop: 40}} onClick={handleBoardSave}>Create board</Button>

      {state.isColumnSaved ? (
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
    </div>
  )
}
