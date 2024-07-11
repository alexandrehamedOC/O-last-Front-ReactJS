import { useState } from 'react';
import './sendMailForgotPassword.scss';
import axios from 'axios';

export default function SendMailForgotPassword({}) {
  const [email, setEmail] = useState('renseigner votre mail');
  const [notification, setNotication] = useState('');

  function handleGetMail(inputValue: string) {
    setEmail(inputValue);
  }
  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const notif =
      '<div className="notification notification.success">{notification}</div>';

    axios
      .post('http://localhost:3000/api/v1/forgot-password', {
        email: email,
      })
      .then(function (response) {
        setNotication('Email envoyé avec succès !');
        console.log(response);
      })
      .catch(function (error) {
        setNotication("Erreur lors de l'envoi de l'email. Veuillez réessayer.");
        console.log(error);
      });
  }
  return (
    <div className="main__container">
      <h1 className="main__title">Mot de passe oublié</h1>
      <p>
        Un email va vous être envoyé si vous êtes bien enregistrer dans notre
        base de donnée.
      </p>
      <form className="login__form" onSubmit={handleSubmitForm}>
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
            onChange={(event) => handleGetMail(event.target.value)}
          />
        </div>
        <button>ENVOYER</button>
      </form>
      {notification && (
        <div
          className={`notification ${notification.includes('succès') ? 'notification--success' : 'notification--error'}`}
        >
          {notification}
        </div>
      )}
    </div>
  );
}
