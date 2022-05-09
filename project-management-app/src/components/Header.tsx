import { NavLink, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';
import AddBoxIcon from '@mui/icons-material/AddBoxRounded';


function CurrentPage() {
  const location = useLocation();
  const getCurrentPage = () => {
    switch (location.pathname) {
      case '/welcome':
        return 'Welcome';
      case '/':
        return 'Home';
      case '/project-management-app':
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
}

function Header() {
  return (
    <header className="header">
      <CurrentPage />
      <nav className="nav">
        <NavLink to="/welcome">
        <Tooltip title="Welcome-page">
            <AddBoxIcon fontSize="large" />
          </Tooltip>
      </NavLink>
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
