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
import {
	deleteUser,
	getUserByLogin,
	updateUser,
} from "../../services/apiUserProvider";
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
		} else {
			setShow("🙈");
		}
	};

	/*async function toServerEdit(register: Record<string, string>): Promise<any> {
		//should be put
		try {
			let response = await instaceApi.put(`/signup/${id}`, register);
			//console.log(`response ${JSON.stringify(response.data)}`);
			return response.data;
		} catch (e) {
			console.error(e);
		} finally {
			console.log(`register in edit = ${register}`);
		}
	}*/

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		/*const id = localStorage.getItem("id");
		if (id !== null) {
			updateUser(id, {
				name: name,
				login: login,
				password: password,
			});
		}*/
		dispatch(
			edit({
				name: name,
				login: login,
				password: password,
			})
		);

		await getUserByLogin("cat15");
		//send it to the server
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
