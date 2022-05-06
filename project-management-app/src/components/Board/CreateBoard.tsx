import React from 'react';
import { BoardColumn } from './BoardColumn';

export default function CreateBoard() {
  return (
    <div className="main">
      <h1>Adding a new board</h1>
      <div className="column-container">
        <BoardColumn title="To do"/>
        <BoardColumn title="Doing"/>
        <BoardColumn title="Done"/>
      </div>        
    </div>
  )
}