import { Link } from 'react-router-dom';

import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">O'last</div>
      <div className="footer__social">
        <h2 className="footer__title">Nous suivre</h2>
        <ul className="footer__social-icons">
          <li>
            <Link to="#">
              <img src="/facebook.png" alt="Logo Facebook" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src="/twitter.png" alt="Logo Twitter" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src="/instagram.png" alt="Logo Instagram" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer__copyright">Copyright @2024</div>
      <div className="footer__links">
        <ul>
          <li>
            <h1>Players</h1>
          </li>
          <li>
            <Link to="#">
              <p>Créez ton profil</p>
            </Link>
          </li>
          <li>
            <Link to="#">
              <p>Rechercher des joueurs</p>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
