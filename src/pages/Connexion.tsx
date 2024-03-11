import { NavLink } from 'react-router-dom';

export const Connexion = () => {
  return (
    <>
      <div className="user-container box--shadow">
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
    </>
  );
};
