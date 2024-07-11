import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './profilAnnonce.scss';
import axios from 'axios';
import Review from '../Review/Review';
import Annonce from '../profilAnnonce/profilAnnonce';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  city: string;
  discord_username: string;
}

interface Profil {
  id: number;
  profil_name: string;
  profil_description: string;
  profil_rank: string;
  profil_level: number;
  game_name: string;
}

interface Annonce {
  id: number;
  user_id: number;
  post_id: number;
  post_title: string;
  post_platform: string;
  post_description: string;
  post_schedule_start: number;
  post_schedule_end: number;
  post_status: boolean;
  profil_rank: string;
  profil_level: number;
  profil_id: number;
  game_name: number;
}

function profilAnnonce() {
  const userId = Number(localStorage.getItem('userId'));
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [annonce, setAnnonce] = useState('');
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [profil, setProfil] = useState('');
  const [profils, setProfils] = useState<Profil[]>([]);

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
      setProfils(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/posts/user/${id}`
      );
      setAnnonces(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect pour récupérer les données du joueur
  useEffect(() => {
    fetchuser();
    fetchProfils();
    fetchPosts();
  }, []);

  //Voir pour mettre composant erreur ou loading si pas de user trouvé
  if (!user) {
    return <div>Erreur 404</div>;
  }

  return (
    <div className="profilAnnonce_container">
      {annonces.map((annonce) => (
        <div className="annonce_box" key={annonce.post_id}>
          <h1 className="profilAnnonce_title">{annonce.post_title}</h1>
          <div className="profilAnnonce_games">
            <p>{annonce.post_platform}</p>
            <p>{annonce.game_name}</p>
          </div>
          <div className="profilAnnonce_description">
            <h1>Description</h1>
            <p className="profilAnnonce_description_text">
              {annonce.post_description}
            </p>
          </div>
          <div className="profilAnnonce_rank">
            <p>{annonce.profil_rank}</p>
            <p>{annonce.profil_level}</p>
          </div>

          <div className="profilAnnonce_schedule-status">
            <p>{annonce.post_schedule_start}</p>
            <p>{annonce.post_schedule_end}</p>
            <div className="profilAnnonce_status">
              <p>{annonce.post_status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default profilAnnonce;
