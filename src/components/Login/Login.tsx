import { Link } from 'react-router-dom';
import './Login.scss';

function Login() {
  return (
    <div className="login">
      <section className="login__connexion">
        <h2 className="login__title">Connexion</h2>
        <form className="login__form">
          <div className="login__form-group">
            <label className="login__form-label" htmlFor="email">
              Email
            </label>
            <input
              className="login__form-input "
              type="email"
              placeholder="email"
              name="email"
              id="email"
            />
          </div>
          <div className="login__form-group">
            <label className="login__form-label" htmlFor="password">
              Password
            </label>
            <input
              className="login__form-input "
              type="password"
              placeholder="password"
              name="password"
            />
          </div>
        </form>
        <button type="submit" className="login__button">
          Connexion
        </button>
        <p className="login__forgot-password">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          consectetur incidunt -
          <Link to="#" className="login__forgot-password-link">
            forgot password
          </Link>
        </p>
      </section>
      <section className="login__inscription">
        <h2 className="login__title">Inscription</h2>
        <figure className="login__figure">
          <img
            className="login__figure-img"
            src="https://picsum.photos/200/300"
            alt="Inscription"
          />
          <figcaption className="login__figure-caption">
            <p className="login__figure-text">
              Créez un compte en quelques clics !
            </p>
          </figcaption>
          <button className="login__figure-button">Créer un compte</button>
        </figure>
      </section>
    </div>
  );
}

export default Login;
