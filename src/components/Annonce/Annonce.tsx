import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import FormAnnonce from './FormAnnonce/FormAnnonce';
import axios from 'axios';

import './Annonce.scss';
import { useEffect, useState } from 'react';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

Modal.setAppElement('#root');

interface Player {
  id: number;
  title: string;
  platform: string;
  description: string;
  schedule_start: number;
  schedule_end: number;
}

interface Game{};

const Annonce: React.FC = () => {
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

  const handleCardClick = (playerId: number) => {
    navigate(`/profile/${playerId}`);
  };

  const [annonce, setAnnonce] = useState<Player[]>([]);
  
  const fetchlisting = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/posts/`);
      const annonces = response.data;
      console.log(annonces);
      
      setAnnonce(annonces);
    } catch (error) {
      console.error(error);
    }
  };
  
  const [games, setGames] = useState<any[]>([]);

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/games');
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
            <option>
              {game.name}
            </option>
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
            <div key={player.id} onClick={() => handleCardClick(player.id)}>
              <p>{player.title}</p>
              <p>{player.platform}</p>
              <p>{player.description}</p>
              <p>{player.schedule_start}</p>
              <p>{player.schedule_end}</p>
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
