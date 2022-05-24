import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";

import {
	applyColorLogin,
	applyColorName,
	applyColorPasswordShow,
} from "../../helpersFunct/inputcolor";
import instaceApi from "../../services/api";
import { edit, selectUser, signup } from "../../store/signup/userOptions";
import {
	deleteUserPermanently,
	getAllUsers,
	toServerEdit,
} from "../../services/apiUserProvider";
import "./edit.css";
import "../passwordShowHide/passwordField.css";
import { baseUrl } from "../../App";

function EditForm({ updateToken }: any) {
	const [name, setName] = useState("");
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState("🙈");
	const [passwordShown, setPasswordShown] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const register = useSelector(selectUser);

	const { t } = useTranslation();

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
		if (!passwordShown) {
			setShow("🙉");
		} else {
			setShow("🙈");
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			edit({
				name: name,
				login: login,
				password: password,
			})
		);
		//send it to the server
		if (register.id) {
			await toServerEdit(register.id, { name, login, password });
		}
		//await getAllUsers();
	};

	const deleteUserById = async () => {
		alert(t("alert_delete_user"));
		if (register.id) {
			deleteUserPermanently(register.id);
		}

		dispatch(
			edit({
				login: null,
				password: null,
				userID: null,
				name: null,
			})
		);
		const token = localStorage.setItem("userToken", "");
		updateToken(token);
		navigate(`/${baseUrl}`);
		getAllUsers();
	};

	return (
		<>
			<form className="signup__form" onSubmit={(e) => handleSubmit(e)}>
				<h1>{t("edit")} 👀:</h1>
				{/*<input
					className="signup__input"
					onKeyUp={applyColorName}
					type="name"
					placeholder={t("name")}
					id="name"
					defaultValue={register.name?.toString()}
					onChange={(e) => setName(e.target.value)}
					//pattern="[A-Za-z]{2,}"
					title="Just latin letters, min 2 symbols"
				/>*/}
				<TextField
					id="outlined-name"
					label={t("name")}
					defaultValue={register.name?.toString()}
					onChange={(e) => setName(e.target.value)}
					title="Just latin letters, min 2 symbols"
				/>
				<input
					className="signup__input"
					onKeyUp={applyColorLogin}
					type="text"
					placeholder={t("login")}
					id="login"
					defaultValue={register.login?.toString()}
					//value={login}
					onChange={(e) => setLogin(e.target.value)}
					pattern="{4,}"
					//pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"-for email
					title="login min 4 symbols..."
				/>
				<div className="row__password">
					<input
						className="password__input"
						onKeyUp={applyColorPasswordShow}
						type={passwordShown ? "text" : "password"}
						id="password"
						placeholder={t("password")}
						defaultValue={register.password?.toString()}
						onChange={(e) => setPassword(e.target.value)}
						pattern="{6,}"
						title="Put minimum 6 symbols"
					/>
					<button type="button" className="show__btn" onClick={togglePassword}>
						{show}
					</button>
				</div>
				<button type="submit" className="signup__btn">
					{t("editBtn")}
				</button>
			</form>
			<button className="delete_user" onClick={deleteUserById}>
				{t("deleteBtn")}
			</button>
		</>
	);
}

export default EditForm;
