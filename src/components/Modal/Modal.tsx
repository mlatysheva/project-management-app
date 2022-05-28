import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../App";


export function AddModalInfo(props: {showInfo: boolean, toHide: boolean, title: string, id: string}) {
  
  const [showInfo, setShowInfo] = useState(false);
   
  const handleHide = () => {
     setShowInfo(false);
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
       
      </section>
    </div>
    );
  }
 

return  renderModal() ;

}
