import EditForm from "./EditForm";

export const h1Props = {
	register: "If you want to register 🌻:",
	edit: "If you want to edit profile 🌻:",
};

export function EditProfile() {
	return (
		<div className="main">
			<EditForm />
		</div>
	);
}
