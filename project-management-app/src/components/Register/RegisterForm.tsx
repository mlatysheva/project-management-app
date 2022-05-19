import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/signup/userOptions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import instaceApi from "../../services/api";
import {
	applyColorLogin,
	applyColorName,
	applyColorPassword,
} from "../../helpersFunct/inputcolor";
import "./register.css";
import { toServerRegister } from "../../services/apiUserProvider";
import { AxiosError } from "axios";

let disableBtnIn = true;

function SignupForm() {
	const [name, setName] = useState("");
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { t } = useTranslation();

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			signup({
				name: name,
				login: login,
				password: password,
			})
		);
		//send it to the server
		let resultOfSignUpCallToServer = await toServerRegister({
			name,
			login,
			password,
		});
		if (resultOfSignUpCallToServer instanceof AxiosError) {
			if (resultOfSignUpCallToServer.response?.data?.message) {
				alert(resultOfSignUpCallToServer.response?.data.message);
			} else {
				alert("Check your internet connection!");
			}
		} else {
			navigate("/signin");
			disableBtnIn = true;
		}
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
					placeholder={t("name")}
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
					placeholder={t("login")}
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
					placeholder={t("password")}
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					pattern="{6,}"
					title="Put minimum 6 symbols"
					required
				/>
				<button type="submit" className="signup__btn" disabled={disableBtnIn}>
					{t("registerBtn")}
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

//registered: true,
