import React from 'react';
import { AddButton } from './AddButton';
import { BoardColumn } from './BoardColumn';

export default function CreateBoard() {
  return (
    <div className="main">
      <h1>Create a board</h1>
      <div className="column-container">
        <BoardColumn title="To do" tasks={[
          { id: "01r",
            title: "Marketing research",
            description: "Identify TA, set up goals",
            done: false,
          },
          {
            id: "02r",
            title: "Task allocation",
            description: "Assign tasks to the team",
            done: false,
          }      
        ]} />
          <BoardColumn title="Doing" tasks={[
          {
            id: "03r",
            title: "Initial setup",
            description: "Set up site structure, webpack",
            done: false,
          },
          {
            id: "04r",
            title: "Kick-off meeting",
            description: "Conduct meeting to assign tasks",
            done: false,
          }      
        ]} />
          <BoardColumn title="Done" tasks={[
          {
            id: "05r",
            title: "Deploy backend",
            description: "Clone repo, deploy to Heroku, set up Swagger",
            done: false,
          },
          {
            id: "06r",
            title: "Set up API requests",
            description: "Set up API requests for create, update, delete user",
            done: false,
          }      
        ]} />
        <AddButton type="Add new column" />
      </div>        
    </div>
  )
}