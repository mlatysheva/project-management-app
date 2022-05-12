import { MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../store/signup/userOptions";
import "./logout.css";

function Logout() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const register = useSelector(selectUser);
	const handleLogout = (e: any) => {
		e.preventDefault();
		dispatch(logout());
		navigate("/");
	};
	return (
		<div className="main">
			<div className="logout__form">
				<h1>
					Welcome,
					<span className="logout__name"> {register.name?.toUpperCase()}</span>!
				</h1>
				<button
					className="logout__btn"
					id="logout"
					onClick={(e) => handleLogout(e)}
				>
					Logout
				</button>
			</div>
		</div>
	);
}

export default Logout;
