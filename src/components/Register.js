import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//компонент модального окна,который информирует пользователя об успешной (или не очень) регистрации.
function Register({ onUpdateAddUser }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAddUser({
      email: email,
      password: password
    });
  }

  return (
    <div className="authorization">
      <div className="authorization__container">
        <h3 className="authorization__title">Регистрация</h3>
        <form className='authorization__form'
          onSubmit={handleSubmit}
          noValidate >
          <label className="authorization__label">
            <input
              className="authorization__input"
              placeholder="Email"
              onChange={handleEmail}
              id="email"
              name="email"
              type="email"
              minLength="2"
              maxLength="20"
              required />
            <span className="username-input-error popup__input-error-name"></span>
          </label>

          <label className="authorization__label authorization__label-password">
            <input
              className="authorization__input"
              placeholder="Пароль"
              onChange={handlePassword}
              id="password"
              name="password"
              type="password"
              minLength="6"
              maxLength="16"
              required />
            <span className="biography-input-error popup__input-error-job"></span>
          </label>

          <button className="authorization__save-button"
            type="submit"
            aria-label="Кнопка сохранить"
          >Зарегистрироваться</button>
          <span className='authorization__span'>Уже зарегистрированы?
            <Link className='authorization__link' to='/sign-in'>Войти</Link></span>
        </form>
      </div>
    </div>
  )
}
export default Register;