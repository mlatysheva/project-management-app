import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { add_column } from "../../store/reducers/columnsSlice";
import TextField from "@mui/material/TextField";
import { useAppSelector } from "../../store/hooks";
import { createColumn } from "../../services/apiBoardProvider";

interface AddColumnProps {
	type: string;
}

let columnOrder = 0;

export function AddColumn(props: AddColumnProps) {
	const [state, setState] = useState({
		formOpen: false,
		title: "",
	});
  let board = useAppSelector((state) => state.board);
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

  async function handleAddColumn () {
    const { title } = state;
    if (title) {
      dispatch(add_column({title: title}));
      console.log(`columnOrder is ${columnOrder}`);
      const body = {
        title: state.title,
        order: columnOrder,
      }
      columnOrder++;
      const apiData = await createColumn(board.id, body);
      console.dir(apiData);
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
			<div>
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
            marginTop: 5,
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
