import Icon from "@mui/material/Icon";
import { useState } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import { add_column_to_board, set_board, update_board } from "../../store/reducers/boardSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { getBoard, updateTask } from "../../services/apiBoardProvider";
import { set_task, TaskProps } from "../../store/reducers/taskSlice";

interface EditFieldProps {
  formOpen?: boolean;
  placeholder: string; // Enter new title
  type: string; // Title
	field: string; // Title value
  category?: string; // board, column or task
}

export function EditField(props: EditFieldProps) {
  const board = useAppSelector((state) => state.board);
  const column = useAppSelector((state) => state.column);
  const task = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const value = props.field;

  const [state, setState] = useState({
		formOpen: props.formOpen || false,
    field: value,
    error: false,
    errorMessage: '',
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
    if (e.target.value.length === 0) {
      setState({
        ...state,
        field: e.target.value,
        error: true,
        errorMessage: 'Field may not be empty',
      });
    } else {
      setState({
        ...state,
        field: e.target.value,
        error: false,
        errorMessage: '',
      });
    }
	}

  async function handleFieldUpdate() {
    if (props.category === "board") {
      let body: {
        id: string;
        title: string;
        description: string;
      };
      if (props.type === "title") {
        body = {
          id: board.id,
          title: state.field,
          description: board.description,
        }
        dispatch(update_board({...body}));
      }
      if (props.type === "description") {
        body = {
          id: board.id,
          title: board.title,
          description: state.field,
        }
        dispatch(update_board({...body}));
      }
    }
    
    if (props.category === "task") {
      let taskBody = {
        id: task.id,
        boardId: board.id,
        columnId: column.id,
        userId: localStorage.getItem("userID") || '',
        order: task.order,
        title: task.title,
        description: task.description,
      };
      if (props.type === "title") {
        taskBody = {
          ...taskBody,
          title: state.field,
        }
        if (board.id && column.id && task.id) {
          const updatedTask = await updateTask(board.id, column.id, task.id, taskBody);
          dispatch(set_task(taskBody));
        }        
      } else if (props.type === "description") {
        taskBody = {
          ...taskBody,
          description: state.field,
        }
        if (board.id && column.id && task.id) {
          const updatedTask = await updateTask(board.id, column.id, task.id, taskBody);
          dispatch(set_task(taskBody));
        }
      }
    }
    closeForm();
  }

	function renderField() {
		return (
      <React.Fragment>
        <h2 style={{ textAlign: "left" }}>{value}</h2>
        <Tooltip title={`${t('editBtn')} ${props.type}`}>
          <EditIcon onClick={openForm}/>
        </Tooltip>
      </React.Fragment>			
		);
	}

	function renderForm() {
		return (
			<React.Fragment>
        <TextField
          placeholder={t('placeholder_title')}
          // autoFocus
          defaultValue={value}
          onChange={handleFieldChange}
          onBlur={handleFieldUpdate}
          helperText={state.errorMessage}
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
