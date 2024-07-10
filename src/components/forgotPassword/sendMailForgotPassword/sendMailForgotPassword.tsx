import './sendMailForgotPassword.scss';

export default function SendMailForgotPassword({}) {
  return (
    <div className="main__container">
      <h1 className="main__title">Mot de passe oublié</h1>
      <p>
        Un email va vous être envoyé si vous êtes bien enregistrer dans notre
        base de donnée.
      </p>
      <form className="login__form">
        <div className="login__form-group">
          <label className="login__form-label" htmlFor="email">
            Email
          </label>
          <input
            className="login__form-input "
            type="email"
            placeholder="email"
            name="email"
            id="email"
          />
          
        </div>
        <button>ENVOYER</button>
      </form>
    </div>
  );
}
