import { NavLink } from 'react-router-dom';

import { useAuth } from '../context/authContext';

import '../styles/User.scss';
import { HomePage } from './Homepage';

export const User = () => {
  const { authenticated } = useAuth();

  return authenticated ? (
    <main id="main_container">
      <HomePage />
    </main>
  ) : (
    <main id="central_container">
      <div className="user-container">
        <h2 className="user-title">Bienvenue !</h2>
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
    </main>
  );
};
