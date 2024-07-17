import './App.scss';
import logoValorant from '../../assets/img/games-logo/Valorant-logo.png';
import logoLol from '../../assets/img/games-logo/Lol-logo.png';
import logolMinecraft from '../../assets/img/games-logo/minecraft.png';
import manette from '../../assets/img/console-de-jeu.png';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import React from 'react';

function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setselectedGame] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/games`
      );
      setGames(result.data);
    };
    fetchGames();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const game_id = Number(event.target.value);
    setselectedGame(game_id);
  };

  const handleGamesClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selectedGame: Number
  ) => {
    navigate(`/annonce?game_id=${selectedGame}`);
  };

  //Sliders horizontal
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 4;
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };
  return (
    <div className="app">
      <section className="app__searchbar">
        <h1 className="app__title">Bienvenue sur O'Last !</h1>
        <section className="searchArea">
          <label htmlFor="searchBar" className="searchBar__label">
            Choisir un jeu :
          </label>
          <select
            name="searchBar"
            id="searchBar"
            value={selectedGame}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Choisir un jeu
            </option>
            {games.map((item: any) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <button
            className="app__button"
            onClick={(e) => handleGamesClick(e, selectedGame)}
          >
            Start !
          </button>
        </section>
      </section>
      <section className="app__pagesizer">
        <section className="app__games">
          <section className="element__wrapper">
            <div className="app__games-images-container">
            <svg
          id="sw-js-blob-svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="background-svg"
        >
          <defs>
            <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
              <stop
                id="stop1"
                stopColor="rgba(147, 26, 206, 1)"
                offset="0%"
              ></stop>
              <stop
                id="stop2"
                stopColor="rgba(26, 26, 26, 1)"
                offset="100%"
              ></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#sw-gradient)"
            d="M16,-25.1C22.2,-24.2,29.6,-22.8,32.8,-18.5C36.1,-14.3,35.1,-7.1,35.6,0.3C36.2,7.7,38.2,15.5,34.8,19.6C31.5,23.6,22.8,24,16.1,28.1C9.4,32.2,4.7,40,-0.1,40.3C-5,40.5,-10,33.3,-16.9,29.3C-23.8,25.3,-32.6,24.6,-35.8,20.3C-38.9,15.9,-36.4,8,-33.1,1.9C-29.9,-4.2,-25.9,-8.4,-23.2,-13.5C-20.5,-18.7,-19.1,-24.7,-15.5,-27C-11.8,-29.3,-5.9,-28,-0.5,-27.1C4.9,-26.3,9.9,-25.9,16,-25.1Z"
            width="100%"
            height="100%"
            transform="translate(50 50)"
            strokeWidth="0"
            style={{ transition: 'all 0.3s ease 0s' }}
          ></path>
        </svg>
              <figure className="app__games-figure image__Home__1">
                <img
                  className="app_games-image"
                  src={logoLol}
                  alt="logo Valorant"
                />
              </figure>
              <figure className="app__games-figure image__Home__2">
                <img
                  className="app_games-image"
                  src={logoValorant}
                  alt="logo League of Legends"
                />
              </figure>
              <figure className="app__games-figure image__Home__3">
                <img
                  className="app_games-image"
                  src={logolMinecraft}
                  alt="logo Minecraft"
                />
              </figure>
            </div>

            <div className="app__responsive-logo-area">
              <figure className="">
                <img className="" src={logoLol} alt="logo Valorant" />
              </figure>
              <figure className="">
                <img
                  className=""
                  src={logoValorant}
                  alt="logo League of Legends"
                />
              </figure>
              <figure className="">
                <img className="" src={logolMinecraft} alt="logo Minecraft" />
              </figure>
            </div>
            <div className="app__games-container">
              <h2 className="app__games-title">Jeux disponibles</h2>
              <p className="app__games-description">
                Une plateforme innovante dédiée aux passionnés de jeux vidéo,
                vous permettant de poster des annonces pour trouver d'autres
                joueurs et jouer ensemble. Que vous soyez amateur de Minecraft,
                League of Legends, Fortnite ou Call of Duty, notre site vous
                aide à former des équipes ou à rejoindre des groupes existants.
                Avec une interface intuitive et des fonctionnalités avancées,
                O'last facilite les rencontres entre gamers partageant les mêmes
                intérêts. Rejoignez notre communauté et vivez des expériences de
                jeu uniques et mémorables. Connectez-vous, publiez votre annonce
                et commencez à jouer dès aujourd'hui !
              </p>
            </div>
          </section>
        </section>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#1a1a1a"
            fillOpacity="1"
            d="M0,224L48,229.3C96,235,192,245,288,250.7C384,256,480,256,576,250.7C672,245,768,235,864,192C960,149,1056,75,1152,80C1248,85,1344,171,1392,213.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>

        <section className="app__use">
          <section className="app__use-title">
            <h1>Etapes pour utiliser O'Last</h1>
          </section>
          <section className="app__use__container">
            <section className="app__use__card-container">
              <section className="app__use-card">
                <div className="app__use-card-number">1</div>
                <h3>Rechercher un jeu</h3>
                <p>
                  Visite notre page annonce, c'est la que toutes les annonces
                  des joueurs sont regroupées.
                </p>
              </section>

              <section className="app__use-card">
                <div className="app__use-card-number">2</div>
                <h3>Sélectionner un jeu</h3>
                <p>
                  A l'aide de notre outil de filtre tu peux affiner ta recherche
                  pour restreindre l'affichage des annonces sur ta séléction.
                </p>
              </section>

              <section className="app__use-card">
                <div className="app__use-card-number">3</div>
                <h3>Trouver un joueurs</h3>
                <p>
                  Si une annonce t'intéresse, tu peux cliquer est découvrir son
                  profil et les avis des autres joueurs.
                </p>
              </section>

              <section className="app__use-card">
                <div className="app__use-card-number">4</div>
                <h3>Jouer !</h3>
                <p>
                  Son profil t'as convaincu ? Alors n'hésite pas à le contacter
                  grâce au bouton de contact.
                </p>
              </section>
            </section>
          </section>
        </section>

        <div className="vertical-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <section className="app__manette">
          <section className="app__manette-container">
            <figure className="app__manette-image">
              <img src={manette} alt="" />
            </figure>
          </section>
        </section>
        <section className="app__slider-container">
          <h2 className="app__title-reviews">Retour utilisateur</h2>
          <section className="slider">
            <button
              className="slider__button slider__button--prev"
              onClick={prevSlide}
            >
              ‹
            </button>
            <div className="slider__track-container">
              <ul
                className="slider__track"
                style={{
                  transform: `translateX(-${(currentIndex * 100) / 3}%)`,
                }}
              >
                <li className="slider__slide">
                  <h3>VirginieF0F</h3>
                  <p>
                    « Je suis déçue de ne pas trouver Mario Kart sur O'Last,
                    c'est mon jeu préféré. Cependant, la plateforme est bien
                    conçue et la communauté est sympa. J'espère que Mario Kart
                    sera ajouté bientôt ! »
                  </p>
                </li>
                <li className="slider__slide">
                  <h3>Lorenzo</h3>
                  <p>
                    « Avant je n'avais pas d'amis et j'étais seul, pour jouer.
                    Grâce à vous j'ai pu rencontrer Yann G, et nous faisons des
                    parties endiablées ensemble jusqu'au bout de la nuit. »
                  </p>
                </li>
                <li className="slider__slide">
                  <h3>VM O'Clock</h3>
                  <p>
                    « O'Last est une plateforme fantastique pour les joueurs de
                    Fortnite ! Je peux facilement trouver des squads pour mes
                    sessions de jeu. L'interface est claire et le processus de
                    création d'annonce est rapide. »
                  </p>
                </li>
                <li className="slider__slide">
                  <h3>SarahJ</h3>
                  <p>
                    « Je suis une grande fan de Call of Duty et je cherchais un
                    groupe pour les parties en ligne. O'Last a parfaitement
                    répondu à mes attentes. J'ai trouvé une équipe solide et
                    nous avons passé des soirées de jeu fantastiques ! »
                  </p>
                </li>
                <li className="slider__slide">
                  <h3>GamingNico</h3>
                  <p>
                    « Super plateforme pour les gamers ! J'ai utilisé O'Last
                    pour trouver des partenaires pour Minecraft, et le processus
                    a été très simple. Les options de communication sont
                    excellentes et j'ai rencontré des gens vraiment sympas. »
                  </p>
                </li>
              </ul>
            </div>
            <button
              className="slider__button slider__button--next"
              onClick={nextSlide}
            >
              ›
            </button>
          </section>
        </section>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#6164f8"
            fillOpacity="1"
            d="M0,320L48,309.3C96,299,192,277,288,250.7C384,224,480,192,576,192C672,192,768,224,864,224C960,224,1056,192,1152,170.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section>
    </div>
  );
}

export default App;
