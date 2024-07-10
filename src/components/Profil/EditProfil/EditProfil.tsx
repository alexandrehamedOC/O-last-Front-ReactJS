import { useParams } from 'react-router-dom';
import './EditProfil.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { s } from 'vite/dist/node/types.d-aGj9QkWt';

interface Profil {
  id: number;
  name: string;
  game: number;
  rank: string;
  level: number;
  description: string;
}

interface Game {
  name: string;
  id: number;
}

function EditProfil() {
  const { id } = useParams();

  // const [deleteProfil, setDeleteProfil] = useState<Delete[]>([]);

  const [profil, setProfil] = useState<Profil[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  //Préparation création de profil
  const [name, setName] = useState('');
  const [game, setGame] = useState('');
  const [rank, setRank] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    try {
      // stockage du token dans le local storage
      const id = localStorage.getItem('userId');

      console.log({
        name,
        game_id: game,
        rank,
        level,
        description,
        user_id: id,
      });

      const response = await axios.post(
        `http://localhost:3000/api/v1/profil/`,
        {
          name,
          game_id: game,
          rank,
          level,
          description,
          user_id: id,
        },
        { withCredentials: true }
      );

      console.log(response.data);
      setName('');
      setGame('');
      setRank('');
      setLevel('');
      setDescription('');
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const fecthprofil = async () => {
    try {
      const games = await axios.get(`http://localhost:3000/api/v1/games/`);
      console.log(games);
      setGames(games.data);

      const response = await axios.get(
        `http://localhost:3000/api/v1/profil/details/${id}`
      );
      console.log(response.data);
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
        `http://localhost:3000/api/v1/profil/${id}`,
        { withCredentials: true }
      );
      console.log('deleted post wit ID :' + response.data);
      console.log(id);

      fecthprofil();
    } catch (error) {
      console.log(error);
    }
  };

  // const handleUpdate = async (id: number) => {
  //   // e.preventDefault();
  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:3000/api/v1/profil/${id}`,
  //       { withCredentials: true }
  //     );
  //     console.log('updated post wit ID :' + response.data);
  //     console.log(id);

  //     fecthprofil();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="edit">
      {profil.map((profils) => (
        <section key={profils.id} className="edit__card">
          <article className="edit__profile-card">
            <header className="edit__profile-card-header">
              <h2 className="edit__profile-card-title">{profils.name}</h2>
              <button className="edit__profile-card-button">Update</button>
              <button
                className="edit__profile-card-button"
                onClick={() => handleDelete(profils.id)}
              >
                Delete
              </button>
            </header>
            <section className="edit__profile-card-body">
              <h3 className="edit__profile-card-description-title">
                {profils.game}
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
                name="game"
                id="game"
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
              <button className="edit__form-button" type="submit">
                Create/ Update Profil
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default EditProfil;
