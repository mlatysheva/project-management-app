import { NavLink, useLocation } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Tooltip } from '@material-ui/core';

const CurrentPage = () => {
  const location = useLocation();
  const getCurrentPage = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/create':
        return 'Create Board';
      case '/error':
        return 'Error';
      default:
        return 'Error';
    }
  };

  return (
    <div className="current-page-title">
      <span className="here-text">Current page: </span>
      {getCurrentPage()}
    </div>
  );
};

function Header() {
  return (
    <header className="header">
      <CurrentPage />      
      <nav className="nav">
        <NavLink to="/">
          <Tooltip title="Home">
            <HomeIcon fontSize="large" />
          </Tooltip>
        </NavLink>
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
