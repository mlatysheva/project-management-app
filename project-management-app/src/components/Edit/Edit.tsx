import SignupForm from '../Register/RegisterForm';

export const h1Props = {
  register : 'If you want to register 🌻:',
  edit: 'If you want to edit profile 🌻:',
}
export function EditProfile() {
	return (
		<div className="main">
			<SignupForm  />
		</div>
	);
}