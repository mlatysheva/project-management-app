import Icon from "@mui/material/Icon";
import { useState } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
// import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import React from "react";
import { update_board } from "../../store/reducers/boardSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";

interface EditFieldProps {
  formOpen?: boolean;
  placeholder: string; // Enter new title
  type: string; // Title
	field: string; // Title value
  category?: string; // board, column or task
}

export function EditField(props: EditFieldProps) {
  const board = useAppSelector((state) => state.board);
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
    let body: {
      id: string;
      title: string;
      description: string;
    };
    if (props.type === "title" && !state.error) {
      body = {
        id: board.id,
        title: state.field,
        description: board.description,
      }
      dispatch(update_board({...body}));
    }
    if (props.type === "description" && !state.error) {
      body = {
        id: board.id,
        title: board.title,
        description: state.field,
      }
      dispatch(update_board({...body}));
    }
    closeForm();
  }

  function handleEnter(event: { key: string; }) {
    if (event.key === 'Enter') {
      handleFieldUpdate();
    }
  }

	function renderField() {
		return (
      <React.Fragment>
        <h2 style={{ textAlign: "left" }}>{value}</h2>
        <Tooltip title={`${t('editBtn')} ${props.type}`}>
          <PersonIcon onClick={openForm}/>
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
          onKeyDown={handleEnter}
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
