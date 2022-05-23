import Icon from "@mui/material/Icon";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import { update_board } from "../../store/reducers/boardSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface EditFieldProps {
  formOpen?: boolean;
  placeholder: string; // Enter new title
  type: string; // Title
	field: string; // Title value
  category?: string; // create or edit
}

export function EditField(props: EditFieldProps) {
  const board = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const boardId = board.id;
  let value: string;
  if (props.type == "title") {
    value = board.title;
  } else {
    value = board.description;
  }

  const [state, setState] = useState({
		formOpen: props.formOpen || false,
    field: value,
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
    if (props.category === 'edit') {
      closeForm();
    }
  }

	function renderField() {
		return (
      <React.Fragment>
        <h2 style={{ textAlign: "left" }}>{value}</h2>
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
          defaultValue={value}
          onChange={handleFieldChange}
          onBlur={handleFieldUpdate}
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
