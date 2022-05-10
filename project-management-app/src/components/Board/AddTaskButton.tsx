import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import React, { useState } from 'react';
import TextArea from 'react-textarea-autosize';

interface AddButtonProps {
  type: string,
}

export function AddButton (props:AddButtonProps) {
  const [state, setState] = useState({
    formOpen: false,
  });

  function openForm () {
    setState({
      formOpen: true,
    })
  }

  function closeForm() {
    setState({
      formOpen: false,
    })
  }
  
  function renderButton () {
    const { type } = props;
    const buttonTextOpasity = (type == "Add new task") ? 1 : 0.5;
    const buttonTextColor = (type == "Add new task") ? "white" : "inherit";
    const buttonBackground = (type == "Add new task") ? "inherit" : "ligthgrey";
    return (
      <div className="add-button" style={{
          opacity: buttonTextOpasity, 
          color: buttonTextColor, 
          backgroundColor: buttonBackground
        }}
        onClick={openForm}
      >
      <Icon>add</Icon>
      <p>{type}</p>
      </div>
    )  
  }

  function renderForm () {
    const { type } = props;
    const placeholder = (type === "Add new task") ? "Enter the title of the task" : ((type === "Add new board") ? "Enter the title of the board" : "Enter the title of the column");
    const buttonTitle = (type === "Add new task") ? "Add task" : ((type === "Add new board") ? "Add board" : "Add column");

    return (
      <div>
        <Card>
          <TextArea 
            placeholder={placeholder}
            autoFocus
            onBlur={closeForm}
          />
        </Card>
      </div>
    )
  }
     
  return state.formOpen ? renderForm() : renderButton();
}
