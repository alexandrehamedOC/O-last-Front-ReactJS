import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './SignIn.scss';

function SignIn() {
  // Déclaration des states
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [pseudoDiscord, setPseudoDiscord] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Fonction pour gérer le submit du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetchcreate();

    if (response == undefined) {
      console.log('Erreur à la création du profil');
    } else {
      console.log('Profil créé avec succès');
    }

    if (password !== confirmPassword) {
      console.log('Les mots de passe ne correspondent pas');
    }
  };

  // Fonction pour envoyer les données du formulaire à l'API
  const fetchcreate = async () => {
    try {
      console.log('bonjour');

      const response = await axios.post(`http://localhost:3000/api/v1/users`, {
        firstname,
        lastname,
        city,
        discord_username: pseudoDiscord,
        email,
        birth_date: birthDate,
        password,
      });

      // Reset des states - Vider les champs du formulaire au clic sur le bouton
      setFirstname('');
      setLastname('');
      setCity('');
      setPseudoDiscord('');
      setEmail('');
      setBirthDate('');
      setPassword('');
      setConfirmPassword('');
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Hook useEffect pour appeler la fonction fetchcreate au chargement de la page
  useEffect(() => {
    fetchcreate();
  }, []);

  return (
    <div className="SignIn">
      <div className="SignIn__img">
        <img src="/Inscription.jpg" alt="Placeholder" />
      </div>
      <div className="SignIn__form">
        <h1>SIGN IN</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pseudo-discord">Discord username</label>
            <input
              type="text"
              id="pseudo-discord"
              name="pseudo-discord"
              value={pseudoDiscord}
              onChange={(e) => setPseudoDiscord(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birth-date">Birth date</label>
            <input
              type="date"
              id="birth-date"
              name="birth-date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit">SIGN IN</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
