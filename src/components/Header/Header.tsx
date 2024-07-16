import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { userId, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const handleDropnav = () => {
    setIsNavVisible(!isNavVisible);
    setIsFirstRender(false); // Ensures that the first render state is false after interaction
  };

  useEffect(() => {
    setIsFirstRender(false); // Set to false after the initial render
  }, []);

  // Close the navigation menu on route change
  useEffect(() => {
    setIsNavVisible(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <section className="header_logos">
        <Link to="/">
          <figure className="header__logo">
            <div className="header__logo-main">O'last</div>
            <figcaption className="logo__text">Press To Start</figcaption>
          </figure>
        </Link>
        <div className="header__toggle" onClick={handleDropnav}>
          <div className="menu-mobile"></div>
          <div className="menu-mobile"></div>
          <div className="menu-mobile"></div>
        </div>
      </section>
      {/* Use the isFirstRender state to conditionally apply the display-none class */}
      <section
        className={`header_nav-container ${isFirstRender ? 'display-none' : ''} ${isNavVisible ? 'display-true' : 'display-false'}`}
      >
        <nav className="header__nav">
          <ul className="nav__list">
            {userId ? (
              <>
                <li className="nav__link">
                  <Link to="/">Accueil</Link>
                </li>
                <li className="nav__link">
                  <Link to="/annonce">Annonces</Link>
                </li>
                <li className="nav__link">
                  <Link to={`/profile/${userId}`}>Mon profil</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav__link">
                  <Link to="/">Accueil</Link>
                </li>
                <li className="nav__link">
                  <Link to="/annonce">Annonces</Link>
                </li>
              </>
            )}
          </ul>
          <ul className="nav__list">
            {userId ? (
              <li className="nav__link">
                <Link to="#" onClick={handleLogout}>
                  Deconnexion
                </Link>
              </li>
            ) : (
              <>
                <li className="nav__link">
                  <Link to="/connexion">Connexion</Link>
                </li>
                <li className="nav__link">
                  <Link to="/inscription">Inscription</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </section>
    </header>
  );
}

export default Header;
