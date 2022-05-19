import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { add_column } from "../../store/reducers/columnsSlice";
import TextField from "@mui/material/TextField";

interface AddColumnProps {
	type: string;
}

export function AddColumn(props: AddColumnProps) {
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

  function handleSetTitle () {
    const { title } = state;
    if (title) {
      dispatch(add_column({title: title}));      
    }
    setState({
      ...state,
      title: '',
      formOpen: false,
    });
  }

	function renderButton() {
		const { type } = props;
		const buttonTextOpasity = 0.5;
		const buttonTextColor = "inherit";
		const buttonBackground = "ligthgrey";
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
        <TextField
          placeholder="Enter new title"
          autoFocus
          value={state.title}
          onChange={handleInputChange}
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
				<div className="add-button-container">
					<Button						
						style={{ color: "white", backgroundColor: "midnightblue" }}
            onClick={handleSetTitle}
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

export default connect()(AddColumn);
