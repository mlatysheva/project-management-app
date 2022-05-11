import React from "react";
import { TaskProps } from "../../reducers/allBoardsReducer";
import { AddButton } from "./AddTaskButton";
import { TaskCard } from "./TaskCard";
import { ColumnProps } from "../../reducers/columnReducer";

interface BoardColumnProps {
	title: string;
	tasks: TaskProps[];
}

export const BoardColumn = (props: BoardColumnProps) => {
	// console.dir(props);
	return (
		<div className="column-wrapper">
			<h2>{props.title}</h2>
			{props.tasks.map((task: TaskProps) => (
				<TaskCard
					key={(Math.random() * 10).toString()}
					title={task.title}
					description={task.description}
					responsible={task.responsible}
				/>
			))}
			<AddButton type="Add new task" />
		</div>
	);
};
