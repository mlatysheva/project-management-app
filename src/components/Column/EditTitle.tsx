import Icon from "@mui/material/Icon";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import { update_board, update_column_title } from "../../store/reducers/boardSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";

interface EditTitleProps {
  columnId: string;
  formOpen?: boolean;
  placeholder: string; // Enter title
  type: string; // column_title
	value: string; // Title value, for example "To do"
}

export function EditTitle(props: EditTitleProps) {
  const board = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const boardId = board.id;

  const [state, setState] = useState({
		formOpen: false,
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
    dispatch(update_column_title({title: state.field, columnId: props.columnId}));
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

export default connect()(EditTitle);
