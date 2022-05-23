import AddColumn from '../Column/AddColumn';
import { Column } from '../Column/Column';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { clear_board, ColumnProps, update_board } from '../../store/reducers/boardSlice';
import { EditField } from './EditField';
import { createBoard, deleteBoard, updateBoard } from '../../services/apiBoardProvider';
import { baseUrl } from '../../App';

export default function EditBoard() {
  const board = useAppSelector((state) => state.board);
  const columns = useAppSelector((state) => state.board.columns);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const boardId = board.id;

  async function handleBoardSave() {
    let body = {
      title: board.title,
      description: board.description,
    }
    let boardApi;
    let boardId;
    if (board.id === '') {
      boardApi = await createBoard(body);
      boardId = boardApi.id;
    } else {
      boardId = board.id;
      boardApi = await updateBoard(boardId, body);
    }
    
    dispatch(update_board({
      ...body,
      id: boardId,
    }));

    alert(`The board was saved.`);
    navigate(`/${baseUrl}/boards`);
  }

  async function handleDeleteBoard() {    
    alert(`The board will be deleted`);
    await deleteBoard(boardId);
    dispatch(clear_board());
    navigate(`/${baseUrl}/boards`);
  }
  const { t } = useTranslation();

  return (
    <div className="main">
      <h1 className="page-title">Edit the board</h1>
      <EditField placeholder="Enter new title" type="title" field={board.title} category="edit"/>
      <EditField placeholder="Enter new description" type="description" field={board.description} category="edit"/>
      <div className="column-container">
        {(columns !== undefined) ? columns.map((column: ColumnProps) => <Column key={column.id} id={column.id} title={column.title} tasks={[
            { id: "01r",
              title:t('title_task'),
              description:t('description_task'),
              done: false,
            },      
          ]} />
        ) : null }
        <AddColumn type="Add new column" />
      </div>
      <div className="save-cancel-section">
        <Button style={{ marginRight: 20, minWidth: 100, backgroundColor: "lightgrey", color: "midnightblue"}} onClick={handleDeleteBoard}>Delete board</Button>
        <Button style={{ minWidth: 100, backgroundColor: "midnightblue", color: "white"}} onClick={handleBoardSave}>Save board</Button>
      </div>
    </div>
  )
}
