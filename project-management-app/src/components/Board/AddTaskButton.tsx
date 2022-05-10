import Icon from '@mui/material/Icon';
import React from 'react';

interface AddButtonProps {
  type: string,
}

// interface ListProps {
//   id: number, 
//   title: string
// }

export class AddButton extends React.Component<AddButtonProps> {
  
  render() {
    const { type } = this.props;

    return (
      <div className="add-button">
        <Icon>add</Icon>
        <p>{type}</p>
      </div>
    );
  }
}
