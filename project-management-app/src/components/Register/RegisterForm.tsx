import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/signup/userOptions";
import "./signup.css";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const unique_id = uuid();

function SignupForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			signup({
				name: name,
				email: email,
				password: password,
				registered: true,
				id: unique_id,
			})
		);
		navigate("/logout");
	};

	return (
		<form className="signup__form" onSubmit={(e) => handleSubmit(e)}>
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
