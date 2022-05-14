import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import TextArea from "react-textarea-autosize";
import { connect, useDispatch } from "react-redux";
import { addColumn } from "../../store/reducers/columnsActions";

interface AddButtonProps {
	type: string;
}

export function AddColumnButton(props: AddButtonProps) {
	const [state, setState] = useState({
		formOpen: false,
		title: "",
	});

  const dispatch = useDispatch();

	function openForm() {
    console.log(`we are in openForm`);
		setState({
			...state,
			formOpen: true,
		});
	}

	function closeForm() {
    console.log(`we are in closeForm`);
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

  function handleAddColumn () {
    const { title } = state;
    console.log(`we are in handleAddColumn`);
    console.log(`title is ${title}`);
    if (title) {
      dispatch(addColumn(title));      
    }
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
		const placeholder = "Enter the title of the column";
		const buttonTitle = "Add column";

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
            onClick={handleAddColumn}
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

export default connect()(AddColumnButton);
