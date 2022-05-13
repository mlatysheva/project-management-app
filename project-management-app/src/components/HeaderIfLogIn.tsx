import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";
import AddBoxIcon from "@mui/icons-material/AddBoxRounded";
import LanguageIcon from "@mui/icons-material/Language";
import EditIcon from "@mui/icons-material/Edit";
import { CurrentPage } from "./Header";

function HeaderIfSignin() {
	return (
		<header className="header">
			<CurrentPage />
			<nav className="nav">
				<NavLink to="/">
					<Tooltip title="Home">
						<HomeIcon fontSize="large" />
					</Tooltip>
				</NavLink>
				<NavLink to="/logout">
					<Tooltip title="Logout">
						<LogoutIcon fontSize="large" />
					</Tooltip>
				</NavLink>
				<NavLink to="/edit">
					<Tooltip title="Edit profile">
						<EditIcon fontSize="large" />
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

export default HeaderIfSignin;
