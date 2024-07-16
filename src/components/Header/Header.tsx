//import Link from react router
import { Link } from 'react-router-dom';
import './Header.scss';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { userId, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <Link to="#">
        <figure className="header__logo">
          <img src="" alt="logo-du-site" className="logo__img" />
          <figcaption className="logo__text">Press To Start</figcaption>
        </figure>
      </Link>
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
    </header>
  );
}

export default Header;
