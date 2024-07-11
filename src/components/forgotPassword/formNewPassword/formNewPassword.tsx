import { useState } from 'react';
import './formNewPassword.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function FormNewPassword() {
  const [notification, setNotification] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const query = useQuery();
  const token = query.get('token');
  const navigate = useNavigate()

  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setNotification('Les mots de passe ne correspondent pas');
      return;
    }

    if (!token) {
      setNotification('Token manquant ou invalide');
      return;
    }

    axios
      .post('http://localhost:3000/api/v1/reset-password', {
        password: password,
        token: token,
      })
      .then(function (response) {
        setTimeout(() => {
          navigate('/connexion')
        },2000);
        setNotification('Mot de passe mis à jour avec succès !');
      })
      .catch(function (error) {
        if (error.response) {
          setNotification(error.response.data || 'Erreur lors de la mise à jour du mot de passe. Veuillez réessayer.');
          console.error('Erreur de réponse du serveur:', error.response);
        } else if (error.request) {
          setNotification('Erreur de réseau. Veuillez vérifier votre connexion.');
          console.error('Erreur de requête:', error.request);
        } else {
          setNotification('Une erreur s\'est produite. Veuillez réessayer.');
          console.error('Erreur:', error.message);
        }
      });
  }

  return (
    <div className="main__container">
      <h1 className="main__title">Nouveau mot de passe</h1>
      <p>Définir votre nouveau mot de passe</p>
      <form className="login__form" onSubmit={handleSubmitForm}>
        <div className="login__form-group">
          <label className="login__form-label" htmlFor="password">Nouveau mot de passe</label>
          <input
            className="login__form-input"
            type="password"
            placeholder="Nouveau mot de passe"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login__form-group">
          <label className="login__form-label" htmlFor="passwordConfirm">Nouveau mot de passe (Confirmer)</label>
          <input
            className="login__form-input"
            type="password"
            placeholder="Confirmer votre mot de passe"
            name="passwordConfirm"
            id="passwordConfirm"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button type="submit">ENVOYER</button>
      </form>
      {notification && (
        <div className={`notification ${notification.includes('succès') ? 'notification--success' : 'notification--error'}`}>
          {notification}
        </div>
      )}
    </div>
  );
}