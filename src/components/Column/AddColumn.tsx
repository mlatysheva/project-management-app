import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createColumn } from "../../services/apiBoardProvider";
import { add_column_to_board } from "../../store/reducers/boardSlice";
import React from "react";
import { useTranslation } from "react-i18next";

export function AddColumn() {
	const [state, setState] = useState({
		formOpen: false,
		title: "",
		error: false,
    errorMessage: '',
	});

	const { t } = useTranslation();
  let board = useAppSelector((state) => state.board);

  const dispatch = useAppDispatch();

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

	function handleInputChange(e: { target: { value: string } }) {
		setState({
			...state,
			title: e.target.value,
		});
		if (e.target.value.length === 0) {
      setState({
        ...state,
        title: e.target.value,
        error: true,
        errorMessage: 'Title may not be empty',
      });
    } else {
      setState({
        ...state,
        title: e.target.value,
        error: false,
        errorMessage: '',
      });
    }
	}

  async function handleAddColumn () {
    const { title } = state;
    if (title) {
      const body = {
        title: state.title,
      }
      const apiData = await createColumn(board.id, body);
      dispatch(add_column_to_board({id: apiData.id, title: apiData.title, order: apiData.order}));
    }
    setState({
      ...state,
      title: '',
      formOpen: false,
			error: false,
      errorMessage: '',
    });
  }

	function renderButton() {
		return (
			<div
				className="add-button"
				style={{
					opacity: 0.5,
					color: "inherit",
					backgroundColor: "ligthgrey",
				}}
				onClick={openForm}
			>
				<Icon>add</Icon>
				<p>{t("add_column")}</p>
			</div>
		);
	}

	function renderForm() {
		return (
			<div className="column-form">
        <TextField
          placeholder={t("enter_title")}
          autoFocus
          value={state.title}
          onChange={handleInputChange}
					helperText={state.errorMessage}
          style={{
            resize: "none",
            width: "100%",
            minWidth: 40,
            backgroundColor: "white",
            borderRadius: 4,
            marginBottom: 10,
          }}
        />
				<div className="add-button-container">
					<Button						
						style={{ color: "white", backgroundColor: "midnightblue" }}
            onClick={handleAddColumn}
					>
						{t("add_column")}
					</Button>
          <Icon style={{ marginLeft: 8, cursor: "pointer" }} onClick={closeForm}>close</Icon>
				</div>
			</div>
		);
	}

	return state.formOpen ? renderForm() : renderButton();
}

export default connect()(AddColumn);
