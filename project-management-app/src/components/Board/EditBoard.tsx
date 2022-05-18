import React, { useState } from 'react';
import AddColumnButton from '../Column/AddColumnButton';
import { Column } from '../Column/Column';
import { useAppSelector } from '../../store/hooks';
import { ColumnProps } from '../../store/reducers/columnsSlice';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clear_board } from '../../store/reducers/boardSlice';
import { EditField } from './EditField';

export default function EditBoard() {
  const columns = useAppSelector((state) => state.columns);
  const board = useAppSelector((state) => state.board);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleBoardComplete() {
    dispatch(clear_board());
    navigate('/boards');    
  }

  const [state, setState] = useState({
    toHide: true,
    // id: "",
		// title: "",
    // description: "",
	});

  return (
    <div className="main">
      <h1>Edit the board</h1>
      <EditField buttonName="Update" placeholder="Enter new title" type="title" field={board.title} />
      <EditField buttonName="Update" placeholder="Enter new description" type="description" field={board.description} />
      <div className="column-container">
        {columns.map((column: ColumnProps) => <Column id="02" key={column.id} title={column.title} tasks={[
            // { id: "01r",
            //   title: "Your sample task",
            //   description: "Visualise your elephant",
            //   done: false,
            // },      
          ]} />
        )}
        <AddColumnButton type="Add new column" />
      </div>
      <Button onClick={handleBoardComplete}>Complete</Button>        
    </div>
  )
}
