import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Login() {
  // Déclaration des states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  // Fonction pour gérer le submit du formulaire - l'identifiant et le mot de passe sont envoyés à l'API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await login();

    if (!response) {
      console.log('Connexion réussie');
      setUser(user);
      console.log(document.cookie);
      navigate('/');
    } else {
      console.log('Erreur de connexion');
    }
  };

  // API LOGIN - METHOD POST
  const login = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('Connexion réussie', response.data);
        const user = response.data.email;
        return user;
      }
      return true;
    } catch (error) {
      console.log(error);
      setEmail('');
      setPassword('');
    }
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <div className="login">
      <section className="login__connexion">
        <h2 className="login__title">Connexion</h2>
        <form className="login__form" onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login__button__style">
              Connexion
            </button>
          </div>
        </form>
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
          <Link to="/inscription">
            <button className="login__figure-button">Créer un compte</button>
          </Link>
        </figure>
      </section>
    </div>
  );
}

export default Login;
