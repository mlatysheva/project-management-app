import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	applyColorLogin,
	applyColorPassword,
} from "../../helpersFunct/inputcolor";
import "./signin.css";

let disableBtnInSignin = true;

function SigninForm() {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");

	const isDisabledSignin = () => {
		const loginPut = (
			document.getElementById("login-signin") as HTMLInputElement
		)?.value;
		const passwordPut = (
			document.getElementById("password-signin") as HTMLInputElement
		).value;
		if (loginPut?.length > 1 && passwordPut?.length > 1) {
			disableBtnInSignin = false;
		} else if (loginPut?.length === 0 || passwordPut?.length === 0) {
			disableBtnInSignin = true;
		}
		return disableBtnInSignin;
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmitSignin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submit");
		disableBtnInSignin = true;
		//from server get token
		//go to navigate("/logout");
	};

	return (
		<>
			<form
				className="signup__form"
				onSubmit={(e) => handleSubmitSignin(e)}
				onChange={isDisabledSignin}
			>
				<h1>If you want to signin 🎫:</h1>
				<input
					className="signup__input"
					onKeyUp={applyColorLogin}
					type="text"
					placeholder="Login"
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
					placeholder="Password"
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
					Signin
				</button>
			</form>
			<div className="row">
				<h2>No account?</h2>
				<button
					className="toRegister__btn"
					onClick={(e) => {
						navigate("/signup");
					}}
				>
					click there
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
