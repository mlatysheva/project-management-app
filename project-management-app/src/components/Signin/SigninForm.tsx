import { useState } from "react";

function SigninForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<form className="signup__form">
			<h1>If you want to signin 🎫:</h1>
			<input
				className="signup__input"
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				className="signup__input"
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit" className="signup__btn">
				Signin
			</button>
		</form>
	);
}

export default SigninForm;
