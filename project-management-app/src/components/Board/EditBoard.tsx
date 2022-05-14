import React from 'react';
import AddColumnButton from '../Column/AddColumnButton';
import { Column } from '../Column/Column';
import { useAppSelector } from '../../store/hooks';
import { ColumnProps } from '../../store/reducers/columnsSlice';

export default function EditBoard() {
  const columns = useAppSelector((state) => state.columns);
  
  return (
    <div className="main">
      <h1>Edit the board</h1>
      <div className="column-container">
        {columns.map((column: ColumnProps) => <Column key={column.id} title={column.title} tasks={[
          { id: "01r",
            title: "Your sample task",
            description: "Visualise your elephant",
            done: false,
          },      
        ]} />)}
        <AddColumnButton type="Add new column" />
      </div>        
    </div>
  )
}
