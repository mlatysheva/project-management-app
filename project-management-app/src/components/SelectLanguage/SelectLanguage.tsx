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
    setAnchorEl(null);
  };

  return (
    <div>
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
        onClose={handleClose}
              >
        {/* <MenuItem onClick={handleClose}>English</MenuItem>
        <MenuItem onClick={handleClose}>Russian</MenuItem> */}
        {Object.keys(lngs).map((lng: string) => (
            <MenuItem key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} href='#' type="submit" onClick={() => {
              i18n.changeLanguage(lng);
              
            }}>
              {lngs[lng]}
            </MenuItem>
          ))}
      </Menu>
    </div>
         
  );
}
