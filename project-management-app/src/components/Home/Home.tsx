import { connect } from 'react-redux';
import { ListProps, ListsProps } from '../../reducers/listReducer';
import { BoardColumn } from '../Board/BoardColumn';

type TitleProps = {
  title: string;
  children?: string;
};

export const Title = ({ title = '' }: TitleProps) => <h1>{title}</h1>;

export function Home(props: ListsProps) {  
  const lists = props.lists;
  console.dir(lists);
  return (
    <div className="main">
      <Title title="Your boards" />
      { lists.map((list: ListProps) => <BoardColumn title={list.title} tasks={list.tasks} />)}
    </div>
  );
}

// const mapStateToProps = (state: { lists: ListProps[]; }) => ( {
//   lists: state.lists,
// });

// export default connect(mapStateToProps)(Home);