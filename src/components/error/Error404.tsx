import React from 'react';
import { Link } from 'react-router-dom';
import './Error404.scss';

const Error404: React.FC = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">404</h1>
        <p className="error-message">Page non trouvée</p>
        <Link to="/" className="home-link">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default Error404;
