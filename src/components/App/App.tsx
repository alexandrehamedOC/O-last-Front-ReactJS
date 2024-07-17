import './App.scss';
import logoValorant from '../../assets/img/games-logo/Valorant-logo.png';
import logoLol from '../../assets/img/games-logo/Lol-logo.png';
import logolMinecraft from '../../assets/img/games-logo/minecraft.png';
import leftarrow from '../../assets/img/fleche-gauche.png';
import rightarrow from '../../assets/img/fleche-droite.png';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

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
    navigate(`/Annonce?game_id=${selectedGame}`);
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
        {/* <input
          className="app__input"
          type="text"
          placeholder="Chercher un jeu ..."
        /> */}
        <section className="searchArea">
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
                une plateforme innovante dédiée aux passionnés de jeux vidéo,
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

        {/*Old disoplay*/}
        {/* <section className="app__step">
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
      </section> */}

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
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Excepturi sed a.
                </p>
              </section>

              <section className="app__use-card">
                <div className="app__use-card-number">2</div>
                <h3>Sélectionner un jeu</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Excepturi sed a.
                </p>
              </section>

              <section className="app__use-card">
                <div className="app__use-card-number">3</div>
                <h3>Trouver un joueurs</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Excepturi sed a.
                </p>
              </section>

              <section className="app__use-card">
                <div className="app__use-card-number">4</div>
                <h3>Jouer !</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Excepturi sed a.
                </p>
              </section>
            </section>
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
                  <h3>LucasW</h3>
                  <p>
                    « O'Last a vraiment changé ma façon de jouer ! J'ai trouvé
                    des coéquipiers pour Minecraft en un rien de temps. La
                    plateforme est super intuitive et facile à utiliser. Merci
                    pour ce service incroyable ! »
                  </p>
                </li>
                <li className="slider__slide">
                  <h3>Clara_92</h3>
                  <p>
                    « J'adore League of Legends, et grâce à O'Last, j'ai pu
                    former une équipe géniale pour mes parties ranked. Les
                    options de filtrage sont super utiles pour trouver des
                    joueurs avec les mêmes objectifs. Recommandé à 100% ! »
                  </p>
                </li>
                <li className="slider__slide">
                  <h3>MaximeGaming</h3>
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

        {/*OLD SLIDDER <section className="app__reviews">
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
        </section> */}
        <section className="app__annonce-container">
          <section className="app__annonce">
            <p className="app__annonce-description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
              suscipit, magni nisi eligendi quod incidunt, accusantium obcaecati
              dolore non aliquam magnam enim repudiandae? Ducimus temporibus
              nostrum porro quidem cum at!
            </p>
            <button className="app__annonce-button">PLAY</button>
          </section>
        </section>
      </section>
    </div>
  );
}

export default App;
