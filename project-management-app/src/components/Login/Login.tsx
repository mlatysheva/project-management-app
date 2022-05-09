import LoginForm from "./LoginForm";

function openRegister() {
	console.log("Have to register");
}

function Login() {
	return (
		<div className="main">
			<LoginForm />
			{/*<h1>If you are not registered click 🗺️: </h1>
			<button id="register" onClick={openRegister}>
				Register
			</button>*/}
		</div>
	);
}

export default Login;
