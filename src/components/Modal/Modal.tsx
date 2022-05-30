import { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../App";
import {useTranslation} from "react-i18next";


export function AddModalInfo(props: {showInfo: boolean, toHide: boolean, title: string, id: string, style: CSSProperties | undefined, function: () => void}, ) {
  
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const {t}=useTranslation();
   
  const handleHide = () => {
    showInfo ? setShowInfo(false) : setShowInfo(true);
    showModal ? setShowModal(false) : setShowModal(true);
    showAlert ? setShowAlert(false) : setShowAlert(true);
     
  };

    
  const navigate = useNavigate();
  function renderModal(): JSX.Element | null {
    return (
      <div className="modal" >
      <section className="modal-main">
        <div className="title-container">
          <h3> {props.title} </h3>
        </div>
        <button
          className="modal-close"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/${baseUrl}/boards`);
            handleHide();
          }}
        >
          ×
        </button>
        <div className="main-container" style={props.style}>
            <div className="modal-buttons">
              <button
                className="modal-button"
                id={props.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  props.function();
                    
                }}
              >
                {t('confirm')}
              </button>
            </div>
          </div>
       
      </section>
    </div>
    );
  }
 

return  renderModal() ;

}
