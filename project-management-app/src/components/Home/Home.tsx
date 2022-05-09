import React from 'react';
import { connect } from 'react-redux';
import { ListProps, ListsProps } from '../../reducers/listReducer';
import { AppDispatch, RootState } from '../../store/store';
import { BoardColumn } from '../Board/BoardColumn';
import { BoardPreviewCard } from './BoardPreviewCard';

type TitleProps = {
  title: string;
  children?: string;
};

export const Title = ({ title = '' }: TitleProps) => <h1>{title}</h1>;

export function Home (props: ListsProps) {  
  const lists = props.lists;
  console.dir(lists);
  return (
    <div className="main">
      <Title title="Your boards" />
      { lists.map((list: ListProps) => <BoardPreviewCard title={list.title} noOfTasks={list.tasks.length} />)}
    </div>
  );
}

const mapStateToProps = (state: RootState ) => ({
  lists: state.rootReducer.lists,
});

// export default connect(mapStateToProps)(Home);