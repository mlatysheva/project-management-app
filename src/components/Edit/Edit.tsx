import EditForm from "./EditForm";
import '../Boards/Board.scss';

export function EditProfile({ updateToken }: any) {
	return (
		<div className="main" id="modal-root">
			<EditForm updateToken={updateToken} />
		</div>
	);
}
