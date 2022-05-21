import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { add_board } from "../../store/reducers/boardsSlice";
import { TextField } from "@mui/material";
import { createBoard } from "../../services/apiBoardProvider";
import { set_board } from "../../store/reducers/boardSlice";

export function AddBoard(props: {formOpen: boolean, toHide: boolean}) {
	const [state, setState] = useState({
		formOpen: props.formOpen,
    toHide: props.toHide,
    id: "",
		title: "",
    description: "",
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

	function handleInputTitleChange(e: { target: { value: string } }) {
		setState({
			...state,
			title: e.target.value,
		});
	}

  function handleInputDescriptionChange(e: { target: { value: string } }) {
		setState({
			...state,
			description: e.target.value,
		});
	}

  async function handleAddBoard () {
    const { id, title, description } = state;

    if (title) {
      const boardApi = await createBoard({
        title: title,
        description: description,
      });
      const boardId = boardApi.id;
      dispatch(add_board({
        id: boardId,
        title: title,
        description: description,
      }));
      // dispatch(set_board({
      //   id: boardId,
      //   title: title,
      //   description: description,
      // })); 
      setState({
        ...state,
        title: '',
        description: '',
        formOpen: false,
        toHide: props.toHide,
      });
    }
  }

	function renderButton() {
    return state.toHide ? null : (
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
		const buttonTitle = "Add board";

		return (
			<div>
				<Card
					style={{
            display: "flex",
            flexDirection: "column",
						overflow: "visible",
						minHeight: 80,
						minWidth: 250,
						padding: "6px 8px 2px",
            border: "none",
            boxShadow: "none",
					}}
				>
          <TextField
            placeholder="Enter title"
						autoFocus
						value={state.title}
						onChange={handleInputTitleChange}
						style={{
							resize: "none",
							width: "100%",
							paddingTop: 5,
						}}
          />
          <TextField
            placeholder="Enter description"
						value={state.description}
						onChange={handleInputDescriptionChange}
						style={{
							resize: "none",
							width: "100%",
							paddingTop: 5,
						}}
          />
				</Card>
				<div className="add-button-container">
					<Button						
						style={{ color: "white", backgroundColor: "midnightblue", marginLeft: 8 }}
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

export default connect()(AddBoard);
