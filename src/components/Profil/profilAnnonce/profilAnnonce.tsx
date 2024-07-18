import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './profilAnnonce.scss';
import axios from 'axios';
import React from 'react';
import Annonce from '../profilAnnonce/profilAnnonce';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  city: string;
  discord_username: string;
}

interface Player {
  id: number;
  user_id: number;
  post_id: number;
  post_title: string;
  post_platform: string;
  post_description: string;
  post_schedule_start: number;
  post_schedule_end: number;
  profil_rank: string;
  profil_level: number;
  profil_id: number;
  game_id: number;
  game_name: string;
}

function profilAnnonce() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [annonce, setAnnonce] = useState<Player[]>([]);

  const fetchuser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/${id}`
      );
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchlisting = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/posts/user/${id}`
      );
      const annonces = response.data;
      console.log(annonces);

      setAnnonce(annonces);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfils = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profil/details/${id}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect pour récupérer les données du joueur
  useEffect(() => {
    fetchuser();
    fetchProfils();
    fetchlisting();
  }, [id]);

  //Voir pour mettre composant erreur ou loading si pas de user trouvé
  if (!user) {
    return <div>Erreur 404</div>;
  }

  return (
    <div className="profilAnnonce_container">
      {annonce.map((player) => (
        <div className="card_profil_annonce" key={player.post_id}>
          <figure className="card_platform">
            <img
              src={`/platforms/${player.post_platform.toLowerCase()}.png`}
              alt=""
              className="card_platform_image"
            />
          </figure>
          <section className="card_top">
            <figure className="card_top_image">
              <img
                src={`/games-images/${player.game_name.toLowerCase().replace(/ /g, '-')}.jpg`}
                alt="placeholder"
                className="card_image"
              ></img>
            </figure>
            <p className="card_title">{player.post_title}</p>
            <p className="card_description">{player.post_description}</p>
          </section>
          <section className="card_bottom">
            <div className="card_bottom-rank-level">
              <p className="card_rank">Rank: {player.profil_rank}</p>
              <p className="card_level">Level: {player.profil_level}</p>
            </div>
            <div className="card_bottom_schedule">
              <p className="card_schedule_start">
                {new Date(player.post_schedule_start).toLocaleString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="card_schedule_end">
                {new Date(player.post_schedule_end).toLocaleString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}

export default profilAnnonce;
