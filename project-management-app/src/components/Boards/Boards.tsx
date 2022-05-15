import { AllBoardsProps } from '../../store/reducers/boardsSlice';
import { BoardProps } from '../../store/reducers/boardSlice';
import AddBoardButton from '../Board/AddBoardButton';
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

  return (
    <div className="main">
      <Title title="Your boards" />
      <div className="lists-container">
        {boards.map((board: BoardProps) => <BoardPreviewCard key={board.id} title={board.title} description={board.description} />)}
        <AddBoardButton type="Add new board" />
      </div>
    </div>
  );
}

