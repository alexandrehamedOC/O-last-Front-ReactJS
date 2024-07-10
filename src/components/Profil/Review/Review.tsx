import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from '../../Modal/Modal';
import axios from 'axios';
import './Review.scss';

interface Rate {
  rate_id: number;
  note: number;
  rate_description: string;
  game_name: string;
}

interface Profil {
  id: number;
  name: string;
  game_name: string;
  game_id: number;
}

function Review() {
  const [showModal, setShowModal] = useState(false);
  const [rateDescription, setRateDescription] = useState<string>('');
  const [note, setNote] = useState<number>(0);
  const [profils, setProfils] = useState<Profil[]>([]);
  const [profil, setProfil] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const { id } = useParams();
  const userId = Number(localStorage.getItem('userId'));
  const [rates, setRates] = useState<Rate[]>([]);

  const fetchRates = async (items: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/rates/user/${id}?itemsByPage=${items}`
      );

      setRates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchprofil = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/profil/details/${id}`
      );
      console.log(response.data);
      setProfils(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCreate = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const reponse = await axios.post(
        'http://localhost:3000/api/v1/rates',
        {
          note: note,
          description: rateDescription,
          sender_user_id: userId,
          receiver_profil_id: profil,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect pour récupérer les données du joueur
  useEffect(() => {
    fetchRates(3);
    fetchprofil();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const response = await fetchCreate();

      console.log('poste créée avec succées');
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = (e: React.FormEvent) => {
    // Perform your desired action here
    console.log('Button was clicked!');

    fetchRates(20);
    document
      .querySelector('.review_container')
      ?.classList.add('overflow-y-auto');
  };

  return (
    <div className="review_container">
      <div className="review_title">
        <h1>Review</h1>
        {userId !== Number(id) ? (
          <button onClick={openModal}>Add review</button>
        ) : null}
        <Modal show={showModal} onClose={closeModal}>
          <h2>Add a review</h2>
          <form className="form_rate" onSubmit={handleSubmit}>
            <label htmlFor="note">Note:</label>
            <input
              type="number"
              id="note"
              name="note"
              min="1"
              max="5"
              value={note}
              onChange={(e) => setNote(Number(e.target.value))}
            />

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={rateDescription}
              onChange={(e) => setRateDescription(e.target.value)}
            ></textarea>

            <label htmlFor="profil">Profil</label>
            <select
              name="profil"
              id="profil"
              onChange={(e) => setProfil(e.target.value)}
            >
              <option value="">Select a profil</option>
              {profils.map((profil) => (
                <option key={profil.id} value={profil.id}>
                  {profil.name} : {profil.game_name}
                </option>
              ))}
            </select>

            <button type="submit">Submit</button>
          </form>
        </Modal>
      </div>
      <div className="rate_container">
        {rates.map((rate) => (
          <div className="review_rate-container" key={rate.rate_id}>
            <div className="review_rate">
              <div className="review_stars">
                {Array.from({ length: rate.note }, (_, index) => (
                  <span key={index}>⭐</span>
                ))}
              </div>
              <div className="review_game">
                <p>{rate.game_name}</p>
              </div>
            </div>
            <div className="review_rate-description">
              <p>{rate.rate_description}</p>
            </div>
          </div>
        ))}
        <button onClick={handleButtonClick} className="review-see-all-button">
          See all reviews
        </button>
      </div>
    </div>
  );
}

export default Review;
