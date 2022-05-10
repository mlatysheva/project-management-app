import Icon from '@mui/material/Icon';
import React from 'react';

interface AddButtonProps {
  type: string,
}

export class AddButton extends React.Component<AddButtonProps> {
  
  render() {
    const { type } = this.props;
    const buttonTextOpasity = (type == "Add new task") ? 1 : 0.5;
    const buttonTextColor = (type == "Add new task") ? "white" : "inherit";
    const buttonBackground = (type == "Add new task") ? "inherit" : "ligthgrey";
    return (
      <div className="add-button" style={{
        opacity: buttonTextOpasity, 
        color: buttonTextColor, 
        backgroundColor: buttonBackground
      }}>
        <Icon>add</Icon>
        <p>{type}</p>
      </div>
    );
  }
}
