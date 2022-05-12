import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	applyColorLogin,
	applyColorPassword,
} from "../../helpersFunct/inputcolor";
import { selectUser, signin } from "../../store/signup/userOptions";
import instaceApi from "../services/api";
import "./signin.css";

let disableBtnInSignin = true;

function SigninForm() {
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
			console.log(`signin ${JSON.stringify(response.data)}`);
			return response.data;
		} catch (e) {
			console.error(e);
		} finally {
		}
	}

	const handleSubmitSignin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		disableBtnInSignin = true;
		dispatch(
			signin({
				login: login,
				password: password,
			})
		);
		toServerSignin({ login, password }).then((register) => {
			const token = register.token;
			localStorage.setItem("userToken", token);
		});
		//from server get token
		//navigate("/logout");
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
					value={/*register.login?.toString() || */ login}
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
					value={/*register.password?.toString() || */ password}
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
