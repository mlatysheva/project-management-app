import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useEffect, useState } from "react";
import TextArea from "react-textarea-autosize";
import { connect, useDispatch } from "react-redux";
import EditField from "../Board/EditField";
import { useTranslation } from "react-i18next";
import { add_task_to_column, set_column } from "../../store/reducers/columnSlice";
import TaskTitle from "./TaskTitle";
import { useAppSelector } from "../../store/hooks";
import { createTask, getColumn } from "../../services/apiBoardProvider";
import { TaskProps, update_task_id, update_task_title } from "../../store/reducers/taskSlice";

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

	// useEffect(() => {
  //   console.log('we are in useEffect');
  //   async function getColumnFromServer(bId: string, cId: string) {
  //     const response = await getColumn(bId, cId);
  //     dispatch(set_column({
  //       id: response.id,
  //       title: response.title,
  //       order: response.order,
  //       tasks: response.tasks,
  //     }));
  //     columnId = response.id
  //   }
  //   getColumnFromServer(board.id, columnId);    
  // }, []);

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
			taskId = apiTask.id;
			console.log(`taskId is: ${taskId}`);
			dispatch(update_task_id(taskId));
			 
			// dispatch(add_task_to_column({title: apiTask.title, description: apiTask.description, userId: apiTask.userId, order: apiTask.order}));
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
