import { useParams } from 'react-router-dom';
import './Profil.scss';
import axios from 'axios';

import Review from './Review/Review';
import Annonce from './profilAnnonce/profilAnnonce';
import { useEffect, useState } from 'react';

interface User {
  firstname: string;
  lastname: string;
  city: string;
  discord_username: string;
}

function Profil() {
  // variable id pour récupérer l'id du joueur lors du clic sur le profil
  const { id } = useParams();
  // console.log(id);
  const [user, setUser] = useState<User | null>(null);

  // console.log(localStorage.getItem('token'));

  // fonction pour récupérer les données du joueur
  const fetchuser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${id}`
      );
      console.log(response.data);
      setUser(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect pour récupérer les données du joueur
  useEffect(() => {
    fetchuser();
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
        <button>Contact Player</button>
      </div>
      <div className="profile_main">
        <div className="games">
          <h1>Games played</h1>
          <div className="games_list">
            <p>Game name</p>
            <p>Game name</p>
            <p>Game name</p>
          </div>
        </div>
        <div className="ranks">
          <h1>Rank</h1>
          <div>
            <p>Game name</p>
            <p>Rank</p>
          </div>
          <div>
            <p>Game name</p>
            <p>Rank</p>
          </div>
        </div>
        <div className="description">
          <h1>Description</h1>
          <p className="description_text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra
            justo nec ultrices dui sapien eget mi proin sed. Lacus laoreet non
            curabitur gravida arcu ac. Curabitur vitae nunc sed velit dignissim
            sodales ut eu sem. Gravida arcu ac tortor dignissim convallis aenean
            et tortor.
          </p>
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
