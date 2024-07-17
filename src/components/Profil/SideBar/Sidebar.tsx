import { Link, useParams, useLocation } from 'react-router-dom';
import './Sidebar.scss';
import Modal from '../../Modal/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Contact from '../Contact/Contact';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  city: string;
  discord_username: string;
}

function Sidebar() {
  const userId = Number(localStorage.getItem('userId'));

  const { id } = useParams();

  const [user, setUser] = useState<User>();

  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const openModal = (): void => {
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  // fonction pour récupérer les données du joueur
  const fetchUser = async (): Promise<void> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/${id}`
      );
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect pour récupérer les données du joueur
  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <div className="profile_sidebar">
      {user && (
        <>
          <figure className="profile_picture">
            <img
              src="/src/assets/img/profil-picture.jpg"
              alt="Profile Picture"
            />
          </figure>
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
          <p>{user.city}</p>
          <>
            {userId === user.id ? (
              <>
                <p>{user.discord_username}</p>
                <Link to={`/edit-profil/${user.id}`}>
                  <button className="left-buttons">
                    <span style={{ marginRight: '10px' }}>✏️</span> Profil
                  </button>
                </Link>
                <Link to={`/edit-annonce/${user.id}`}>
                  <button className="left-buttons">
                    <span style={{ marginRight: '10px' }}>✏️</span> Annonce
                  </button>
                </Link>
                {location.pathname.includes('/edit-profil') ||
                location.pathname.includes('/edit-annonce') ? (
                  <Link to={`/profile/${user.id}`}>
                    <button className="left-buttons" key="retour-profil">
                      Retour profil
                    </button>
                  </Link>
                ) : null}
              </>
            ) : (
              <>
                <button onClick={openModal} className="left-buttons">
                  Contacte {user.firstname}
                </button>
                <Modal show={showModal} onClose={closeModal}>
                  <Contact user={user} />
                </Modal>
              </>
            )}
          </>
        </>
      )}
    </div>
  );
}

export default Sidebar;
