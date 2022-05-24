import EditForm from "./EditForm";

export function EditProfile({ updateToken }: any) {
	return (
		<div className="main">
			<EditForm updateToken={updateToken} />
		</div>
	);
}
