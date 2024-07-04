import React from 'react';

import './SignIn.scss';

function SignIn (){
  return (
    <div className='SignIn'>
      <div className='SignIn__img'>
        <img src="/Inscription.jpg" alt="Placeholder" />
      </div>
      <div className="SignIn__form">
        <h1>SIGN IN</h1>
        <form>
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input type="text" id="firstname" name="firstname" />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <input type="text" id="lastname" name="lastname" />
          </div>
          <div className="form-group">
            <label htmlFor="pseudo">Pseudo</label>
            <input type="text" id="pseudo" name="pseudo" />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" />
          </div>
          <div className="form-group">
            <label htmlFor="pseudo-discord">Pseudo Discord</label>
            <input type="text" id="pseudo-discord" name="pseudo-discord" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="birth-date">Birth date</label>
            <input type="date" id="birth-date" name="birth-date" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm password</label>
            <input type="password" id="confirm-password" name="confirm-password" />
          </div>
          <div className="form-group">
            <button type="submit">SIGN IN</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn; 