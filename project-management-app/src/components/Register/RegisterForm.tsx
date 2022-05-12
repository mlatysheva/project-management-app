import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/signup/userOptions";
import "./register.css";
import { useNavigate } from "react-router-dom";
import instaceApi from "../../services/api";
import {
	applyColorLogin,
	applyColorName,
	applyColorPassword,
} from "../../helpersFunct/inputcolor";

let disableBtnIn = true;

function SignupForm() {
	const [name, setName] = useState("");
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isDisabled = () => {
		const namePut = (document.getElementById("name") as HTMLInputElement).value;
		const loginPut = (document.getElementById("login") as HTMLInputElement)
			.value;
		const passwordPut = (
			document.getElementById("password") as HTMLInputElement
		).value;
		if (
			namePut?.length > 1 &&
			loginPut?.length > 1 &&
			passwordPut?.length > 1
		) {
			disableBtnIn = false;
		}
		return disableBtnIn;
	};

	async function toServerRegister(
		register: Record<string, string>
	): Promise<any> {
		try {
			let response = await instaceApi.post(`/signup`, register);
			console.log(`response ${JSON.stringify(response.data)}`);
			return response.data;
		} catch (e) {
			console.error(e);
		} finally {
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			signup({
				name: name,
				login: login,
				password: password,
				registered: true,
			})
		);
		//send it to teh server
		toServerRegister({ name, login, password }).then((register) =>
			console.log(register)
		);
		navigate("/logout");
		disableBtnIn = true;
	};

	return (
		<>
			<form
				className="signup__form"
				onSubmit={(e) => handleSubmit(e)}
				onChange={isDisabled}
			>
				<h1>If you want to register 🌻:</h1>
				<input
					className="signup__input"
					onKeyUp={applyColorName}
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
					onKeyUp={applyColorLogin}
					type="text"
					placeholder="Login"
					id="login"
					value={login}
					onChange={(e) => setLogin(e.target.value)}
					pattern="{4,}"
					//pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"-for email
					title="login min 4 symbols..."
					required
				/>
				<input
					className="signup__input"
					onKeyUp={applyColorPassword}
					type="password"
					placeholder="Password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					pattern="{6,}"
					title="Put minimum 6 symbols"
					required
				/>
				<button type="submit" className="signup__btn" disabled={disableBtnIn}>
					Register
				</button>
			</form>
			<div className="row">
				<h2>Have account?</h2>
				<button
					className="toRegister__btn"
					onClick={(e) => {
						navigate("/signin");
					}}
				>
					click there
				</button>
			</div>
		</>
	);
}

export default SignupForm;
