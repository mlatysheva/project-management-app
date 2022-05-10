import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/signup/userOptions";
import "./signup.css";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import instaceApi from "../services/api";

let dis = true;
const unique_id = uuid();

function SignupForm() {
	const [name, setName] = useState("");
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isDisabled = () => {
		const name = (document.getElementById("name") as HTMLInputElement).value;
		const login = (document.getElementById("login") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement)
			.value;
		if (name?.length > 1 && login?.length > 1 && password?.length > 1) {
			dis = false;
		}
		return dis;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			signup({
				name: name,
				login: login,
				password: password,
				registered: true,
				id: unique_id,
			})
		);
		//send it to teh server
		try {
			console.log("response");
			//	await instaceApi.post(``);
		} catch (e) {
			console.error(e);
			console.log("error");
		} finally {
			console.log("finally");
		}
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
				//pattern="[A-Za-z]{2,}"
				title="Just latin letters, min 2 symbols"
				required
			/>
			<input
				className="signup__input"
				type="text"
				placeholder="Login"
				id="login"
				value={login}
				onChange={(e) => setLogin(e.target.value)}
				//pattern="[A-Za-z]{4,}"
				//pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"-for email
				title="login min 4 symbols..."
				required
			/>
			<input
				className="signup__input"
				type="password"
				placeholder="Password"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				//pattern="{6,}"
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
