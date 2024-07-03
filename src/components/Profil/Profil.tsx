import { useParams } from 'react-router-dom';
import './Profil.scss';

import Review from './Review/Review'
import Annonce from './profilAnnonce/profilAnnonce'

function Profil() {
  const { id } = useParams();

  return (
    <div className="profile_container">
        <div className="profile_sidebar">
            <div className="profile_picture" />
            <p>Firstname Lastname</p>
            <p>City</p>
            <p>Username</p>
            <p>Discord name</p>
            <button>Contact Player</button>
        </div>
        <div className="profile_main">
            <div className="games">
              <h1>Games played</h1>
              <div className='games_list'>
                <p>Game name</p>
                <p>Game name</p>
                <p>Game name</p>
              </div>
            </div>
            <div className="ranks">
              <h1>Rank</h1>
                <div>
                  <p>Game name</p>
                  <p>Rank</p>
                </div>
                <div>
                  <p>Game name</p>
                  <p>Rank</p>
                </div>
            </div>
            <div className="description">
              <h1>Description</h1>
                <p className="description_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra justo nec ultrices dui sapien eget mi proin sed. Lacus laoreet non curabitur gravida arcu ac. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Gravida arcu ac tortor dignissim convallis aenean et tortor.</p>
            </div>
            <div className='review_annonce'>
            <Review />
            <Annonce />
            </div>
        </div>
    </div>
);
};

export default Profil;