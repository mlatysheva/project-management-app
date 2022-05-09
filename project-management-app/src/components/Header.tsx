import { NavLink, useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";
import AddBoxIcon from "@mui/icons-material/AddBoxRounded";

function CurrentPage() {
	const location = useLocation();
	const getCurrentPage = () => {
		switch (location.pathname) {
			case "/":
				return "Home";
			case "/login":
				return "Login";
			case "/logout":
				return "Logout";
			case "/project-management-app":
				return "Home";
			case "/boards":
				return "Boards";
			case "/create":
				return "Create Board";
			case "/error":
				return "Error";
			default:
				return "Error";
		}
	};

	return (
		<div className="current-page-title">
			<span className="here-text">Current page: </span>
			{getCurrentPage()}
		</div>
	);
}

function Header() {
	return (
		<header className="header">
			<CurrentPage />
			<nav className="nav">
				{/*if not login change icon to logout
          <NavLink to="/logout">
					<Tooltip title="Logout">
						<LogoutIcon fontSize="large" />
					</Tooltip>
				</NavLink>
          */}
				<NavLink to="/login">
					<Tooltip title="Login">
						<LoginIcon fontSize="large" />
					</Tooltip>
				</NavLink>
				<NavLink to="/">
					<Tooltip title="Home">
						<HomeIcon fontSize="large" />
					</Tooltip>
				</NavLink>
				<NavLink to="boards">Your Boards</NavLink>
				<NavLink to="/create">
					<Tooltip title="Add new Board">
						<AddBoxIcon fontSize="large" />
					</Tooltip>
				</NavLink>
			</nav>
		</header>
	);
}

export default Header;
