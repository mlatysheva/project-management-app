import { AllBoardsProps } from '../../store/reducers/allBoardsReducer';
import { BoardProps } from '../../store/reducers/boardReducer';
import { RootState } from '../../store/store';
import { AddButton } from '../Board/AddButton';
import { BoardPreviewCard } from './BoardPreviewCard';

type TitleProps = {
  title: string;
  children?: string;
};

export function Title({ title = '' }: TitleProps) {
  return <h1>{title}</h1>
}

export function Boards(props: AllBoardsProps) {
  const {boards} = props;
  console.dir(props);
  return (
    <div className="main">
      <Title title="Your boards" />
      <div className="lists-container">
        {boards.map((board: BoardProps) => <BoardPreviewCard key={board.id} title={board.title} description={board.description} />)}
        <AddButton type="Add new board" />
      </div>
    </div>
  );
}

