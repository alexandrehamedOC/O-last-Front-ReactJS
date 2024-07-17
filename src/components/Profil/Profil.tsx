import { Link, useParams } from 'react-router-dom';
import './Profil.scss';

import axios from 'axios';
import Modal from '../Modal/Modal';

import Review from './Review/Review';
import Annonce from './profilAnnonce/profilAnnonce';
import { useEffect, useState } from 'react';
import Contact from './Contact/Contact';
import Sidebar from './SideBar/Sidebar';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  city: string;
  discord_username: string;
}

interface Profil {
  id: number;
  name: string;
  description: string;
  rank: string;
  level: number;
  game_name: string;
}

function Profil() {
  const userId = Number(localStorage.getItem('userId'));

  // variable id pour récupérer l'id du joueur lors du clic sur le profil
  const { id } = useParams();
  // console.log(id);
  const [profils, setProfils] = useState<Profil[]>([]);
  const [games, setGames] = useState<string[]>([]);

  const fetchProfils = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profil/details/${id}`
      );

      const gameList: string[] = [];
      response.data.map((profil: Profil) => {
        gameList.push(profil.game_name);
      });

      const gameListUnique: string[] = [...new Set(gameList)];

      setProfils(response.data);
      setGames(gameListUnique);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect pour récupérer les données du joueur
  useEffect(() => {
    fetchProfils();
  }, [id]);

  return (
    <div className="profile_container">
      <Sidebar />
      <div className="profile_main">
        <div className="ranks">
          <h1>Profils</h1>
          {profils.map((profil) => (
            <div className="ranks-list" key={profil.id}>
              <div className="left">
                <p>{profil.game_name}</p>
                <p>Rank: {profil.rank}</p>
                <p>Level: {profil.level}</p>
              </div>
              <p className="ranks-list-desc">{profil.description}</p>
            </div>
          ))}
        </div>
        <div className="review_annonce">
          <Review />
          <Annonce />
        </div>
      </div>
    </div>
  );
}

export default Profil;
