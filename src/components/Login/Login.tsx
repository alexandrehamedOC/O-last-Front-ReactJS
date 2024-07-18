import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function Login() {
  // Déclaration des states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  // Récupérer la fonction login du contexte d'authentification pour se connecter
  const { login } = useAuth();

  // Fonction pour gérer la soumission du formulaire et se connecter
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      // Récupérer le token de la réponse et se connecter
      const userId = response.data;

      // Appeler la fonction login du contexte d'authentification
      login(userId);
      navigate('/');
    } catch (error) {
      // Afficher une erreur si la connexion échoue
      console.error('erreur de connexion');
    }
  };

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
              Mot de passe
            </label>
            <input
              className="login__form-input "
              type="password"
              placeholder="mot de passe"
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
          Vous avez oublé votre mot de passe ? Vous pouvez cliquer sur le lien
          suivant <br />
          et suivre les étapes pour en créer un nouveau -{' '}
          <Link
            to="/mot-de-passe-oublie"
            className="login__forgot-password-link"
          >
            mot de passe oublié.
          </Link>
        </p>
      </section>
      <section className="login__inscription">
        <h2 className="login__title">Inscription</h2>
        <figure className="login__figure">
          <img
            className="login__figure-img"
            src="/Inscription.jpg"
            alt="inscription"
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
