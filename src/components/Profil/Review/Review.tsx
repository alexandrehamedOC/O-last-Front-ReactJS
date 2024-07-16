import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
        `${import.meta.env.VITE_API_BASE_URL}/rates/user/${id}?itemsByPage=${items}`
      );

      setRates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchprofil = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profil/details/${id}`
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
        '${import.meta.env.VITE_API_BASE_URL}/rates',
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
    // e.preventDefault();
    try {
      const response = await fetchCreate();

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = (e: React.FormEvent) => {
    fetchRates(20);
    // document
    //   .querySelector('.review_container')
    //   ?.classList.add('overflow-y-auto');
  };

  return (
    <div className="review_container">
      <div className="review_title">
        <h1>Review</h1>
        {userId !== Number(id) ? (
          <button onClick={openModal}>Add review</button>
        ) : null}
        <Modal show={showModal} onClose={closeModal}>
          <h2 className="review__title">Add a review</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="note" className="form__note-label">
              Note :
            </label>
            <input
              className="form__note-input"
              type="number"
              id="note"
              name="note"
              min="1"
              max="5"
              value={note}
              onChange={(e) => setNote(Number(e.target.value))}
            />

            <label htmlFor="description" className="form__description-label">
              Description :
            </label>
            <textarea
              className="form__description-input"
              id="description"
              name="description"
              value={rateDescription}
              onChange={(e) => setRateDescription(e.target.value)}
            ></textarea>

            <label htmlFor="profil" className="form_profil-label">
              Profil
            </label>
            <select
              className="form_profil-select"
              name="profil"
              id="profil"
              onChange={(e) => setProfil(e.target.value)}
            >
              <option value="" className="form_profil-options">
                Select a profil
              </option>
              {profils.map((profil) => (
                <option key={profil.id} value={profil.id}>
                  {profil.name} : {profil.game_name}
                </option>
              ))}
            </select>

            <button type="submit" className="form_button-submit">
              Submit
            </button>
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
