import React from 'react';
import './formAnnonce.scss';

const FormAnnonce: React.FC = () => {
  return (
    <div className="form_annonce">
      <div className="form_group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="Placeholder" />
      </div>

      <div className="form_group">
        <label htmlFor="profil">Profil</label>
        <select id="profil">
          <option value="profile1">Profile 1</option>
          <option value="profile2">Profile 2</option>
          <option value="profile3">Profile 3</option>
          <option value="profile3">Profile 4</option>
          <option value="profile3">Profile 5</option>
          <option value="profile3">Profile 6</option>
        </select>
      </div>

      <div className="form_group">
        <label htmlFor="description">Description</label>
        <textarea id="description" placeholder="Placeholder"></textarea>
      </div>

      <div className="form_group">
        <label htmlFor="schedule">Schedule</label>
        <div className="schedule_inputs">
          <input type="text" id="start" placeholder="start" />
          <input type="text" id="end" placeholder="end" />
        </div>
      </div>

      <button className="create_button">Create</button>
    </div>
  );
};

export default FormAnnonce;
