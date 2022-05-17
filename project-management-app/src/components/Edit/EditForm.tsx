import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	applyColorLogin,
	applyColorName,
	applyColorPassword,
} from "../../helpersFunct/inputcolor";
import { signup } from "../../store/user/userOptions";
import toEditInServer from "../../withServerContacts/forEdit";
import "./edit.css";

function EditForm() {
	const [name, setName] = useState("");
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			signup({
				name: name,
				login: login,
				password: password,
			})
		);
		toEditInServer({ name, login, password }).then((register) =>
			console.log(`register=${register}`)
		);
	};

	const deleteUser = () => {
		console.log("he wants to delete");
		navigate("/");
	};

	return (
		<>
			<form className="signup__form" onSubmit={(e) => handleSubmit(e)}>
				<h1>Edit your profile 👀:</h1>
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
				<button type="submit" className="signup__btn">
					Edit
				</button>
			</form>
			<button className="delete_user" onClick={deleteUser}>
				Delete this user permanently
			</button>
		</>
	);
}

export default EditForm;
