import { useParams } from 'react-router-dom';
import './EditProfil.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Profil {
  id: number;
  name: string;
  game_name: string;
  rank: string;
  level: number;
  description: string;
}

function EditProfil() {
  const { id } = useParams();

  const [profil, setProfil] = useState<Profil[]>([]);

  //Préparation création de profil
  const [name, setName] = useState('');
  const [game, setGame] = useState('');
  const [rank, setRank] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/profil', {
        name,
        game_name: game,
        rank,
        level,
        description,
      });
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

  // if (!profil) {
  //   return <div>Erreur 404</div>;
  // }

  return (
    <div className="edit">
      {profil.map((profils) => (
        <section key={profils.id} className="edit__card">
          <article className="edit__profile-card">
            <header className="edit__profile-card-header">
              <h2 className="edit__profile-card-title">{profils.name}</h2>
              <button className="edit__profile-card-button">Update</button>
              <button className="edit__profile-card-button">Delete</button>
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

          {/* 
        <article className="edit__profile-card">
          <header className="edit__profile-card-header">
            <h2 className="edit__profile-card-title">Profile 1</h2>
            <button className="edit__profile-card-button">Update</button>
            <button className="edit__profile-card-button">Delete</button>
          </header>
          <section className="edit__profile-card-body">
            <h3 className="edit__profile-card-description-title">
              Description
            </h3>
            <p className="edit__profile-card-description-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem ipsa
              explicabo necessitatibus laboriosam et dolore.
            </p>
            <div className="edit__profile-card-info">
              <span className="edit__profile-card-info-rank">Rank :</span>
              <span className="edit__profile-card-info-level">Level :</span>
            </div>
          </section>
        </article>

        <article className="edit__profile-card">
          <header className="edit__profile-card-header">
            <h2 className="edit__profile-card-title">Profile 1</h2>
            <button className="edit__profile-card-button">Update</button>
            <button className="edit__profile-card-button">Delete</button>
          </header>
          <section className="edit__profile-card-body">
            <h3 className="edit__profile-card-description-title">
              Description
            </h3>
            <p className="edit__profile-card-description-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem ipsa
              explicabo necessitatibus laboriosam et dolore.
            </p>
            <div className="edit__profile-card-info">
              <span className="edit__profile-card-info-rank">Rank :</span>
              <span className="edit__profile-card-info-level">Level :</span>
            </div>
          </section>
        </article> */}
        </section>
      ))}
      ;
      <section className="edit__form">
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
            />
          </div>

          <div className="edit__form-group">
            <label htmlFor="game" className="edit__form-label">
              Game
            </label>
            <select name="game" id="game" className="edit__form-select">
              <option value="fortnite">Fortnite</option>
              <option value="counter-strike">Counter-Strike</option>
              <option value="valorant">Valorant</option>
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
            ></textarea>
            <button className="edit__form-button">Create/ Update Profil</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditProfil;
