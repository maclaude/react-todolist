import { NavLink } from 'react-router-dom';

import '../styles/User.scss';

export const User = () => {
  return (
    <div className="user-container">
      <h2 className="user-title">Welcome 👋</h2>
      <span className="user-intro">
        Connectez vous pour pouvoir sauvegarder et consulter vos listes ✨
      </span>
      <div className="user-sign-buttons">
        <NavLink className="user-sign-button" to={`/user/signin`}>
          Connexion
        </NavLink>
        <NavLink className="user-sign-button" to={`/user/signup`}>
          Inscription
        </NavLink>
      </div>
    </div>
  );
};
