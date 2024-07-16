import { useState } from 'react';
import './Contact.scss';

interface ContactProps {
  user: User;
}

interface User {
  discord_username: string;
}
function Contact({ user }: ContactProps) {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <>
      <div className="contact">
        <h2 className="contact__title">
          Vous pouvez contacter ce joueur via Discord :
        </h2>
        <p className="contact__discord-username">
          <strong>{user.discord_username}</strong>
        </p>
        <button
          onClick={() => setShowSteps(!showSteps)}
          className="contact__button"
        >
          Besoin d'aide ?
        </button>

        {showSteps && (
          <ul className="contact__steps">
            <li className="contact__step">
              1 - Ouvre ton discord et connect toi !
            </li>
            <li className="contact__step">2 - Clique sur l'icône des amis.</li>
            <li className="contact__step">
              3 - Saisis le pseudo Discord mentionné ci-dessus.
            </li>
            <li className="contact__step">4 - Envoie une demande d'ami.</li>
            <li className="contact__step">
              5 - Une fois accepté, tu peux envoyer un message !
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default Contact;
