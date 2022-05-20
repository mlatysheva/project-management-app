import Icon from "@mui/material/Icon";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import { update_board } from "../../store/reducers/boardSlice";
import { useAppSelector } from "../../store/hooks";

interface EditFieldProps {
  formOpen?: boolean;
  buttonName: string; // Update
  placeholder: string; // Enter new title
  type: string; // Title
	field: string; // Title value
  onClick?: () => void;
  category?: string; // Board/Column/Task
}

export function EditField(props: EditFieldProps) {
  const board = useAppSelector((state) => state.board);
  const dispatch = useDispatch();

  const [state, setState] = useState({
		formOpen: props.formOpen || false,
    field: props.field,
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
    let body: {id: string; title: string; description: string; };
    if (props.type === "title") {
      body = {
        id: board.id,
        title: state.field,
        description: board.description,
      }
    } else {
      body = {
        id: board.id,
        title: board.title,
        description: state.field,
      }
    }

    dispatch(update_board({...body}));

    setState({
      ...state,
      formOpen: false,
    });

    closeForm();
  }

	function renderField() {
		return (
      <React.Fragment>
        <h2 style={{ textAlign: "left" }}>{state.field}</h2>
        <Tooltip title={`Edit ${props.type}`}>
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
            minWidth: 40,
            backgroundColor: "white",
            borderRadius: 4,
            marginTop: 5,
            marginBottom: 10,
          }}
        />
        <Icon style={{ marginLeft: 8, cursor: "pointer" }} onClick={handleFieldUpdate}>close</Icon>
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
