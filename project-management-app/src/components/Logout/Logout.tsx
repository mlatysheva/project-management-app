import { t } from "i18next";
import { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../store/signup/userOptions";
import "./logout.css";

function Logout({ updateToken }: any) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const register = useSelector(selectUser);
	const { t } = useTranslation();

	const handleLogout = (e: any) => {
		e.preventDefault();
		dispatch(logout());
		navigate("/");
		updateToken("");
		localStorage.removeItem("userToken");
		localStorage.removeItem("userID");
	};
	return (
		<div className="main">
			<div className="logout__form">
				<h1>
					<span className="logout__name"> {register.login?.toUpperCase()}</span>
					{t("logout_component")}
				</h1>
				<button
					className="logout__btn"
					id="logout"
					onClick={(e) => handleLogout(e)}
				>
					{t("logout_btn")}
				</button>
			</div>
		</div>
	);
}

export default Logout;
