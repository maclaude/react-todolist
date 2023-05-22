import { NavLink } from 'react-router-dom';

export const User = () => {
  return (
    <div className="user-container">
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
