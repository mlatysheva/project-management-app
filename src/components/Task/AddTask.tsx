import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { set_column } from "../../store/reducers/columnSlice";
import TaskTitle from "./TaskTitle";
import { useAppSelector } from "../../store/hooks";
import { createTask, getColumn } from "../../services/apiBoardProvider";
import { TaskProps, update_task_id} from "../../store/reducers/taskSlice";

interface AddTaskProps {
	columnId: string,
  columnTitle: string,
	tasks: TaskProps[],
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

	let columnId = props.columnId;
	let taskId: string;

	function openForm() {
    dispatch(set_column({id: props.columnId, title: props.columnTitle}));
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

  async function handleAddTask () {
    const body = {
      title: task.title,
      description: task.description,
      userId: task.userId,
    }
    if (column.id) {
      const apiTask = await createTask(board.id, column.id, body);
			taskId = apiTask.id;
			dispatch(update_task_id(taskId));
			const response = await getColumn(board.id, columnId);
      dispatch(set_column({
        id: response.id,
        title: response.title,
        order: response.order,
        tasks: response.tasks,
      }));
			closeForm();
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
          <TaskTitle formOpen={true} placeholder='Enter title' type='task_title' value={task.title} />
          <TaskTitle formOpen={true} placeholder='Enter description' type='task_description' value={task.description} />
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
