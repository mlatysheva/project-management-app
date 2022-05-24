import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createColumn } from "../../services/apiBoardProvider";
import { add_column_to_board } from "../../store/reducers/boardSlice";
import React from "react";

interface AddColumnProps {
	type: string;
}

export function AddColumn(props: AddColumnProps) {
	const [state, setState] = useState({
		formOpen: false,
		title: "",
	});
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
    });
  }

	function renderButton() {
		const { type } = props;
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
				<p>{type}</p>
			</div>
		);
	}

	function renderForm() {
		return (
			<div className="column-form">
        <TextField
          placeholder="Enter title"
          autoFocus
          value={state.title}
          onChange={handleInputChange}
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
						Add column
					</Button>
          <Icon style={{ marginLeft: 8, cursor: "pointer" }} onClick={closeForm}>close</Icon>
				</div>
			</div>
		);
	}

	return state.formOpen ? renderForm() : renderButton();
}

export default connect()(AddColumn);
