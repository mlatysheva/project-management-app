import { NavLink, useLocation } from 'react-router-dom';

const CurrentPage = () => {
  const location = useLocation();
  const getCurrentPage = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/projects':
        return 'Projects';
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
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
      </nav>
    </header>
  );
}

export default Header;
