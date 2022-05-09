import LoginForm from "./LoginForm";

function openRegister() {
	console.log("Have to register");
}

function Login() {
	return (
		<div className="main">
			<h1>Choose option:</h1>
			<button id="register" onClick={openRegister}>
				Register
			</button>
			<LoginForm />
		</div>
	);
}

export default Login;
