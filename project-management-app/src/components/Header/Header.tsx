import { NavLink, useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";
import AddBoxIcon from "@mui/icons-material/AddBoxRounded";
import SelectLanguage from "../SelectLanguage/SelectLanguage";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { clear_board } from "../../store/reducers/boardSlice";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../App";
import "./Header.scss";

export function CurrentPage() {
	const location = useLocation();
	const { t } = useTranslation();
	const getCurrentPage = () => {
		switch (location.pathname) {
			case `/${baseUrl}`:
				return t("home");
			case `/${baseUrl}/`:
				return t("home");
			case `/${baseUrl}/signup`:
				return t("signup");
			case `/${baseUrl}/signin`:
				return t("signin");
			case `/${baseUrl}/logout`:
				return t("logout");
			case `/${baseUrl}/boards`:
				return t("boards");
			case `/${baseUrl}/createboard`:
				return t("create_board");
			case `/${baseUrl}/editboard`:
				return t("edit_board");
			case `/${baseUrl}/edit`:
				return t("edit");
			case `/${baseUrl}/error`:
				return "Error";
			default:
				return t("error");
		}
	};

	return (
		<div className="current-page-title">
			<span className="here-text">{t("here_text")} </span>
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
		removeNav();
	}

	const isSmallScreen = (e: Event) => {
		const menu = document.querySelector(".menu");
		const nav = document.querySelector("nav");
		if (window.innerWidth < 600) {
			menu?.classList.remove("hidden");
			nav?.classList.add("hidden");
		} else {
			menu?.classList.add("hidden");
			nav?.classList.remove("hidden");
			nav?.classList.remove("nav-active");
		}
	};
	function handleNav() {
		const nav = document.querySelector("nav");
		nav?.classList.toggle("hidden");
		nav?.classList.toggle("nav-active");
	}

	function removeNav() {
		const nav = document.querySelector("nav");
		if (nav?.classList.contains("nav-active")) {
			nav?.classList.remove("nav-active");
			if (window.innerWidth < 600) {
				nav?.classList.toggle("hidden");
			}
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
			<nav>
				<NavLink to={`/${baseUrl}`}>
					<Tooltip title={t("home")}>
						<HomeIcon fontSize="large" onClick={removeNav} />
					</Tooltip>
				</NavLink>
				{localStorage.token ? (
					<>
						<NavLink to={`${baseUrl}/logout`}>
							<Tooltip title={t("logout")}>
								<LogoutIcon fontSize="large" onClick={removeNav} />
							</Tooltip>
						</NavLink>
						<NavLink to={`${baseUrl}/edit`}>
							<Tooltip title={t("edit")}>
								<EditIcon fontSize="large" onClick={removeNav} />
							</Tooltip>
						</NavLink>
					</>
				) : (
					<>
						<NavLink to={`${baseUrl}/signin`}>
							<Tooltip title={t("signin")}>
								<LoginIcon fontSize="large" onClick={removeNav} />
							</Tooltip>
						</NavLink>
						<NavLink to={`${baseUrl}/signup`}>
							<Tooltip title={t("signup")}>
								<HowToRegIcon fontSize="large" />
							</Tooltip>
						</NavLink>
					</>
				)}
				{localStorage.token ? (
					<>
						<NavLink to={`${baseUrl}/boards`}>
							<Typography
								variant="h6"
								component="div"
								sx={{ flexGrow: 1 }}
								onClick={removeNav}
							>
								{t("boards")}
							</Typography>
						</NavLink>
						<NavLink to={`${baseUrl}/createboard`}>
							<Tooltip title={t("add")}>
								<AddBoxIcon fontSize="large" onClick={handleCreateBoard} />
							</Tooltip>
						</NavLink>
					</>
				) : null}
				<SelectLanguage />
			</nav>
			<div className="menu hidden">
				<MenuIcon fontSize="large" onClick={handleNav} />
			</div>
		</header>
	);
}

export default Header;
