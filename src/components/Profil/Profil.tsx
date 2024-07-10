import { Link, useParams } from 'react-router-dom';
import './Profil.scss';
import axios from 'axios';

import Review from './Review/Review';
import Annonce from './profilAnnonce/profilAnnonce';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  city: string;
  discord_username: string;
}

interface Game {
  id: number;
  name: string;
  pegi: number;
  category: number;
  description: string;
  created_at: string;
  updated_at: string | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [profil, setProfil] = useState('');
  const [profils, setProfils] = useState<Profil[]>([]);
  const [games, setGames] = useState<string[]>([]);

  // console.log(localStorage.getItem('token'));

  // fonction pour récupérer les données du joueur
  const fetchuser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${id}`
      );
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfils = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/profil/details/${id}`
      );
      console.log(response.data);

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
    fetchuser();
    fetchProfils();
  }, []);

  //Voir pour mettre composant erreur ou loading si pas de user trouvé
  if (!user) {
    return <div>Erreur 404</div>;
  }

  return (
    <div className="profile_container">
      <div className="profile_sidebar">
        <div className="profile_picture" />
        <p>{user.firstname}</p>
        <p>{user.lastname}</p>
        <p>{user.city}</p>
        <p>{user.discord_username}</p>

        {userId === user.id ? (
          <>
            <Link to={`/EditProfil/${user.id}`}>
              <button>Edit Profil</button>
            </Link>
            <button>Edit Annonce</button>
          </>
        ) : (
          <button>Contact Player</button>
        )}
      </div>
      <div className="profile_main">
        <div className="games">
          <h1>Games played</h1>

          <div className="games_list">
            {games.map((game) => (
              <p key={game}>{game}</p>
            ))}
          </div>
        </div>
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
        {/* <div className="description">
          <h1>Description</h1>
          <div className="description_box">
            {profils.map((profil) => (
              <p className="description_text" key={profil.id}>
                {profil.description}
              </p>
            ))}
          </div>
        </div> */}
        <div className="review_annonce">
          <Review />
          <Annonce />
        </div>
      </div>
    </div>
  );
}

export default Profil;
