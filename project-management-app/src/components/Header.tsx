import { NavLink, useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";
import AddBoxIcon from "@mui/icons-material/AddBoxRounded";
import LanguageIcon from "@mui/icons-material/Language";
import EditIcon from '@mui/icons-material/Edit';


function CurrentPage() {
	const location = useLocation();
	const getCurrentPage = () => {
		switch (location.pathname) {
			case "/":
				return "Home";
			case "/signup":
				return "Register";
			case "/signin":
				return "Signin";
			case "/logout":
				return "Logout";
			case "/project-management-app":
				return "Home";
			case "/boards":
				return "Boards";
			case "/create":
				return "Create Board";
			case "/edit":
				return "Edit";
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
				{/* if not icon changed after register to HowToRegIcon
				login = true change icon to logout */}
        	<NavLink to="/">
					<Tooltip title="Home">
						<HomeIcon fontSize="large" />
					</Tooltip>
				</NavLink> 
         
				<NavLink to="/signin">
					<Tooltip title="Signin">
						<HowToRegIcon fontSize="large" />
					</Tooltip>
				</NavLink>
				<NavLink to="/signup">
					<Tooltip title="Register">
						<LoginIcon fontSize="large" />
					</Tooltip>
				</NavLink>
				<NavLink to="/edit">
					<Tooltip title="Edit profile">
						<EditIcon fontSize="large" />
					</Tooltip>
				</NavLink>
				<NavLink to="/logout">
					<Tooltip title="Logout">
						<LogoutIcon fontSize="large" />
					</Tooltip>
				</NavLink>
			
				<NavLink to="boards">Your Boards</NavLink>
				<NavLink to="/create">
					<Tooltip title="Add new Board">
						<AddBoxIcon fontSize="large" />
					</Tooltip>
				</NavLink>
				<Tooltip title="Language">
					<LanguageIcon fontSize="large" />
				</Tooltip>
			</nav>
		</header>
	);
}

export default Header;
