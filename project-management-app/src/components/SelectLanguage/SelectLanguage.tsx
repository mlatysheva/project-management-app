import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LanguageIcon from "@mui/icons-material/Language";

export default function SelectLanguage() {
  
  const [anchorEl, setAnchorEl] = React.useState<null | SVGElement>(null);

   const handleMenu = (event: React.MouseEvent<SVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <LanguageIcon  fontSize="large" onClick={handleMenu}></LanguageIcon>
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
        <MenuItem onClick={handleClose}>English</MenuItem>
        <MenuItem onClick={handleClose}>Russian</MenuItem>
      </Menu>
    </div>
         
  );
}
