import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	applyColorLogin,
	applyColorPassword,
} from "../../helpersFunct/inputcolor";
import { selectUser, signin } from "../../store/signup/userOptions";
import { useTranslation } from "react-i18next";

import "./signin.css";
import {
	getUserByLogin,
	getUserName,
	toServerSignin,
} from "../../services/apiUserProvider";
import { baseUrl } from "../../App";

let disableBtnInSignin = true;

function SigninForm({ updateToken }: any) {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const register = useSelector(selectUser);

	const isDisabledSignin = () => {
		const loginPut = (
			document.getElementById("login-signin") as HTMLInputElement
		)?.value;
		const passwordPut = (
			document.getElementById("password-signin") as HTMLInputElement
		).value;
		if (loginPut?.length === 0 || passwordPut?.length === 0) {
			disableBtnInSignin = true;
		} else {
			disableBtnInSignin = false;
		}

		return disableBtnInSignin;
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmitSignin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		disableBtnInSignin = true;

		let signInResponse = await toServerSignin({ login, password });
		if (!signInResponse) {
			alert(t("no_register"));
			setPassword("");
			setLogin("");
		} else {
			const token = signInResponse.token;
			updateToken(token);

			const userID = await getUserByLogin(login);
			const userName = await getUserName(userID);

			localStorage.setItem("userID", userID);
			localStorage.setItem("userLogin", login);
			localStorage.setItem("userPassword", password);
			localStorage.setItem("userName", userName);

			dispatch(
				signin({
					login: localStorage.getItem("userLogin"),
					password: localStorage.getItem("userPassword"),
					id: localStorage.getItem("userID"),
					name: localStorage.getItem("userName"),
				})
			);

			/*	dispatch(
				signin({
					login: login,
					password: password,
					id: localStorage.getItem("userID"),
					name: userName,
				})
			);*/
			navigate(`/${baseUrl}`);
		}
	};

	const { t } = useTranslation();

	return (
		<>
			<form
				className="signup__form"
				onSubmit={(e) => handleSubmitSignin(e)}
				onChange={isDisabledSignin}
			>
				<h1>{t("h1_signin")} 🎫:</h1>
				<input
					className="signup__input"
					onKeyUp={applyColorLogin}
					type="text"
					placeholder={t("login")}
					id="login-signin"
					value={login}
					onChange={(e) => setLogin(e.target.value)}
					pattern="{4,}"
					title="login min 4 symbols..."
					required
				/>
				<input
					className="signup__input"
					onKeyUp={applyColorPassword}
					id="password-signin"
					type="password"
					placeholder={t("password")}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					pattern="{6,}"
					title="Put minimum 6 symbols"
					required
				/>
				<button
					type="submit"
					className="signup__btn"
					disabled={disableBtnInSignin}
				>
					{t("signin")}
				</button>
			</form>
			<div className="row">
				<h2>{t("no_account")}</h2>
				<button
					className="toRegister__btn"
					onClick={(e) => {
						navigate("/signup");
					}}
				>
					{t("click")}
				</button>
			</div>
		</>
	);
}

export default SigninForm;
