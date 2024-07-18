import { useState } from 'react';
import './sendMailForgotPassword.scss';
import axios from 'axios';
import React from 'react';

export default function SendMailForgotPassword({}) {
  const [email, setEmail] = useState('renseigner votre mail');
  const [notification, setNotication] = useState('');

  function handleGetMail(inputValue: string) {
    setEmail(inputValue);
  }
  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/forgot-password`, {
        email: email,
      })
      .then(function () {
        setNotication('Email envoyé avec succès !');
      })
      .catch(function () {
        setNotication("Erreur lors de l'envoi de l'email. Veuillez réessayer.");
      });
  }
  return (
    <div className="sendMail_main__container">
      <h1 className="sendMail_main__title">Mot de passe oublié</h1>
      <p>
        Un email va vous être envoyé si vous êtes bien enregistré dans notre
        base de donnée.
      </p>
      <form className="sendMail_login__form" onSubmit={handleSubmitForm}>
        <div className="sendMail_login__form-group">
          <label className="sendMail_login__form-label" htmlFor="email">
            Email
          </label>
          <input
            className="sendMail_login__form-input "
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
