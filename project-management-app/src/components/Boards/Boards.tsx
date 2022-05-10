import React from 'react';
import { connect } from 'react-redux';
import { ListProps, ListsProps } from '../../reducers/listReducer';
import { RootState } from '../../store/store';
import { AddButton } from '../Board/AddTaskButton';
import { BoardPreviewCard } from './BoardPreviewCard';

type TitleProps = {
  title: string;
  children?: string;
};

export function Title({ title = '' }: TitleProps) {
  return <h1>{title}</h1>
}

export function Boards(props: ListsProps) {
  const {lists} = props;
  console.dir(lists);
  return (
    <div className="main">
      <Title title="Your boards" />
      <div className="lists-container">
        { lists.map((list: ListProps) => <BoardPreviewCard key={list.id} title={list.title} noOfTasks={list.tasks.length} />)}
        <AddButton type="Add new board" />
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState ) => ({
  lists: state.rootReducer.lists,
});

// export default connect(mapStateToProps)(Boards);
