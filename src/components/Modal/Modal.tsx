import React,  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../App";
import { deleteBoard } from "../../services/apiBoardProvider";
import { useAppDispatch } from "../../store/hooks";
import { remove_editedBoard } from "../../store/reducers/appSlice";
import { clear_board } from "../../store/reducers/boardSlice";
import { delete_board } from "../../store/reducers/boardsSlice";



export function AddModal(props: {showModal: boolean, toHide: boolean, id: string, title: string}) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  
  const handleHide = () => {
    const modal = document.querySelector('.modal');
    modal?.classList.add('hidden');
    setShowModal(false);
  };

  async function handleDeleteBoard(boardId: string) {
    // dispatch(delete_board(boardId));
    // dispatch(remove_editedBoard());
    // await deleteBoard(boardId);
    if (boardId) {
      await deleteBoard(boardId);
    }
    dispatch(clear_board());
    navigate(`/${baseUrl}/boards`);
  }
  
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
                handleDeleteBoard(props.id);
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
