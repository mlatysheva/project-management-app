import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import TextArea from "react-textarea-autosize";
import { connect, useDispatch } from "react-redux";
import EditField from "../Board/EditField";
import { useTranslation } from "react-i18next";
import { set_column } from "../../store/reducers/columnSlice";
import TaskTitle from "./TaskTitle";
import { useAppSelector } from "../../store/hooks";
import { createTask } from "../../services/apiBoardProvider";

interface AddTaskProps {
	columnId: string,
  columnTitle: string,
}

export function AddTask(props: AddTaskProps) {
	const [state, setState] = useState({
		formOpen: false,
		title: "",
    description: "",
	});
  const board = useAppSelector((state) => state.board);
  const column = useAppSelector((state) => state.column);
  const task = useAppSelector((state) => state.task);

  const dispatch = useDispatch();
  const { t } = useTranslation();

	function openForm() {
    console.log(`columns with id ${props.columnId} will be edited`);
    dispatch(set_column({id: props.columnId, title: props.columnTitle}));
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

	// function handleInputChange(e: { target: { value: string } }) {
	// 	setState({
	// 		...state,
	// 		title: e.target.value,
	// 	});
	// }

  async function handleAddTask () {
    console.log(`we are in handleAddTask`);
    const body = {
      title: task.title,
      description: task.description,
      userId: task.userId,
    }
    if (column.id) {
      console.log(`in handleAddTask body is:`);
      console.dir(body);
      const apiTask = await createTask(board.id, column.id, body);
      console.dir(apiTask); 
    }
  }

	function renderButton() {
		return (
			<div
				className="add-button"
				style={{
					opacity: 1,
          height: 40,
					color: "white",
					backgroundColor: "inherit",
				}}
				onClick={openForm}
			>
				<Icon>add</Icon>
				<p>Add new task</p>
			</div>
		);
	}

	function renderForm() {
		return (
			<div className="add-task-button-form">
				<Card
					style={{
						overflow: "visible",
						minHeight: 170,
						minWidth: 270,
						padding: "6px 8px 2px",
					}}
				>
          <TaskTitle formOpen={true} placeholder='Enter title' type='task_title' value='' />
          <TaskTitle formOpen={true} placeholder='Enter description' type='task_description' value='' />
				</Card>
				<div className="add-button-container">
					<Button						
						style={{ color: "white", backgroundColor: "midnightblue" }}
            onClick={handleAddTask}
					>
						Save task
					</Button>
          <Icon style={{ marginLeft: 8, cursor: "pointer" }} onClick={closeForm}>close</Icon>
				</div>
			</div>
		);
	}

	return state.formOpen ? renderForm() : renderButton();
}

export default connect()(AddTask);
