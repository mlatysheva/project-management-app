import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	applyColorLogin,
	applyColorPassword,
} from "../../helpersFunct/inputcolor";
import instaceApi from "../../services/api";
import { selectUser, signin } from "../../store/signup/userOptions";
import { useTranslation } from "react-i18next";

import "./signin.css";
import { getUserByLogin, getUserName } from "../../services/apiUserProvider";

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

	async function toServerSignin(
		register: Record<string, string>
	): Promise<any> {
		try {
			let response = await instaceApi.post(`/signin`, register);
			//console.log(`signin ${JSON.stringify(response.data)}`);
			return response.data;
		} catch (e) {
			console.error(e);
		} finally {
		}
	}

	const handleSubmitSignin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		disableBtnInSignin = true;

		let signInResponse = await toServerSignin({ login, password });
		if (!signInResponse) {
			alert("Maybe you aren't register yet...");
			setPassword("");
			setLogin("");
		} else {
			const token = signInResponse.token;
			updateToken(token);

			const userID = await getUserByLogin(login);
			const userName = await getUserName(userID);

			dispatch(
				signin({
					login: login,
					password: password,
					id: userID,
					name: userName,
				})
			);
			navigate("/");
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

/**/

/*dispatch(
			signin({
				login: login,
				password: password,
				registered: false,
			})
		);*/
//send it to teh server

//	navigate("/logout");
//	disableBtnInSignin = true;
