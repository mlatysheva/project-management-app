import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation} from 'react-i18next';
import Tooltip from "@mui/material/Tooltip";

interface Lngs {
  [key: string]: string | undefined;
}
const lngs:Lngs = {
  en:  'English' ,
  ru: 'Russian' ,
};
 
export default function SelectLanguage() {
  
  const [anchorEl, setAnchorEl] = React.useState<null | SVGElement>(null);
  const {i18n, t } = useTranslation();

   const handleMenu = (event: React.MouseEvent<SVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    const languageMenu = document.getElementById('menu-appbar');
    languageMenu?.classList.add('hidden');
    removeNav();
    setAnchorEl(null);
  }

  function removeNav() {
		const nav = document.querySelector("nav");
		if (nav?.classList.contains("nav-active")) {
      console.log(`we are in selectlanguage`);
			nav?.classList.remove("nav-active");
			if (window.innerWidth < 600) {
				nav?.classList.toggle("hidden");
			}
		}
	}
  function changeLanguage(lng: string) {
    i18n.changeLanguage(lng);
    handleClose();
  }

  return (
    <div className="language-icon">
      <Tooltip title={t("language")}>
        <LanguageIcon style={{cursor: 'pointer'}} fontSize="large" onClick={handleMenu}></LanguageIcon>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
      >
        {Object.keys(lngs).map((lng: string) => (
            <MenuItem key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} href='#' type="submit" onClick={() => {
              changeLanguage(lng);
              
            }}>
              {lngs[lng]}
            </MenuItem>
          ))}
      </Menu>
    </div>
         
  );
}
