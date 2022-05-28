import AddColumn from '../Column/AddColumn';
import { Column } from '../Column/Column';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { clear_board, ColumnProps, set_board, update_board } from '../../store/reducers/boardSlice';
import { EditField } from './EditField';
import { deleteBoard, getBoard, updateBoard } from '../../services/apiBoardProvider';
import { baseUrl } from '../../App';
import { useEffect, useState } from 'react';
import '../Boards/Board.scss';

export default function EditBoard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const boardId = useAppSelector((state) => state.app.editedBoardId);
  const { t } = useTranslation();
  const board = useAppSelector((state) => state.board);
  const columns = useAppSelector((state) => state.board.columns);
  const task = useAppSelector((state) => state.task);

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
     setShowModal(true);
  };

  const handleHide = () => {
    setShowModal(false);
  };
  
  function AddModal(props: {showModal: boolean, toHide: boolean, id: string, title: string}) {
    document.body.addEventListener('click', (e) => {
      if (e) {
        if ((e.target as HTMLElement).className === 'delete-board' && (e.target as HTMLElement).id === props.id) {
          handleShow();
        }
      }
    });
    
    function renderModal(): JSX.Element | null {
      return (
        <div className="modal" >
        <section className="modal-main">
          <div className="title-container">
          <h3> {props.title} </h3>
          </div>
          <button
            className="modal-close"
            id={props.id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleHide();
            }}
          >
            ×
          </button>
          <div className="main-container">
            <div className="modal-buttons">
              <button
                className="modal-button"
                id={props.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteBoard();
                  handleHide();
                    
                }}
              >
                DELETE
              </button>
            </div>
          </div>
        </section>
      </div>
      );
    }
   
  
  return  renderModal() ;
  
}

  let taskId = task.id;

  useEffect(() => {
    async function getBoardFromServer(id: string) {
      const response = await getBoard(id);
      dispatch(set_board({
        id: id,
        title: response.title,
        description: response.description,
        columns: response.columns,
      }));
    }
    getBoardFromServer(boardId);    
  }, [boardId, taskId]);
  
  async function handleBoardSave() {
    let body = {
      title: board.title,
      description: board.description,
    }
    await updateBoard(boardId, body);
    
    dispatch(update_board({
      ...body,
      id: boardId,
    }));
    
    alert(`The board was saved.`);
    navigate(`/${baseUrl}/boards`);
  }

  async function handleDeleteBoard() {    
     if (boardId) {
      await deleteBoard(boardId);
    }
    dispatch(clear_board());
    navigate(`/${baseUrl}/boards`);
  }

  return (
    <div className="main" id="modal-root">
      <h1 className="page-title">Edit board</h1>
      <div className="add-section">
        <EditField placeholder="Enter new title" type="title" field={board.title} category="edit"/>
        <EditField placeholder="Enter new description" type="description" field={board.description} category="edit"/>
      </div>
      <div className="column-container">
        {(columns !== undefined) ? columns.map((column: ColumnProps) => <Column key={column.id} id={column.id} title={column.title} order={column.order} tasks={column.tasks || []} />
        ) : null }
        <AddColumn />
      </div>
      <div className="save-cancel-section">
        <Button style={{ marginRight: 20, minWidth: 100, backgroundColor: "lightgrey", color: "midnightblue"}} onClick={handleShow}>Delete board</Button>
        {showModal? <AddModal showModal={showModal} toHide={true} id={board.id} title = {"Do you really want to delete your board?"}/>: null}
        <Button style={{ minWidth: 100, backgroundColor: "midnightblue", color: "white"}} onClick={handleBoardSave}>Save board</Button>
      </div>
    </div>
  )
}
