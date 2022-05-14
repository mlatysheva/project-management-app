import { AllBoardsProps } from '../../store/reducers/boardsSlice';
import { BoardProps } from '../../store/reducers/boardSlice';
import { RootState } from '../../store/store';
import AddBoardButton from '../Board/AddBoardButton';
import { BoardPreviewCard } from './BoardPreviewCard';
import { useNavigate } from "react-router-dom";

type TitleProps = {
  title: string;
  children?: string;
};

export function Title({ title = '' }: TitleProps) {
  return <h1>{title}</h1>
}

export function Boards(props: AllBoardsProps) {
  const {boards} = props;
  const navigate = useNavigate();

  return (
    <div className="main"
      onClick={() => navigate('/editboard')}
    >
      <Title title="Your boards" />
      <div className="lists-container">
        {boards.map((board: BoardProps) => <BoardPreviewCard key={board.id} title={board.title} description={board.description} />)}
        <AddBoardButton type="Add new board" />
      </div>
    </div>
  );
}

