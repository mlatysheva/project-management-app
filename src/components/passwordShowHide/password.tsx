import { applyColorPasswordShow } from "../../helpersFunct/inputcolor";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./passwordField.css";

function PasswordField() {
	const { t } = useTranslation();
	//https://melvingeorge.me/blog/show-or-hide-password-ability-reactjs

	const [password, setPassword] = useState("");
	const [show, setShow] = useState("Show");
	const [passwordShown, setPasswordShown] = useState(false);

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
		if (!passwordShown) {
			setShow("Hide");
		}
		if (passwordShown) {
			setShow("Show");
		}
	};

	return (
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
	);
}

export default PasswordField;
