import React, { useState } from "react";
import "./login.css";

function LoginForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<form className="login__form">
			<h1>If you want to login 🌻:</h1>
			<input
				className="login__input"
				type="name"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				className="login__input"
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				className="login__input"
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit" className="login__btn">
				Login
			</button>
		</form>
	);
}

export default LoginForm;
