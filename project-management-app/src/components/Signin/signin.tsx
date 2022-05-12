import SigninForm from "./SigninForm";

function Signin({ updateToken }: any) {
	return (
		<div className="main">
			<SigninForm updateToken={updateToken} />
		</div>
	);
}

export default Signin;
