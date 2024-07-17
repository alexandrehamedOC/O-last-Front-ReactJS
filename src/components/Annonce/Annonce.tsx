import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import FormAnnonce from './FormAnnonce/FormAnnonce';
import axios from 'axios';

import './Annonce.scss';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

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
  game_name: string;
}

interface Game {
  id: number;
  name: string;
}

const Annonce: React.FC = () => {
  console.log(import.meta.env.VITE_API_BASE_URL);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [annonce, setAnnonce] = useState<Player[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  // Je selectionne le jeu avec mon select
  const [selectedGame, setSelectedGame] = useState<number>(0);
  const [originalAnnonces, setOriginalAnnonces] = useState<Player[]>([]);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const gameId = searchParams.get('game_id');
  const [userWithProfil, setuserWithProfil] = useState<boolean>(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const navigate = useNavigate();

  const handleCardClick = (user_id: number) => {
    navigate(`/profile/${user_id}`);
  };

  const fetchlisting = async () => {
    if (gameId) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/posts/?game_id=${gameId}`
        );
        setAnnonce(response.data);
        return;
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/posts/`
        );
        const annonces = response.data;

        setAnnonce(annonces);
        setOriginalAnnonces(annonces);
      } catch (error) {
        console.error(error);
      }
    }
  };

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

  const fetchProfils = async () => {
    const id = localStorage.getItem('userId');

    if (!id) {
      setuserWithProfil(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profil/details/${id}`
      );

      if (response.data.length === 0) {
        setuserWithProfil(false);
      } else {
        setuserWithProfil(true);
      }
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des profils du user:',
        error
      );
    }
  };

  useEffect(() => {
    fetchlisting();
    fetchGames();
    fetchProfils();
  }, [gameId]);

  //Filtrer par jeux
  const handleSearch = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selectedGame: Number
  ) => {
    console.log('ici', selectedGame);

    if (selectedGame) {
      navigate(`/annonce?game_id=${selectedGame}`);
    } else {
      await fetchlisting();
    }
  };

  const handleReset = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    navigate(`/annonce`);
  };

  const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const game_id = Number(e.target.value);
    setSelectedGame(game_id);
    console.log(selectedGame);
  };

  return (
    <div className="annonce">
      <div className="create_annonce">
        <img src="/AnnonceBG.jpg" alt="" className="image" />
        {userWithProfil && (
          <button className="create_ad_button" onClick={openModal}>
            Crée ton annonce
          </button>
        )}
      </div>
      <div className="main_content">
        <div className="filters">
          <div className="form_group">
            <label htmlFor="games">Jeux</label>
            <select id="games" onChange={handleGameChange} value={selectedGame}>
              <option value="">Sélectionne un jeu</option>
              {games.map((game) => (
                <option value={game.id} key={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
          </div>
          <section className="search_section_buttons">
            <button
              className="search_button"
              onClick={(e) => handleSearch(e, selectedGame)}
            >
              Rechercher
            </button>
            <button className="reset_button" onClick={(e) => handleReset(e)}>
              Réinitialiser
            </button>
          </section>
        </div>
        <div className="grid">
          {annonce.map((player) => (
            <div
              className="card"
              key={player.post_id}
              onClick={() => handleCardClick(player.user_id)}
            >
              <figure className="card_platform">
                <img
                  src={`src/assets/img/platforms/${player.post_platform.toLowerCase()}.png`}
                  alt=""
                  className="card_platform_image"
                />
              </figure>
              <section className="card_top">
                <figure className="card_top_image">
                  <img
                    src={`src/assets/img/games-images/${player.game_name.toLowerCase().replaceAll(' ', '-')}.jpg`}
                    alt="placeholder"
                    className="card_image"
                  ></img>
                  <p className="card_game_name">{player.game_name}</p>
                </figure>
                <section className="card_top_title-desc">
                  <p className="card_title">{player.post_title}</p>
                  <p className="card_description">{player.post_description}</p>
                </section>
              </section>
              <section className="card_bottom">
                <div className="card_bottom-rank-level">
                  <p className="card_rank">Rank: {player.profil_rank}</p>
                  <p className="card_level">Level: {player.profil_level}</p>
                </div>
                <div className="card_bottom_schedule">
                  <p className="card_schedule_start">
                    {new Date(player.post_schedule_start).toLocaleString(
                      'fr-FR',
                      {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    )}
                  </p>
                  <p className="card_schedule_end">
                    {new Date(player.post_schedule_end).toLocaleString(
                      'fr-FR',
                      {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    )}
                  </p>
                </div>
              </section>
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
