import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

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

    if (response) {
      navigate('/connexion');
    }
  };

  // Fonction pour envoyer les données du formulaire à l'API
  const fetchcreate = async () => {
    try {
      console.log('bonjour');

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users`,
        {
          firstname,
          lastname,
          city,
          discord_username: pseudoDiscord,
          email,
          birth_date: birthDate,
          password,
        }
      );

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
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Prénom*"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Nom*"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Ville*"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="pseudo-discord"
              name="pseudo-discord"
              placeholder="Discord username*"
              value={pseudoDiscord}
              onChange={(e) => setPseudoDiscord(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birth-date">Date de naissance*</label>
            <input
              type="date"
              id="birth-date"
              name="birth-date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirmer le mot de passe*"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit">S'inscrire</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
