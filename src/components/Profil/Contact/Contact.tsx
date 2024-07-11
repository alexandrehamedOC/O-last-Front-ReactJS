import { useState } from 'react';
import './Contact.scss';

interface ContactProps {
  user: User; // Assurez-vous que le type User est correctement défini
}

interface User {
  discord_username: string;
}
function Contact({ user }: ContactProps) {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <>
      {/* <h2 className="contact__title">Contact Player</h2> */}
      <div className="contact__content">
        <p className="contact__text">
          Vous pouvez contacter ce joueur via Discord :
        </p>
        <p className="contact__discord-username">
          <strong>{user.discord_username}</strong>
        </p>
        <button onClick={() => setShowSteps(!showSteps)}>
          Besoin d'aide ?
        </button>

        {showSteps && (
          <ul className="contact__steps">
            <li className="contact__step">
              Ouvre ton discord et connect toi !
            </li>
            <li className="contact__step">Cliquez sur l'icône des amis.</li>
            <li className="contact__step">
              Saisissez le pseudo Discord mentionné ci-dessus.
            </li>
            <li className="contact__step">Envoyez une demande d'ami.</li>
            <li className="contact__step">
              Une fois accepté, vous pouvez envoyer un message.
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default Contact;
