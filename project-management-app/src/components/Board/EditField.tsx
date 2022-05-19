import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import { update_board } from "../../store/reducers/boardSlice";
import { set_board } from "../../store/reducers/boardSlice";
import { useAppSelector } from "../../store/hooks";
import { updateBoard } from "../../services/apiBoardProvider";

interface EditFieldProps {
  formOpen?: boolean;
  buttonName: string; // Update
  placeholder: string; // Enter new title
  type: string; // Title
	field: string; // Title value
}

export function EditField(props: EditFieldProps) {
  const board = useAppSelector((state) => state.board);
  const dispatch = useDispatch();

  const [state, setState] = useState({
		formOpen: props.formOpen || false,
    field: props.field,
    // title: board.title,
    // description: board.description,
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

      dispatch(update_board({
        ...body,
        title: state.field,
      }));
    } else {
      body = {
        title: board.title,
        description: state.field,
      }

      dispatch(update_board({
        ...body,
        description: state.field,
      }));
    }

    setState({
      ...state,
      formOpen: false,
    })
  }

	function renderField() {
		return (
      <React.Fragment>
        <h2>{state.field}</h2>
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
            paddingTop: 5,
          }}
        />
        <Button						
          style={{ color: "white", backgroundColor: "midnightblue", marginLeft: 20 }}
          onClick={handleFieldUpdate}
        >
          {props.buttonName}{" "}
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
