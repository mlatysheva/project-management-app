import { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../App";
import { logout } from "../../store/signup/userOptions";
import "./logout.css";

function Logout({ updateToken }:any) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const { t } = useTranslation();

	const handleLogout = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(logout());
		navigate(`/${baseUrl}`);
		updateToken("");
		localStorage.removeItem("userToken");
		localStorage.removeItem("userID");
		localStorage.removeItem("userName");
		localStorage.removeItem("userLogin");
		localStorage.removeItem("userPassword");
	};

	return (
		<div className="main">
			<div className="logout__form">
				<h1>
					<span className="logout__name">
						{" "}
						{
							/*register.login?.toUpperCase()*/
							localStorage.getItem("userLogin")
						}
					</span>
					{t("logout_component")}
				</h1>
				<button
					className="logout__btn"
					id="logout"
					onClick={handleLogout}
				>
					{t("logout_btn")}
				</button>
			</div>
		</div>
	);
}

export default Logout;
