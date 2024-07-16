import { Link, useParams } from 'react-router-dom';
import './Sidebar.scss';
import Modal from '../../Modal/Modal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Contact from '../Contact/Contact';
import Error404 from '../../error/Error404';

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

  const [user, setUser] = useState<User | null>(null);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // fonction pour récupérer les données du joueur
  const fetchuser = async () => {
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
    fetchuser();
  }, []);

  //Voir pour mettre composant erreur ou loading si pas de user trouvé
  if (!user) {
    return (
      <div>
        <Error404 />
      </div>
    );
  }

  return (
    <div className="profile_sidebar">
      <div className="profile_picture" />
      <p>{user.firstname}</p>
      <p>{user.lastname}</p>
      <p>{user.city}</p>

      {userId === user.id ? (
        <>
          <p>{user.discord_username}</p>
          <Link to={`/edit-profil/${user.id}`}>
            <button className="left-buttons">Edit Profil</button>
          </Link>
          <Link to={`/edit-annonce/${user.id}`}>
            <button className="left-buttons">Edit Annonce</button>
          </Link>
        </>
      ) : (
        <>
          <button onClick={openModal} className="left-buttons">
            Contact Player
          </button>
          <Modal show={showModal} onClose={closeModal}>
            <Contact user={user} />
          </Modal>
        </>
      )}
    </div>
  );
}

export default Sidebar;
