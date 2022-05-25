import { BoardProps } from "../store/reducers/boardSlice";

export function sortInDnD(a: BoardProps, b: BoardProps): number {
	try {
		const order = getOrder();
		const aOrder = order.find((o) => o.id === a.id) as BoardOrder;
		const bOrder = order.find((o) => o.id === b.id) as BoardOrder;
		return aOrder.order - bOrder.order;
	} catch (e) {
		return 0;
	}
}

class BoardOrder {
	id: string;
	order: number;

	constructor(id: string, order: number) {
		this.id = id;
		this.order = order;
	}
}

export function setUpAllBoardsToLS(boards: Array<BoardProps>) {
	let previousOrder = localStorage.getItem("boardsOrder");

	if (previousOrder) {
		//removeObsoleteBoardsFromOrder(boards);
		//addNewBoardsToOrder(boards);
	} else {
		localStorage.setItem(
			"boardsOrder",
			JSON.stringify(
				boards.map((b: BoardProps, i: number) => new BoardOrder(b.id, i))
			)
		);
	}
}

function getOrder(): Array<BoardOrder> {
	return JSON.parse(
		localStorage.getItem("boardsOrder") || "[]"
	) as Array<BoardOrder>;
}

function putOrder(order: Array<BoardOrder>): void {
	localStorage.setItem("boardsOrder", JSON.stringify(order));
}

export function recalculateOrder(prevIndex: number, newIndex: number) {
	const ordersArray = getOrder();
	const elem = ordersArray.find((o) => o.order === prevIndex) as BoardOrder;
	if (prevIndex > newIndex) {
		const elementsToUpdate = ordersArray.filter(
			(o) => o.order < prevIndex && o.order >= newIndex
		);
		elementsToUpdate.forEach((o) => o.order++);
	} else if (prevIndex < newIndex) {
		const elementsToUpdate = ordersArray.filter(
			(o) => o.order > prevIndex && o.order <= newIndex
		);
		elementsToUpdate.forEach((o) => o.order--);
	}
	elem.order = newIndex;

	putOrder(ordersArray);
}

export function addNewBoardsToOrder(newBoard: BoardProps) {
	const previousOrder = getOrder();

	const newLastIndex =
		previousOrder.map((o) => o.order).sort((a, b) => b - a)[0] + 1;
	previousOrder.push(new BoardOrder(newBoard.id, newLastIndex));
	putOrder(previousOrder);
}

function removeObsoleteBoardsFromOrder(boards: Array<BoardProps>) {
	const previousOrder = getOrder();
}
