import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import FormAnnonce from './FormAnnonce/FormAnnonce';
import axios from 'axios';

import './Annonce.scss';
import { useEffect, useState } from 'react';

Modal.setAppElement('#root');

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
}

interface Game {
  id: number;
  name: string;
}

const Annonce: React.FC = () => {
  console.log(import.meta.env.VITE_API_BASE_URL);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSearch = () => {
    console.log('Recherche effectuée');
  };

  const navigate = useNavigate();

  const handleCardClick = (user_id: number) => {
    navigate(`/profile/${user_id}`);
  };

  const [annonce, setAnnonce] = useState<Player[]>([]);

  const fetchlisting = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/posts/`
      );
      const annonces = response.data;
      console.log(annonces);

      setAnnonce(annonces);
    } catch (error) {
      console.error(error);
    }
  };

  const [games, setGames] = useState<Game[]>([]);

  const fetchGames = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/games`
      );
      setGames(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des jeux :', error);
    }
  };

  useEffect(() => {
    fetchlisting();
    fetchGames();
  }, []);

  return (
    <div className="annonce">
      <div className="create_annonce">
        <img src="/AnnonceBG.jpg" alt="" className="image" />
        <button className="create_ad_button" onClick={openModal}>
          Créer ton annonce
        </button>
      </div>
      <div className="main_content">
        <div className="filters">
          <label htmlFor="country">Pays</label>
          <select id="country">
            <option value="france">France</option>
            <option value="usa">États-Unis</option>
            <option value="germany">Allemagne</option>
            <option value="japan">Japon</option>
            <option value="china">Chine</option>
          </select>

          <div className="form_group">
            <label htmlFor="games">Jeux</label>
            <select id="games">
              {games.map((game) => (
                <option key={game.id}>{game.name}</option>
              ))}
            </select>
          </div>

          <label htmlFor="platform">Plateforme</label>
          <select id="platform">
            <option value="pc">PC</option>
            <option value="ps5">PlayStation 5</option>
            <option value="xbox">Xbox One</option>
            <option value="switch">Nintendo Switch</option>
            <option value="mobile">Mobile</option>
          </select>

          <button className="search_button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="grid">
          {annonce.map((player) => (
            <div
              key={player.post_id}
              onClick={() => handleCardClick(player.user_id)}
            >
              <p>{player.post_title}</p>
              <p>{player.post_platform}</p>
              <p>{player.post_description}</p>
              <p>{player.profil_rank}</p>
              <p>{player.profil_level}</p>
              <p>{player.post_schedule_start}</p>
              <p>{player.post_schedule_end}</p>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Formulaire d'annonce"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeModal} className="close_button">
          X
        </button>
        <FormAnnonce />
      </Modal>
    </div>
  );
};

export default Annonce;
