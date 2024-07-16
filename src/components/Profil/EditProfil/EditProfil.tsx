import { useParams } from 'react-router-dom';
import './EditProfil.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';

interface Profil {
  id: number;
  name: string;
  game_id: number;
  game_name: string;
  rank: string;
  level: number;
  description: string;
  user_id: number;
}

interface Game {
  name: string;
  id: number;
}

function EditProfil() {
  const { id } = useParams();

  const [profil, setProfil] = useState<Profil[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  //Préparation création de profil
  const [name, setName] = useState('');
  const [game_id, setGame] = useState('');
  const [rank, setRank] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const id = localStorage.getItem('userId');
    const data: Partial<Profil> = {};
    data.user_id = Number(id);
    if (name) {
      data['name'] = name;
    }
    if (game_id) {
      data['game_id'] = Number(game_id);
    }
    if (rank) {
      data['rank'] = rank;
    }
    if (level) {
      data.level = Number(level);
    }
    if (description) {
      data['description'] = description;
    }

    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    const actionType = submitter.getAttribute('data-action');

    if (actionType === 'create') {
      handleCreate(e, data);
    } else if (actionType === 'update') {
      handleSubmitUpdate(e, data);
    }
  };

  const handleCreate = async (
    e: React.FormEvent<HTMLFormElement>,
    data: Partial<Profil>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/profil/`,
        data,
        {
          withCredentials: true,
        }
      );

      fecthprofil();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const fecthprofil = async () => {
    try {
      const games = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/games/`
      );
      setGames(games.data);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profil/details/${id}`
      );
      setProfil(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthprofil();
  }, [id]);

  //delete  profil
  const handleDelete = async (id: number) => {
    // e.preventDefault();
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/profil/${id}`,
        {
          withCredentials: true,
        }
      );
      fecthprofil();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e: React.FormEvent, profilId: Number) => {
    const id = localStorage.getItem('userId');

    const profilToUpdate = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/profil/details/${id}`
    );

    const profilFilter = profilToUpdate.data.filter(
      (profil: Profil) => profil.id === Number(profilId)
    );

    const formNameUpdate = document.getElementById('name') as HTMLInputElement;
    const formRankUpdate = document.getElementById('rank') as HTMLInputElement;
    const formLevelUpdate = document.getElementById(
      'level'
    ) as HTMLInputElement;
    const formDescriptionUpdate = document.querySelector(
      '.edit__form-textarea'
    ) as HTMLTextAreaElement;
    const formProfilId = document.getElementById(
      'profil_id'
    ) as HTMLInputElement;

    formNameUpdate.value = profilFilter[0].name;
    formRankUpdate.value = profilFilter[0].rank;
    formLevelUpdate.value = profilFilter[0].level;
    formDescriptionUpdate.value = profilFilter[0].description;
    formProfilId.value = profilFilter[0].id;
  };

  const handleSubmitUpdate = async (
    e: React.FormEvent,
    data: Partial<Profil>
  ) => {
    e.preventDefault();
    try {
      const profilCard = document.querySelector(
        '.edit__card'
      ) as HTMLDivElement;
      const profilId = Number(profilCard.id);

      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/profil/${profilId}`,
        data,
        {
          withCredentials: true,
        }
      );

      fecthprofil();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit">
      {profil.map((profils) => (
        <section
          key={profils.id}
          className="edit__card"
          id={profils.id.toString()}
        >
          <article className="edit__profile-card">
            <header className="edit__profile-card-header">
              <h2 className="edit__profile-card-title">{profils.name}</h2>
              <button
                className="edit__profile-card-button"
                onClick={(e) => handleUpdate(e, profils.id)}
              >
                Update
              </button>
              <button
                className="edit__profile-card-button"
                onClick={() => handleDelete(profils.id)}
              >
                Delete
              </button>
            </header>
            <section className="edit__profile-card-body">
              <h3 className="edit__profile-card-description-title">
                {profils.game_name}
              </h3>
              <p className="edit__profile-card-description-text">
                {profils.description}
              </p>
              <div className="edit__profile-card-info">
                <span className="edit__profile-card-info-rank">
                  Rank : {profils.rank}
                </span>
                <span className="edit__profile-card-info-level">
                  Level : {profils.level}
                </span>
              </div>
            </section>
          </article>
        </section>
      ))}
      ;
      <section className="edit__form">
        <form onSubmit={handleSubmit}>
          <input type="hidden" id="profil_id" value="" />
          <div className="edit__form-main">
            <div className="edit__form-group">
              <label htmlFor="name" className="edit__form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="edit__form-input"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="edit__form-group">
              <label htmlFor="game" className="edit__form-label">
                Game
              </label>
              <select
                name="game_id"
                id="game_id"
                className="edit__form-select"
                onChange={(e) => setGame(e.target.value)}
              >
                <option value="">Select a game</option>
                {games.map((game) => (
                  <option key={game.name} value={game.id}>
                    {game.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="edit__form-group">
              <label htmlFor="rank" className="edit__form-label">
                Rank
              </label>
              <input
                type="text"
                id="rank"
                className="edit__form-input"
                placeholder="Rank"
                onChange={(e) => setRank(e.target.value)}
              />
            </div>

            <div className="edit__form-group">
              <label htmlFor="level" className="edit__form-label">
                Level
              </label>
              <input
                type="text"
                id="level"
                className="edit__form-input"
                placeholder="Level"
                onChange={(e) => setLevel(e.target.value)}
              />
            </div>
          </div>

          <div className="edit__form-side">
            <div className="edit__form-group">
              <label htmlFor="description" className="edit__form-label">
                Description
              </label>
              <textarea
                id="description"
                className="edit__form-textarea"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button
                className="create__form-button"
                type="submit"
                data-action="create"
              >
                Create Profil
              </button>
              <button
                className="update__form-button"
                type="submit"
                data-action="update"
              >
                Update Profil
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default EditProfil;
