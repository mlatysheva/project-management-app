import React, { useState } from "react";
import "./signup.css";

function SignupForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<form className="signup__form">
			<h1>If you want to register 🌻:</h1>
			<input
				className="signup__input"
				type="name"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				className="signup__input"
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				className="signup__input"
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit" className="signup__btn">
				Register
			</button>
		</form>
	);
}

export default SignupForm;
