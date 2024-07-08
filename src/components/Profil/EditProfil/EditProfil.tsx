import './EditProfil.scss';

function EditProfil() {
  return (
    <div className="edit">
      <section className="edit__card">
        <article className="edit__profile-card">
          <header className="edit__profile-card-header">
            <h2 className="edit__profile-card-title">Profile 1</h2>
            <button className="edit__profile-card-button">Update</button>
            <button className="edit__profile-card-button">Delete</button>
          </header>
          <section className="edit__profile-card-body">
            <h3 className="edit__profile-card-description-title">
              Description
            </h3>
            <p className="edit__profile-card-description-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem ipsa
              explicabo necessitatibus laboriosam et dolore.
            </p>
            <div className="edit__profile-card-info">
              <span className="edit__profile-card-info-rank">Rank :</span>
              <span className="edit__profile-card-info-level">Level :</span>
            </div>
          </section>
        </article>

        <article className="edit__profile-card">
          <header className="edit__profile-card-header">
            <h2 className="edit__profile-card-title">Profile 1</h2>
            <button className="edit__profile-card-button">Update</button>
            <button className="edit__profile-card-button">Delete</button>
          </header>
          <section className="edit__profile-card-body">
            <h3 className="edit__profile-card-description-title">
              Description
            </h3>
            <p className="edit__profile-card-description-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem ipsa
              explicabo necessitatibus laboriosam et dolore.
            </p>
            <div className="edit__profile-card-info">
              <span className="edit__profile-card-info-rank">Rank :</span>
              <span className="edit__profile-card-info-level">Level :</span>
            </div>
          </section>
        </article>

        <article className="edit__profile-card">
          <header className="edit__profile-card-header">
            <h2 className="edit__profile-card-title">Profile 1</h2>
            <button className="edit__profile-card-button">Update</button>
            <button className="edit__profile-card-button">Delete</button>
          </header>
          <section className="edit__profile-card-body">
            <h3 className="edit__profile-card-description-title">
              Description
            </h3>
            <p className="edit__profile-card-description-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem ipsa
              explicabo necessitatibus laboriosam et dolore.
            </p>
            <div className="edit__profile-card-info">
              <span className="edit__profile-card-info-rank">Rank :</span>
              <span className="edit__profile-card-info-level">Level :</span>
            </div>
          </section>
        </article>
      </section>
      <section className="edit__form">
        <div className="edit__form-main">
          <div className="edit__form-group">
            <label htmlFor="name" className="edit__form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="edit__form-input"
              placeholder="Name"
            />
          </div>

          <div className="edit__form-group">
            <label htmlFor="game" className="edit__form-label">
              Game
            </label>
            <select name="game" id="game" className="edit__form-select">
              <option value="fortnite">Fortnite</option>
              <option value="counter-strike">Counter-Strike</option>
              <option value="valorant">Valorant</option>
            </select>
          </div>

          <div className="edit__form-group">
            <label htmlFor="rank" className="edit__form-label">
              Rank
            </label>
            <input
              type="text"
              id="rank"
              className="edit__form-input"
              placeholder="Rank"
            />
          </div>

          <div className="edit__form-group">
            <label htmlFor="level" className="edit__form-label">
              Level
            </label>
            <input
              type="text"
              id="level"
              className="edit__form-input"
              placeholder="Level"
            />
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
            ></textarea>
            <button className="edit__form-button">Create/ Update Profil</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditProfil;
