import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import TextArea from "react-textarea-autosize";

interface AddButtonProps {
	type: string;
}

export function AddButton(props: AddButtonProps) {
	const [state, setState] = useState({
		formOpen: false,
		text: "",
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

	function handleInputChange(e: { target: { value: string } }) {
		setState({
			...state,
			text: e.target.value,
		});
	}

	function renderButton() {
		const { type } = props;
		const buttonTextOpasity = type == "Add new task" ? 1 : 0.5;
		const buttonTextColor = type == "Add new task" ? "white" : "inherit";
		const buttonBackground = type == "Add new task" ? "inherit" : "ligthgrey";
		return (
			<div
				className="add-button"
				style={{
					opacity: buttonTextOpasity,
					color: buttonTextColor,
					backgroundColor: buttonBackground,
				}}
				onClick={openForm}
			>
				<Icon>add</Icon>
				<p>{type}</p>
			</div>
		);
	}

	function renderForm() {
		const { type } = props;
		const placeholder =
			type === "Add new task"
				? "Enter the title of the task"
				: type === "Add new board"
				? "Enter the title of the board"
				: "Enter the title of the column";
		const buttonTitle =
			type === "Add new task"
				? "Add task"
				: type === "Add new board"
				? "Add board"
				: "Add column";

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
						onBlur={closeForm}
						value={state.text}
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
						variant="contained"
						style={{ color: "white", backgroundColor: "midnightblue" }}
					>
						{buttonTitle}{" "}
					</Button>
					<Icon style={{ marginLeft: 8, cursor: "pointer" }}>close</Icon>
				</div>
			</div>
		);
	}

	return state.formOpen ? renderForm() : renderButton();
}
