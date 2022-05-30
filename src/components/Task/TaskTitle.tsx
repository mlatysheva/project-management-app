import Icon from "@mui/material/Icon";
import { useState } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { update_task_description, update_task_title } from "../../store/reducers/taskSlice";

interface TaskTitleProps {
  formOpen?: boolean;
  placeholder: string; // Enter title
  type: string; // column_title
	value: string; // Title value, for example "To do"
}

export function TaskTitle(props: TaskTitleProps) {
  const column = useAppSelector((state) => state.column);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const [state, setState] = useState({
		formOpen: props.formOpen,
    field: props.value,
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
    if (props.type === "task_title") {
      dispatch(update_task_title(state.field));
    }
    if (props.type === "task_description") {
      dispatch(update_task_description(state.field));
    }
    
    closeForm();
  }

	function renderField() {
		return (
      <React.Fragment>
        <h2 className="task-title">{state.field}</h2>
        <Tooltip title="Edit title">
          <EditIcon onClick={openForm}/>
        </Tooltip>
      </React.Fragment>			
		);
	}

	function renderForm() {
		return (
			<React.Fragment>
        <TextField
          placeholder={props.placeholder}
          // autoFocus
          defaultValue={state.field}
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
        <Icon style={{ marginLeft: 8, cursor: "pointer" }} onClick={() => handleFieldUpdate()}>close</Icon>
			</React.Fragment>
		);
	}

	return (
    <div className="task-field">
      {state.formOpen ? renderForm() : renderField()}
    </div>
    );
}

export default connect()(TaskTitle);
