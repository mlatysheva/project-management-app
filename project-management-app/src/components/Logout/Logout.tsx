import { useNavigate } from "react-router-dom";
import "./logout.css";

function Logout() {
	const navigate = useNavigate();
	return (
		<div className="main">
			<div className="logout__form">
				<h1>
					Welcome <span className="logout__name">(name)</span>!
				</h1>
				<button
					className="logout__btn"
					id="logout"
					onClick={() => navigate("/")}
				>
					Logout
				</button>
			</div>
		</div>
	);
}

export default Logout;
