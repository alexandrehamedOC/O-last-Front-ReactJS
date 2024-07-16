import axios from 'axios';
import './EditAnnonce.scss';
import { useEffect, useState } from 'react';
import Sidebar from '../SideBar/Sidebar';

interface Player {
  post_id: number;
  post_title: string;
  post_platform: string;
  post_description: string;
  post_schedule_start: number;
  post_schedule_end: number;
  profil_rank: string;
  profil_level: number;
}

interface Profil {
  id: number;
  name: string;
  game_name: string;
  game_id: number;
}

function EditAnnonce() {
  // récupérer l'id de l'utilisateur
  const id = localStorage.getItem('userId');
  // useState pour les annonces en cours
  const [annonce, setAnnonce] = useState<Player[]>([]);

  const [title, setTitle] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [schedule, setSchedule] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });
  const [profils, setProfils] = useState<Profil[]>([]);
  const [profil, setProfil] = useState('');
  const [selectedAnnonce, setSelectedAnnonce] = useState<Player | null>(null);

  //fetch sur les Annonces en cours
  const fetchlisting = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/posts/user/${id} `
      );
      const annonces = response.data;

      setAnnonce(annonces);
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect pour récupérer les annonces en cours et les profils

  useEffect(() => {
    const fetchprofil = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/profil/details/${userId}`
        );

        setProfils(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchprofil();
    fetchlisting();
  }, []);

  //Créer une annonce
  const fetchCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/posts/`,
        {
          title,
          platform,
          description,
          schedule_start: new Date(schedule.start).toISOString(),
          schedule_end: new Date(schedule.end).toISOString(),
          profil_id: Number(profil.split(',')[0]),
          status: true,
          game_id: Number(profil.split(',')[1]),
        },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/posts/${selectedAnnonce?.post_id}`,
        {
          title,
          platform,
          description,
          schedule_start: new Date(schedule.start).toISOString(),
          schedule_end: new Date(schedule.end).toISOString(),
          profil_id: Number(profil.split(',')[0]),
          status: true,
          game_id: Number(profil.split(',')[1]),
        },
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Submit du formulaire pour créer une annonce
  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    let response;
    if (selectedAnnonce) {
      response = await fetchUpdate(e);
    } else {
      response = await fetchCreate(e);
    }

    if (response !== undefined) {
      setTitle('');
      setPlatform('');
      setDescription('');
      setSchedule({ start: '', end: '' });
      setProfil('');
      setSelectedAnnonce(null);
      fetchlisting();
    } else {
      console.log('error');
    }
  };
  // Delete une annonce
  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/posts/${id}`,
        { withCredentials: true }
      );

      fetchlisting();
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const pad = (num: number) => (num < 10 ? '0' + num : num);
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSelectAnnonce = (annonce: Player) => {
    setSelectedAnnonce(annonce);
    setTitle(annonce.post_title);
    setPlatform(annonce.post_platform);
    setDescription(annonce.post_description);
    setSchedule({
      start: formatDate(new Date(annonce.post_schedule_start).toISOString()),
      end: formatDate(new Date(annonce.post_schedule_end).toISOString()),
    });
    setProfil(`${annonce.profil_rank},${annonce.profil_level}`);
  };

  return (
    <div className="profile_container">
      <Sidebar />
      <div className="edit">
        <h1 className="edit__title">Annonces</h1>
        <section className="edit__profile">
          {annonce.map((player) => (
            <section key={player.post_id} className="edit__card">
              <article className="edit__profile-card">
                <header className="edit__profile-card-header">
                  <h2 className="edit__profile-card-title">
                    {player.post_title}
                  </h2>
                </header>
                <section className="edit__profile-card-body">
                  <h3 className="edit__profile-card-description-title">
                    platform : {player.post_platform}
                  </h3>
                  <p className="edit__profile-card-description-text">
                    description : {player.post_description}
                  </p>
                  <div className="edit__profile-card-info">
                    <span className="edit__profile-card-info-rank">
                      Rank : {player.profil_rank}
                    </span>
                    <span className="edit__profile-card-info-level">
                      Level : {player.profil_level}
                    </span>
                  </div>
                </section>
                <section className="edit__profile-card-buttons">
                  <button
                    className="edit__profile-card-button"
                    onClick={() => handleSelectAnnonce(player)}
                  >
                    Update
                  </button>
                  <button
                    className="edit__profile-card-button"
                    onClick={() => handleDelete(player.post_id)}
                  >
                    Delete
                  </button>
                </section>
              </article>
            </section>
          ))}
        </section>
        <section className="edit__form">
          <form className='edit__form_annonce' onSubmit={handleSubmit}>
            <div className="edit__form-left">
              <div className="edit__form-title">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Ad title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="edit__form-platform">
                <label htmlFor="title">Platform</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Ad Platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                />
              </div>
              <div className="form_group">
                <label htmlFor="profil">Profil *required</label>
                <select
                  name="profil"
                  id="profil"
                  onChange={(e) => setProfil(e.target.value)}
                >
                  <option value="">Select a profil</option>
                  {profils.map((profil) => (
                    <option
                      key={profil.id}
                      value={profil.id + ',' + profil.game_id}
                    >
                      {profil.name} : {profil.game_name}
                    </option>
                  ))}
                </select>
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="form_group">
                  <label htmlFor="schedule">Schedule</label>
                  <div className="schedule_inputs">
                    <input
                      type="datetime-local"
                      id="start"
                      value={schedule.start}
                      onChange={(e) =>
                        setSchedule({ ...schedule, start: e.target.value })
                      }
                    />
                    <input
                      type="datetime-local"
                      id="end"
                      value={schedule.end}
                      onChange={(e) =>
                        setSchedule({ ...schedule, end: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button className="edit__form-button" type="submit">
                  {selectedAnnonce ? 'Update Ad' : 'Create Ad'}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default EditAnnonce;
