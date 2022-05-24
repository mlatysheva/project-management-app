import SignupForm from "./RegisterForm";

function openRegister() {
	console.log("Have to register");
}

function Register() {
	return (
		<div className="main">
			<SignupForm  />
			{/*<h1>If you are not registered click 🗺️: </h1>
			<button id="register" onClick={openRegister}>
				Register
			</button>*/}
		</div>
	);
}

export default Register;
