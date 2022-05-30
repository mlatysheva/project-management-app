import AddColumn from '../Column/AddColumn';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Button} from "@mui/material";
import { clear_board, ColumnProps, set_board, update_board } from '../../store/reducers/boardSlice';
import EditField from './EditField';
import { createBoard, deleteBoard, getBoard, updateBoard } from '../../services/apiBoardProvider';
import { Column } from '../Column/Column';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation} from 'react-i18next';
import { baseUrl } from '../../App';
import { AddModalInfo } from '../Modal/Modal';
import '../Boards/Board.scss';

export default function CreateBoard() {
  const columns = useAppSelector((state) => state.board.columns);
  const board = useAppSelector((state) => state.board);
  const task = useAppSelector((state) => state.task);
  
  const { t } = useTranslation();
  const [state, setState] = useState({
		isBoardSaved: false,
	});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleHide = () => {
    setShowInfo(false);
    setShowModal(false);
    setShowAlert(false);
    };
  const handleShow = () => {
    setShowModal(true);
    };

    const handleShowInfo = () => {
      setShowInfo(true);
    };
    const handleAlert = () => {
      setShowAlert(true);
    };

  
  let taskId = task.id;

  useEffect(() => {
    async function getBoardFromServer(id: string) {
      const response = await getBoard(id);
      dispatch(set_board({
        id: response.id,
        title: response.title,
        description: response.description,
        columns: response.columns,
      }));
    }
    if (board.id !== '') {
      getBoardFromServer(board.id); 
    }   
  }, [board.id, dispatch, taskId]);

  async function handleBoardSave() {
    let body = {
      title: board.title,
      description: board.description,
    }
    if (body.title && body.description) {
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
     
      handleHide();
      setState({
        ...state,
        isBoardSaved: true,
      });
    } else {
      handleAlert();
     
    }
    if (state.isBoardSaved) {
      
      navigate(`/${baseUrl}/boards`);
    }
  }

  async function handleDeleteBoard() {
    await deleteBoard(board.id);
    dispatch(clear_board());
    navigate(`/${baseUrl}/boards`);
  }

  return (
    <div className="main" id="modal-root">
      <h1 className="page-title">{t('create_title')}</h1>
      <div className="add-section">
        <EditField formOpen={true} placeholder={t('placeholder_title')} type="title" field={board.title} category="board" />
        <EditField formOpen={true} placeholder={t('placeholder_description')} type="description" field={board.description} category="board" />
      </div>

      {state.isBoardSaved ? (
        <div className="column-container">
          {(columns !== undefined) ? columns.map((column: ColumnProps) => <Column id={column.id} key={column.id} title={column.title} order={column.order} tasks={column.tasks || []} />): null }
          <AddColumn />
        </div>
      ) : null }
      <div className="save-cancel-section">
        <Button style={{ marginRight: 20, minWidth: 100, backgroundColor: "lightgrey", color: "midnightblue"}} onClick={handleShow}>{t('cancel')}</Button>
        <Button style={{ minWidth: 100, backgroundColor: "midnightblue", color: "white"}} onClick={handleShowInfo}>{t('save')}</Button>
        {showInfo? <AddModalInfo showInfo={showInfo} toHide={true} id={board.id} title = {t("board_will_be_saved").concat(" ", board.title)} function= {() => {handleBoardSave()}} style={{display:'block'}} />: null}
        {showModal? <AddModalInfo showInfo={showModal} toHide={true} id={board.id} title = {t("board_will_not_be_saved").concat(" ", board.title)} function= {() => {handleDeleteBoard()}} style={{display:'block'}} />: null}
        {showAlert? <AddModalInfo showInfo={showInfo} toHide={true} id={board.id} title = {t('alert')} function= {() => {handleHide()}} style={{display:'block'}} />: null}
      </div>
    </div>
  )
}
