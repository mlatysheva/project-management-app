import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import { update_board } from "../../store/reducers/boardsSlice";
import { set_board } from "../../store/reducers/boardSlice";
import { useAppSelector } from "../../store/hooks";
import { updateBoard } from "../../services/apiBoardProvider";

interface EditFieldProps {
  buttonName: string; // Update
  placeholder: string; // Enter new title
  type: string; // Title
	field: string; // Title value
}

export function EditField(props: EditFieldProps) {
  const board = useAppSelector((state) => state.board);
  const dispatch = useDispatch();

  const [state, setState] = useState({
		formOpen: false,
    field: props.field,
    title: board.title,
    description: board.description,
	});

	function openForm() {
		setState({
			...state,
			formOpen: true,
		});
	}

	function closeForm() {
		setState({
			...state,
			formOpen: false,
		});
	}

	function handleFieldChange(e: { target: { value: string } }) {
		setState({
			...state,
			field: e.target.value,
		});
	}

  async function handleFieldUpdate() {
    let body: { title: string; description: string; };
    if (props.type === "title") {
      body = {
        title: state.field,
        description: board.description,
      };    
      setState({
        ...state,
        title: state.field,
      });
      dispatch(update_board({
        ...body,
        title: state.field,
      }));
    } else {
      body = {
        title: board.title,
        description: state.field,
      }
      setState({
        ...state,
        description: state.field,
      });
      dispatch(update_board({
        ...body,
        description: state.field,
      }));
    }
    const boardApi = await updateBoard(board.id, body);
    console.dir(boardApi);
    
    // dispatch(set_board({
    //   id: board.id,
    //   title: board.title,
    //   description: board.description,
    // }));

    setState({
      ...state,
      formOpen: false,
    })
  }

  // async function handleAddBoard () {
  //   const { id, title, description } = state;

  //   if (title) {
  //     const boardApi = await createBoard({
  //       title: title,
  //       description: description,
  //     });
  //     const boardId = boardApi.id;
  //     dispatch(add_board({
  //       id: boardId,
  //       title: title,
  //       description: description,
  //     }));
  //     dispatch(set_board({
  //       id: boardId,
  //       title: title,
  //       description: description,
  //     })); 
  //     setState({
  //       ...state,
  //       title: '',
  //       description: '',
  //       formOpen: false,
  //       toHide: props.toHide,
  //     });
  //   }
  // }

	function renderField() {
		return (
      <React.Fragment>
        <h2>{props.field}</h2>
        <Tooltip title="Edit board">
          <EditIcon onClick={openForm}/>
        </Tooltip>
      </React.Fragment>			
		);
	}

	function renderForm() {
		return (
			<React.Fragment>
        <TextField
          placeholder="Enter new title"
          autoFocus
          value={state.field}
          onChange={handleFieldChange}
          style={{
            resize: "none",
            width: "100%",
            paddingTop: 5,
          }}
        />
        <Button						
          style={{ color: "white", backgroundColor: "midnightblue", marginLeft: 20 }}
          onClick={handleFieldUpdate}
        >
          Update{" "}
        </Button>
        <Icon style={{ marginLeft: 8, cursor: "pointer" }} onClick={closeForm}>close</Icon>
			</React.Fragment>
		);
	}

	return (
    <div className="title-description-wrapper-update">
      <label htmlFor={props.type}>{props.type}</label>
      {state.formOpen ? renderForm() : renderField()}
    </div>
    );
}

export default connect()(EditField);
