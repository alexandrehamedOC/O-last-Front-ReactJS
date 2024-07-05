import './App.scss';
import logoValorant from '../../assets/img/games-logo/Valorant-logo.png';
import logoLol from '../../assets/img/games-logo/Lol-logo.png';
import leftarrow from '../../assets/img/fleche-gauche.png';
import rightarrow from '../../assets/img/fleche-droite.png';

function App() {
  // voir le token dans le local storage lorsque je suis connecté
  console.log(localStorage.getItem('token'));
  // me deconnecter
  // localStorage.removeItem('token');

  return (
    <div className="app">
      <section className="app__searchbar">
        <h1 className="app__title">Bienvenue sur O'Last !</h1>
        <input
          className="app__input"
          type="text"
          placeholder="Chercher un jeu ..."
        />
        <button className="app__button">Start !</button>
      </section>
      <section className="app__games">
        <div className="app__games-images-container">
          <figure className="app__games-figure">
            <img
              className="app_games-image"
              src={logoValorant}
              alt="logo Valorant"
            />
          </figure>
          <figure className="app__games-figure">
            <img
              className="app_games-image"
              src={logoLol}
              alt="logo League of Legends"
            />
          </figure>
        </div>
        <div className="app__games-container">
          <h2 className="app__games-title">Jeux disponibles</h2>
          <p className="app__games-description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
            itaque facere suscipit reiciendis nostrum rerum fuga quam nam beatae
            quia quibusdam adipisci quae possimus asperiores doloremque
            delectus, veritatis excepturi alias. Modi unde molestias veniam
            soluta quo aspernatur ut praesentium atque exercitationem distinctio
            asperiores reiciendis harum pariatur.
          </p>
        </div>
      </section>
      <section className="app__step">
        <h3 className="app__step-title">Etapes pour utiliser O'Last</h3>
        <ol className="app__step-list">
          <li className="app__step-item">
            <div className="app__step-item-number">1</div>
            <h4 className="app__step-item-title">Rechercher un jeu</h4>
            <p className="app__step-item-description">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Excepturi sed a.
            </p>
          </li>
          <li className="app__step-item">
            <div className="app__step-item-number">2</div>
            <h4 className="app__step-item-title">Sélectionner un jeu</h4>
            <p className="app__step-item-description">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Excepturi sed a.
            </p>
          </li>
          <li className="app__step-item">
            <div className="app__step-item-number">3</div>
            <h4 className="app__step-item-title">Trouver des joueurs</h4>
            <p className="app__step-item-description">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Excepturi sed a.
            </p>
          </li>
          <li className="app__step-item">
            <div className="app__step-item-number">4</div>
            <h4 className="app__step-item-title">Jouer !</h4>
            <p className="app__step-item-description">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Excepturi sed a.
            </p>
          </li>
        </ol>
      </section>
      <section className="app__reviews">
        <button className="app__reviews-leftarrow">
          <img src={leftarrow} alt="leftarrow" />
        </button>
        <div className="app__reviews-card">
          <h3 className="app__reviews-username">Pseudo</h3>
          <p className="app_reviews-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
            tempore inventore omnis! Quisquam, quos. Quisquam, quos.
          </p>
        </div>
        <div className="app__reviews-card">
          <h3 className="app__reviews-username">Pseudo</h3>
          <p className="app_reviews-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
            tempore inventore omnis! Quisquam, quos. Quisquam, quos.
          </p>
        </div>
        <div className="app__reviews-card">
          <h3 className="app__reviews-username">Pseudo</h3>
          <p className="app_reviews-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
            tempore inventore omnis! Quisquam, quos. Quisquam, quos.
          </p>
        </div>
        <button className="app__reviews-rightarrow">
          <img src={rightarrow} alt="rightarrow" />
        </button>
      </section>
      <section className="app__annonce">
        <p className="app__annonce-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
          suscipit, magni nisi eligendi quod incidunt, accusantium obcaecati
          dolore non aliquam magnam enim repudiandae? Ducimus temporibus nostrum
          porro quidem cum at!
        </p>
        <button className="app__annonce-button">PLAY</button>
      </section>
    </div>
  );
}

export default App;
