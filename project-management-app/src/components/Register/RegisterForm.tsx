import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/signup/userOptions";
import "./signup.css";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

let dis = true;
const unique_id = uuid();

function SignupForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isDisabled = () => {
		const name = (document.getElementById("name") as HTMLInputElement).value;
		const email = (document.getElementById("email") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement)
			.value;
		if (name?.length > 1 && email?.length > 1 && password?.length > 1) {
			dis = false;
		}
		return dis;
	};

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
		dis = true;
	};

	return (
		<form
			className="signup__form"
			onSubmit={(e) => handleSubmit(e)}
			onChange={isDisabled}
		>
			<h1>If you want to register 🌻:</h1>
			<input
				className="signup__input"
				type="name"
				placeholder="Name"
				id="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				pattern="[A-Za-z]{2,}"
				title="Just latin letters, min 2 symbols"
				required
			/>
			<input
				className="signup__input"
				type="email"
				placeholder="Email"
				id="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
				title="cat2cat@do.to"
				required
			/>
			<input
				className="signup__input"
				type="password"
				placeholder="Password"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				pattern="{6,}"
				title="Put minimum 6 symbols"
				required
			/>
			<button type="submit" className="signup__btn" disabled={dis}>
				Register
			</button>
		</form>
	);
}

export default SignupForm;
