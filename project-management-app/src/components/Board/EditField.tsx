import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";

interface EditFieldProps {
  buttonName: string; // Update
  placeholder: string; // Enter new title
  type: string; // Title
	field: string; // Title value
}

export function EditField(props: EditFieldProps) {
	const [state, setState] = useState({
		formOpen: false,
    field: props.field,
	});

  const dispatch = useDispatch();

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

	function handleFieldUpdate(e: { target: { value: string } }) {
		setState({
			...state,
			field: e.target.value,
		});
	}

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
				<Card
					style={{
						overflow: "visible",
						minHeight: 80,
						minWidth: 270,
						padding: "6px 8 px 2px",
					}}
				>
					<TextField
            placeholder="Enter new title"
						autoFocus
						value={state.field}
						onChange={handleFieldUpdate}
						style={{
							resize: "none",
							width: "100%",
							paddingTop: 5,
						}}
          />
				</Card>
				<div className="add-button-container">
					<Button						
						style={{ color: "white", backgroundColor: "midnightblue" }}
            onClick={() => console.log(`we are in button`)}
					>
						Update{" "}
					</Button>
          <Icon style={{ marginLeft: 8, cursor: "pointer" }} onClick={closeForm}>close</Icon>
				</div>
			</React.Fragment>
		);
	}

	return (
    <div className="title-description-wrapper">
      <label htmlFor={props.type}>{props.type}</label>
      {state.formOpen ? renderForm() : renderField()}
    </div>
    );
}

export default connect()(EditField);
