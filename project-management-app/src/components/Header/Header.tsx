import { NavLink, useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";
import AddBoxIcon from "@mui/icons-material/AddBoxRounded";
import SelectLanguage from "../SelectLanguage/SelectLanguage";
import EditIcon from "@mui/icons-material/Edit";
import "./Header.scss";
import { useEffect } from "react";
import { useTranslation} from 'react-i18next';
import { clear_board } from "../../store/reducers/boardSlice";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../App";

export function CurrentPage() {
	const location = useLocation();
	const { t } = useTranslation();
	const getCurrentPage = () => {
		switch (location.pathname) {
			case `/${baseUrl}`:
				return t('home');
        case `/${baseUrl}/`:
				return t('home');
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

	return (
		<header className="header">
			<CurrentPage />
			<nav className="nav">
				<NavLink to={`/${baseUrl}`}>
					<Tooltip title={t('home')}>
						<HomeIcon fontSize="large" />
					</Tooltip>
				</NavLink>
				{localStorage.token ? (
					<>
						<NavLink to={`${baseUrl}/logout`}>
							<Tooltip title={t("logout")}>
								<LogoutIcon fontSize="large" />
							</Tooltip>
						</NavLink>
						<NavLink to={`${baseUrl}/edit`}>
							<Tooltip title={t("edit")}>
								<EditIcon fontSize="large" />
							</Tooltip>
						</NavLink>
					</>
				) : (
					<>
						<NavLink to={`${baseUrl}/signin`}>
							<Tooltip title={t("signin")}>
								<LoginIcon fontSize="large" />
							</Tooltip>
						</NavLink>
						<NavLink to={`${baseUrl}/signup`}>
							<Tooltip title={t("signup")}>
								<HowToRegIcon fontSize="large" />
							</Tooltip>
						</NavLink>
					</>
				)}
				<NavLink to={`${baseUrl}/boards`}>{t('boards')}</NavLink>
				<NavLink to={`${baseUrl}/createboard`}>
					<Tooltip title={t("add")}>
						<AddBoxIcon fontSize="large" onClick={handleCreateBoard} />
					</Tooltip>
				</NavLink>
				<SelectLanguage />
			</nav>
		</header>
	);
}

export default Header;
