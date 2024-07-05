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
  name: string;
  description: string;
  rank: string;
  level: number;
}

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

  /*   const players = [
    { id: 1, playerName: 'Joueur 1', imageUrl: 'path_to_image1' },
    { id: 2, playerName: 'Joueur 2', imageUrl: 'path_to_image2' },
    { id: 3, playerName: 'Joueur 3', imageUrl: 'path_to_image3' },
    { id: 4, playerName: 'Joueur 4', imageUrl: 'path_to_image4' },
    { id: 5, playerName: 'Joueur 5', imageUrl: 'path_to_image5' },
    { id: 6, playerName: 'Joueur 6', imageUrl: 'path_to_image6' },
    { id: 7, playerName: 'Joueur 7', imageUrl: 'path_to_image7' },
    { id: 8, playerName: 'Joueur 8', imageUrl: 'path_to_image8' },
    { id: 9, playerName: 'Joueur 9', imageUrl: 'path_to_image9' },
    { id: 10, playerName: 'Joueur 10', imageUrl: 'path_to_image10' },
    { id: 11, playerName: 'Joueur 11', imageUrl: 'path_to_image10' },
    { id: 12, playerName: 'Joueur 12', imageUrl: 'path_to_image10' },
    { id: 13, playerName: 'Joueur 13', imageUrl: 'path_to_image10' },
    { id: 14, playerName: 'Joueur 14', imageUrl: 'path_to_image10' },
    { id: 15, playerName: 'Joueur 15', imageUrl: 'path_to_image10' },
    { id: 16, playerName: 'Joueur 16', imageUrl: 'path_to_image10' },
    { id: 17, playerName: 'Joueur 17', imageUrl: 'path_to_image10' },
    { id: 18, playerName: 'Joueur 18', imageUrl: 'path_to_image10' },
    { id: 19, playerName: 'Joueur 19', imageUrl: 'path_to_image10' },
    { id: 20, playerName: 'Joueur 20', imageUrl: 'path_to_image10' },
  ]; */

  const navigate = useNavigate();

  const handleCardClick = (playerId: number) => {
    navigate(`/profile/${playerId}`);
  };

  const [annonce, setAnnonce] = useState<Player[]>([]);

  const fetchlisting = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/profil`);
      console.log(response.data);
      setAnnonce(response.data);
      console.log(annonce);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchlisting();
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

          <label htmlFor="games">Jeux</label>
          <select id="games">
            <option value="Counter-Strike">Counter-Strike</option>
            <option value="League Of Legends">League Of Legends</option>
            <option value="Minecraft">Minecraft</option>
            <option value="Fornite">Fornite</option>
            <option value="Valorant">Valorant</option>
          </select>

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
          {/* {players.map((player) => (
            <div
              key={player.id}
              className="player_card"
              onClick={() => handleCardClick(player.id)}
            >
              <img
                src={player.imageUrl}
                alt={`Image de ${player.playerName}`}
              />
              <p>{player.playerName}</p>
            </div>
          ))} */}
          {annonce.map((player) => (
            <div key={player.id}>
              <p>{player.name}</p>
              <p>{player.description}</p>
              <p>{player.rank}</p>
              <p>{player.level}</p>
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
