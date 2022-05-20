import { NavLink, useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";
import AddBoxIcon from "@mui/icons-material/AddBoxRounded";
import SelectLanguage from "../SelectLanguage/SelectLanguage";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from "react";
import { useTranslation} from 'react-i18next';
import { clear_board } from "../../store/reducers/boardSlice";
import { useDispatch } from "react-redux";
import "./Header.scss";

export function CurrentPage() {
	const location = useLocation();
	const { t } = useTranslation();
	const getCurrentPage = () => {
		switch (location.pathname) {
			case "/":
				return t('home');
			case "/signup":
				return t("signup");
			case "/signin":
				return t("signin");
			case "/logout":
				return t("logout");
			case "/project-management-app":
				return t('home');
			case "/boards":
				return t("boards");
			case "/createboard":
				return t("create_board");
      case "/editboard":
				return t("edit_board");
			case "/edit":
				return t("edit");
			case "/error":
				return "Error";
			default:
				return t("error");
		}
	};

	return (
		<div className="current-page-title">
			<span className="here-text">{t('here_text')} </span>
			{getCurrentPage()}
		</div>
	);
}



function Header(localStorage: any) {
	// Sticky Menu Area https://stackoverflow.com/questions/62970456/how-to-create-sticky-headers-on-scroll-with-react
	useEffect(() => {
		window.addEventListener("scroll", isSticky);
		return () => {
			window.removeEventListener("scroll", isSticky);
		};
	});

	/* Method that will fix header after a specific scrollable */
	const isSticky = (e: Event) => {
		const header = document.querySelector(".header");
		const scrollTop = window.scrollY;
		scrollTop > 0
			? header?.classList.add("is-sticky")
			: header?.classList.remove("is-sticky");
	};
	const { t } = useTranslation();
  const dispatch = useDispatch();

  function handleCreateBoard() {
    dispatch(clear_board());
  }

	const isSmallScreen =( e:Event) => { 
		const menu = document.querySelector(".menu");
		const nav = document.querySelector(".nav");
		
	 	if (window.innerWidth < 600) {
			 menu?.classList.remove('hidden');
			 nav?.classList.add('hidden');

		 }
		 else {
			 menu?.classList.add('hidden');
			 nav?.classList.remove('hidden');
		 }
			
	}

	
	useEffect(() => {
		window.addEventListener("resize", isSmallScreen);
		return () => {
			window.removeEventListener("resize", isSmallScreen);
		};
	});

	return (
		<header className="header">
			<CurrentPage />
			<nav className="nav">
				<NavLink to="/">
					<Tooltip title={t('home')}>
						<HomeIcon fontSize="large" />
					</Tooltip>
				</NavLink>
				{localStorage.token ? (
					<>
						<NavLink to="/logout">
							<Tooltip title={t("logout")}>
								<LogoutIcon fontSize="large" />
							</Tooltip>
						</NavLink>
						<NavLink to="/edit">
							<Tooltip title={t("edit")}>
								<EditIcon fontSize="large" />
							</Tooltip>
						</NavLink>
					</>
				) : (
					<>
						<NavLink to="/signin">
							<Tooltip title={t("signin")}>
								<LoginIcon fontSize="large" />
							</Tooltip>
						</NavLink>
						<NavLink to="/signup">
							<Tooltip title={t("signup")}>
								<HowToRegIcon fontSize="large" />
							</Tooltip>
						</NavLink>
					</>
				)}
				<NavLink to="boards">{t('boards')}</NavLink>
				<NavLink to="/createboard">
					<Tooltip title={t("add")}>
						<AddBoxIcon fontSize="large" onClick={handleCreateBoard} />
					</Tooltip>
				</NavLink>
				<SelectLanguage />
			</nav>
				<MenuIcon className="hidden menu" fontSize="large"/>
		</header>
	);
}

export default Header;
