import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
	applyColorLogin,
	applyColorName,
	applyColorPasswordShow,
} from "../../helpersFunct/inputcolor";
import instaceApi from "../../services/api";
import { edit, signup } from "../../store/signup/userOptions";
import { deleteUser, updateUser } from "../../services/apiUserProvider";
import "./edit.css";
import "../passwordShowHide/passwordField.css";

function EditForm({ updateToken }: any) {
	const [name, setName] = useState("");
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState("🙈");
	const [passwordShown, setPasswordShown] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { t } = useTranslation();

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
		if (!passwordShown) {
			setShow("🙉");
		}
		if (passwordShown) {
			setShow("🙈");
		}
	};

	async function toServerEdit(register: Record<string, string>): Promise<any> {
		//should be put
		try {
			let response = await instaceApi.post(`/signup`, register);
			console.log(`response ${JSON.stringify(response.data)}`);
			return response.data;
		} catch (e) {
			console.error(e);
		} finally {
			const { id } = register;
			localStorage.setItem("id", id);
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const id = localStorage.getItem("id");
		if (id !== null) {
			updateUser(id, {
				name: name,
				login: login,
				password: password,
			});
		}
		dispatch(
			//should be edit
			signup({
				name: name,
				login: login,
				password: password,
			})
		);
		//send it to the server
		toServerEdit({ name, login, password }).then((register) => {
			const { name, login, id } = register;
			console.log(name, login);
			localStorage.setItem("id", id);
		});
	};

	const deleteUserById = () => {
		alert(t("alert"));
		const id = localStorage.getItem("id");
		if (id) {
			deleteUser(id).then((res) => {
				console.log(res);
				localStorage.removeItem("id");
			});
		}
		const token = localStorage.setItem("userToken", "");
		updateToken(token);
		navigate("/");
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
				<div className="row__password">
					<input
						className="password__input"
						onKeyUp={applyColorPasswordShow}
						type={passwordShown ? "text" : "password"}
						id="password"
						placeholder={t("password")}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						pattern="{6,}"
						title="Put minimum 6 symbols"
						required
					/>
					<button className="show__btn" onClick={togglePassword}>
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
