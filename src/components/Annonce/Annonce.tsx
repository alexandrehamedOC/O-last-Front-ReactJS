import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import FormAnnonce from './FormAnnonce/FormAnnonce';

import './Annonce.scss';
import { useState } from 'react';

Modal.setAppElement('#root');

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

  const players = [
    { playerName: 'Joueur 1', imageUrl: 'path_to_image1' },
    { playerName: 'Joueur 2', imageUrl: 'path_to_image2' },
    { playerName: 'Joueur 3', imageUrl: 'path_to_image3' },
    { playerName: 'Joueur 4', imageUrl: 'path_to_image4' },
    { playerName: 'Joueur 5', imageUrl: 'path_to_image5' },
    { playerName: 'Joueur 6', imageUrl: 'path_to_image6' },
    { playerName: 'Joueur 7', imageUrl: 'path_to_image7' },
    { playerName: 'Joueur 8', imageUrl: 'path_to_image8' },
    { playerName: 'Joueur 9', imageUrl: 'path_to_image9' },
    { playerName: 'Joueur 10', imageUrl: 'path_to_image10' },
    { playerName: 'Joueur 11', imageUrl: 'path_to_image10' },
    { playerName: 'Joueur 12', imageUrl: 'path_to_image10' },
    { playerName: 'Joueur 13', imageUrl: 'path_to_image10' },
    { playerName: 'Joueur 14', imageUrl: 'path_to_image10' },
    { playerName: 'Joueur 15', imageUrl: 'path_to_image10' },
    { playerName: 'Joueur 16', imageUrl: 'path_to_image10' },
    { playerName: 'Joueur 17', imageUrl: 'path_to_image10' },
    { playerName: 'Joueur 18', imageUrl: 'path_to_image10' },
    { playerName: 'Joueur 19', imageUrl: 'path_to_image10' },
    { playerName: 'Joueur 20', imageUrl: 'path_to_image10' },
  ];

  return (
    <div className="annonce">
      <div className="create_annonce">
        <img src="/AnnonceBG.jpg" alt="" className='image' />
        <button className="create_ad_button" onClick={openModal}>Créer ton annonce</button>
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
            <option value="Minecraft">MInecraft</option>
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
          
          <button className="search_button" onClick={handleSearch}>Search</button>
        </div>
        <div className="grid">
          {players.map((player, index) => (
            <div key={index} className="player_card">
              <img src={player.imageUrl} alt={`Image de ${player.playerName}`} />
              <p>{player.playerName}</p>
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
        <button onClick={closeModal} className="close_button">X</button>
        <FormAnnonce />
      </Modal>
    </div>
  );
};

export default Annonce;
