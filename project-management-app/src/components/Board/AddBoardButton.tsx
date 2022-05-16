import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import TextArea from "react-textarea-autosize";
import { connect, useDispatch } from "react-redux";
import { addBoard } from "../../store/reducers/boardsActions";
import { add_board } from "../../store/reducers/boardsSlice";

export function AddBoardButton() {
	const [state, setState] = useState({
		formOpen: false,
		title: "",
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

	function handleInputChange(e: { target: { value: string } }) {
		setState({
			...state,
			title: e.target.value,
		});
	}

  function handleAddBoard () {
    const { title } = state;
    if (title) {
      // dispatch(addBoard(title));
      dispatch(add_board({title: title})); 
    }
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
				<p>Add Board</p>
			</div>
		);
	}

	function renderForm() {
		const placeholder = "Add new board";
		const buttonTitle = "Add board";

		return (
			<div>
				<Card
					style={{
						overflow: "visible",
						minHeight: 80,
						minWidth: 270,
						padding: "6px 8 px 2px",
					}}
				>
					<TextArea
						placeholder={placeholder}
						autoFocus
						// onBlur={closeForm}
						value={state.title}
						onChange={handleInputChange}
						style={{
							resize: "none",
							width: "100%",
							paddingTop: 10,
							outline: "none",
							border: "none",
							overflow: "hidden",
						}}
					/>
				</Card>
				<div className="add-button-container">
					<Button						
						style={{ color: "white", backgroundColor: "midnightblue" }}
            onClick={handleAddBoard}
					>
						{buttonTitle}{" "}
					</Button>
          <Icon style={{ marginLeft: 8, cursor: "pointer" }} onClick={closeForm}>close</Icon>
				</div>
			</div>
		);
	}

	return state.formOpen ? renderForm() : renderButton();
}

export default connect()(AddBoardButton);
