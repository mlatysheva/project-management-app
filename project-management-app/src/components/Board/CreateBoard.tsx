import AddColumnButton from '../Column/AddColumnButton';
import { useAppSelector } from '../../store/hooks';
import { ColumnProps } from '../../store/reducers/columnsSlice';
import { Column } from '../Column/Column';
import { Button} from "@mui/material";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddBoardButton from './AddBoardButton';
import { useNavigate } from 'react-router-dom';
import { clear_board } from '../../store/reducers/boardSlice';

export default function CreateBoard() {
  const columns = useAppSelector((state) => state.columns);
  const board = useAppSelector((state) => state.board);

  const [state, setState] = useState({
    toHide: true,
    id: "",
		title: "",
    description: "",
	});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function TitleDescription() {
    return state.toHide ? (
      <div className='title-description-wrapper'>
        <h2>Title: {board.title}</h2>
        <h2>Description: {board.description}</h2>        
      </div>
    ) : null;
  }

  function handleBoardComplete() {
    dispatch(clear_board());
    navigate('/boards');    
  }
  
  return (
    <div className="main">
      <h1>Create a new board</h1>
      <div className="add-section">
      ` <TitleDescription />
        <AddBoardButton formOpen={true} toHide={true}/>
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
