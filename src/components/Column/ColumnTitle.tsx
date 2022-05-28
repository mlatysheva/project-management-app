import Icon from "@mui/material/Icon";
import { useState } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import { update_column_title } from "../../store/reducers/boardSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { updateColumn } from "../../services/apiBoardProvider";

interface ColumnTitleProps {
  columnId: string;
  columnOrder?: number;
  formOpen?: boolean;
  placeholder: string; // Enter title
  type: string; // column_title
	value: string; // Title value, for example "To do"
}

export function ColumnTitle(props: ColumnTitleProps) {
  const board = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const [state, setState] = useState({
		formOpen: false,
    field: props.value,
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
        errorMessage: 'Title may not be empty',
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
    const body = {columnId: props.columnId, title: state.field};
    await updateColumn(board.id, props.columnId, {title: state.field, order: props.columnOrder});
    dispatch(update_column_title(body));
    closeForm();
  }

	function renderField() {
		return (
      <React.Fragment>
        <h2 style={{ textAlign: "left" }}>{props.value}</h2>
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
          placeholder={t('enter_new_title')}
          autoFocus
          defaultValue={props.value}
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
      {state.formOpen ? renderForm() : renderField()}
    </div>
    );
}

export default connect()(ColumnTitle);
