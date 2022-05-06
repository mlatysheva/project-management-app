import React from 'react';
import { TaskCard } from './TaskCard';

interface BoardColumnProps {
  title: string;
}

const styles = {
  container: {
    width: 300,
    margin: 10,
    backgroundColor: "lightgrey",
    borderRadius: 3,
    padding: 8,
  }
}; 

export const BoardColumn = (props: BoardColumnProps) => {
  return (
    <div style={styles.container}>
      <h2>{props.title}</h2>
      <TaskCard />
    </div>
  )
};

