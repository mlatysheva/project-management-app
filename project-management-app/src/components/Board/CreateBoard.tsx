import React from 'react';
import AddColumnButton from '../Column/AddColumnButton';
import { AddButton } from './AddButton';
import { Column } from '../Column/Column';

export default function CreateBoard() {
  return (
    <div className="main">
      <h1>Create a board</h1>
      <div className="column-container">
        <Column title="Your sample column" tasks={[
          { id: "01r",
            title: "Your sample task",
            description: "Visualise your elephant",
            done: false,
          },      
        ]} />
        <AddColumnButton type="Add new column" />
      </div>        
    </div>
  )
}