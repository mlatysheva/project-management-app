import AddColumn from '../Column/AddColumn';
import { useAppSelector } from '../../store/hooks';
import { Button} from "@mui/material";
import { useDispatch } from 'react-redux';
import { clear_board, ColumnProps, update_board } from '../../store/reducers/boardSlice';
import EditField from './EditField';
import { createBoard, deleteBoard, updateBoard } from '../../services/apiBoardProvider';
import { Column } from '../Column/Column';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation} from 'react-i18next';
import { baseUrl } from '../../App';

export default function CreateBoard() {
  const columns = useAppSelector((state) => state.board.columns);
  const board = useAppSelector((state) => state.board);
  const { t } = useTranslation();

  const [state, setState] = useState({
		isBoardSaved: false,
	});

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    setState({
			...state,
			isBoardSaved: true,
		});

    alert(`The board was saved.`);
  }

  async function handleDeleteBoard() {
    const boardId = board.id;
    alert(`The board will not be saved`);
    await deleteBoard(boardId);
    dispatch(clear_board());
    navigate(`/${baseUrl}/boards`);
  }

  return (
    <div className="main">
      <h1 className="page-title">{t('create_title')}</h1>
      <div className="add-section">
        <EditField formOpen={true} placeholder={t('placeholder_title')} type="title" field={board.title} category="create" />
        <EditField formOpen={true} placeholder={t('placeholder_description')} type="description" field={board.description} category="create" />
      </div>

      {state.isBoardSaved ? (
        <div className="column-container">
          {(columns !== undefined) ? columns.map((column: ColumnProps) => <Column id={column.id} key={column.id} title={column.title} order={column.order} tasks={[
            { id: "01r",
              title: t('title_task'),
              description: t('description_task'),
              done: false,
            },      
          ]} />): null }
          <AddColumn type={t("add_column")} />
        </div>
      ) : null }
      <div className="save-cancel-section">
        <Button style={{ marginRight: 20, minWidth: 100, backgroundColor: "lightgrey", color: "midnightblue"}} onClick={handleDeleteBoard}>{t('cancel')}</Button>
        <Button style={{ minWidth: 100, backgroundColor: "midnightblue", color: "white"}} onClick={handleBoardSave}>{t('save')}</Button>
      </div>
    </div>
  )
}