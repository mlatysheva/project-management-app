import React from 'react';
import { AddButton } from './AddTaskButton';
import { BoardColumn } from './BoardColumn';

export default function CreateBoard() {
  return (
    <div className="main">
      <h1>Add a new board</h1>
      <div className="column-container">
        <BoardColumn title="To do" tasks={[
          {
            title: "Marketing research",
            description: "Identify TA, set up goals",
            responsible: "Zhanna",
          },
          {
            title: "Task allocation",
            description: "Assign tasks to the team",
            responsible: "Angela",
          }      
        ]} />
          <BoardColumn title="Doing" tasks={[
          {
            title: "Initial setup",
            description: "Set up site structure, webpack",
            responsible: "Ivan",
          },
          {
            title: "Kick-off meeting",
            description: "Conduct meeting to assign tasks",
            responsible: "Olga",
          }      
        ]} />
          <BoardColumn title="Done" tasks={[
          {
            title: "Deploy backend",
            description: "Clone repo, deploy to Heroku, set up Swagger",
            responsible: "Oleg",
          },
          {
            title: "Set up API requests",
            description: "Set up API requests for create, update, delete user",
            responsible: "Olga",
          }      
        ]} />
        <AddButton type="Add new column" />
      </div>        
    </div>
  )
}