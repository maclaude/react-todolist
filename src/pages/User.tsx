import { NavLink } from 'react-router-dom';

import { useAuth } from '../context/authContext';

import '../styles/User.scss';

export const User = () => {
  const { authenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return authenticated ? (
    <div className="user-container">
      <h1>Connected ✅</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  ) : (
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
  );
};
