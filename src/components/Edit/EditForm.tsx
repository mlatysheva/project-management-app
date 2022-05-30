import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AddModalInfo } from "../Modal/Modal";

import {
	applyColorLogin,
	applyColorName,
	applyColorPasswordShow,
} from "../../helpersFunct/inputcolor";
import { edit, selectUser } from "../../store/signup/userOptions";
import {
	deleteUserPermanently,
	getAllUsers,
	toServerEdit,
} from "../../services/apiUserProvider";
import "./edit.css";
import "../passwordShowHide/passwordField.css";
import { baseUrl } from "../../App";

function EditForm({ updateToken }: { updateToken: (a: string) => void }) {
	const [name, setName] = useState(localStorage.getItem("userName") as string);
	const [login, setLogin] = useState(
		localStorage.getItem("userLogin") as string
	);
	const [password, setPassword] = useState(
		localStorage.getItem("userPassword") as string
	);
	const [show, setShow] = useState("🙈");
	const [passwordShown, setPasswordShown] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const handleAlert = () => {
		setShowAlert(true);
	};

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
			const result = await toServerEdit(register.id, { name, login, password });
			console.log(result);
		}
		localStorage.setItem("userName", name);
		localStorage.setItem("userLogin", login);
		localStorage.setItem("userPassword", password);
		//await getAllUsers();
	};

	const deleteUserById = async () => {
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
		localStorage.setItem("userToken", "");
		updateToken("");
		navigate(`/${baseUrl}`);
		getAllUsers();
	};

	return (
		<>
			<form className="signup__form" onSubmit={(e) => handleSubmit(e)}>
				<h1>{t("edit")} 👀:</h1>
				<input
					className="signup__input"
					onKeyUp={applyColorName}
					type="name"
					placeholder={t("name")}
					id="name"
					defaultValue={localStorage.getItem("userName")?.toString()}
					onChange={(e) => setName(e.target.value)}
					//pattern="[A-Za-z]{2,}"
					title="Just latin letters, min 2 symbols"
				/>
				<input
					className="signup__input"
					onKeyUp={applyColorLogin}
					type="text"
					placeholder={t("login")}
					id="login"
					defaultValue={localStorage.getItem("userLogin")?.toString()}
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
						defaultValue={localStorage.getItem("userPassword")?.toString()}
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
			<button className="delete_user" onClick={handleAlert}>
				{t("deleteBtn")}
			</button>
			{showAlert ? (
				<AddModalInfo
					showInfo={showAlert}
					toHide={true}
					id={" "}
					title={t("alert_delete_user")}
					function={() => {
						deleteUserById();
					}}
					style={{ display: "block" }}
				/>
			) : null}
		</>
	);
}

export default EditForm;
