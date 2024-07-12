import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

import './formAnnonce.scss';

interface Profil {
  id: number;
  name: string;
  game_name: string;
  game_id: number;
}

const FormAnnonce: React.FC = () => {
  const { userId } = useAuth();
  const [title, setTitle] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [schedule, setSchedule] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });

  const [profils, setProfils] = useState<Profil[]>([]);
  const [profil, setProfil] = useState('');

  useEffect(() => {
    const fetchprofil = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/profil/details/${userId}`
        );
        console.log(response.data);
        setProfils(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchprofil();
  }, []);

  const fetchCreate = async () => {
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
      console.log('poste créée avec succées');
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetchCreate();

    if (response) {
      setTitle('');
      setPlatform('');
      setDescription('');
      setSchedule({ start: '', end: '' });
      window.location.reload();
    } else {
      console.log('Error creating your ad');
    }
  };

  return (
    <form className="form_annonce" onSubmit={handleSubmit}>
      <div className="form_group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Ad title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form_group">
        <label htmlFor="platform">Platform</label>
        <input
          type="text"
          id="platform"
          placeholder="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />
      </div>

      <div className="form_group">
        <label htmlFor="profil">Profil</label>
        <select
          name="profil"
          id="profil"
          onChange={(e) => setProfil(e.target.value)}
        >
          <option value="">Select a profil</option>
          {profils.map((profil) => (
            <option key={profil.id} value={profil.id + ',' + profil.game_id}>
              {profil.name} : {profil.game_name}
            </option>
          ))}
        </select>
      </div>

      <div className="form_group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Ad description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

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
            onChange={(e) => setSchedule({ ...schedule, end: e.target.value })}
          />
        </div>
      </div>

      <button className="create_button" type="submit">
        Create Ad
      </button>
    </form>
  );
};

export default FormAnnonce;
