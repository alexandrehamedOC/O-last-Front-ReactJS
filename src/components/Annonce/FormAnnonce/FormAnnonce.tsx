import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import './formAnnonce.scss';

interface Game {
  id: number;
  name: string;
  pegi: number;
  category: number;
  description: string;
  created_at: string;
  updated_at: string | null;
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
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const fetchCreate = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/posts', {
        title,
        platform,
        description,
        schedule_start: new Date(schedule.start).toISOString(),
        schedule_end: new Date(schedule.end).toISOString(),
        user_id: userId.userId,
        status: true,
        game_id: selectedGameId,
      });

      return response;
    } catch (error) {
      console.error(
        'Error creating ad:',
        error.response?.data || error.message
      );
      return null;
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
      setSelectedGameId(null);
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
        <label htmlFor="games">Games</label>
        <select
          id="games"
          value={selectedGameId ?? ''}
          onChange={(e) => setSelectedGameId(Number(e.target.value))}
        >
          <option value="">Select a game</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
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
